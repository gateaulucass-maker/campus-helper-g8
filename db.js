// db.js — Toutes les fonctions Supabase pour Study Vibes
// Nécessite supabase.js chargé avant (supabaseClient est global)

const DB = (() => {
  const s = supabaseClient;

  // ── AUTH ────────────────────────────────────────────────────

  async function signUp(email, password, fullName, school, city) {
    const { data, error } = await s.auth.signUp({ email, password });
    if (error) throw error;

    const userId = data.user?.id;
    if (!userId) throw new Error("Compte non créé.");

    // Si email confirmé immédiatement (pas de vérification), on met à jour le profil.
    // Sinon le trigger SQL aura déjà créé une ligne vide — l'user complétera après connexion.
    if (data.session) {
      await s.from("profiles").update({ full_name: fullName, school, city }).eq("id", userId);
    }

    return data; // { user, session }
  }

  async function signIn(email, password) {
    const { data, error } = await s.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data; // { user, session }
  }

  async function signOut() {
    await s.auth.signOut();
  }

  async function getSession() {
    const { data } = await s.auth.getSession();
    return data.session;
  }

  function onAuthChange(callback) {
    return s.auth.onAuthStateChange(callback);
  }

  // ── PROFIL ──────────────────────────────────────────────────

  async function getProfile(userId) {
    const { data } = await s.from("profiles").select("*").eq("id", userId).single();
    return data;
  }

  async function updateProfile(userId, updates) {
    const { error } = await s.from("profiles").update(updates).eq("id", userId);
    if (error) throw error;
  }

  async function uploadAvatar(file, userId) {
    const ext = file.name.split(".").pop().toLowerCase();
    const path = `${userId}/avatar.${ext}`;
    const { error: upErr } = await s.storage.from("avatars").upload(path, file, { upsert: true });
    if (upErr) throw upErr;
    const { data } = s.storage.from("avatars").getPublicUrl(path);
    await s.from("profiles").update({ avatar_url: data.publicUrl }).eq("id", userId);
    return data.publicUrl;
  }

  async function uploadEventImage(file, activityId) {
    const ext = file.name.split(".").pop().toLowerCase();
    const path = `${activityId}/cover.${ext}`;
    const { error: upErr } = await s.storage.from("activity-images").upload(path, file, { upsert: true });
    if (upErr) throw upErr;
    const { data } = s.storage.from("activity-images").getPublicUrl(path);
    const { data: rows, error: updErr } = await s
      .from("activities")
      .update({ image_url: data.publicUrl })
      .eq("id", activityId)
      .select("id");
    if (updErr) throw updErr;
    if (!rows || rows.length === 0) {
      throw new Error("Politique RLS UPDATE manquante sur la table activities — l'image ne peut pas être sauvegardée.");
    }
    return data.publicUrl;
  }

  // ── ACTIVITÉS ───────────────────────────────────────────────

  async function createActivity(userId, form) {
    // Combine date + heure en ISO pour activity_date
    const activityDate = (form.date && form.time)
      ? new Date(`${form.date}T${form.time}`).toISOString()
      : null;

    const { data, error } = await s.from("activities").insert({
      creator_id:    userId,
      title:         form.title,
      description:   form.desc,
      category:      form.cat,
      location:      form.address ? `${form.loc} — ${form.address}` : form.loc,
      activity_date: activityDate,
    }).select().single();

    if (error) throw error;
    return data;
  }

  async function joinActivity(activityId, userId) {
    const { error } = await s.from("activity_registrations").upsert(
      { activity_id: activityId, user_id: userId, status: "registered" },
      { onConflict: "activity_id,user_id" }
    );
    if (error) throw error;
  }

  async function leaveActivity(activityId, userId) {
    const { error } = await s.from("activity_registrations")
      .delete()
      .eq("activity_id", activityId)
      .eq("user_id", userId);
    if (error) throw error;
  }

  async function getActivities(currentUserId) {
    const { data: activities, error } = await s
      .from("activities")
      .select("*, activity_registrations(user_id, status)")
      .order("activity_date", { ascending: true });

    if (error) throw error;
    if (!activities || activities.length === 0) return [];

    // Récupère les profils des créateurs en une seule requête
    const creatorIds = [...new Set(activities.map(a => a.creator_id))];
    const { data: profiles } = await s
      .from("profiles")
      .select("id, full_name")
      .in("id", creatorIds);

    const profileMap = Object.fromEntries((profiles || []).map(p => [p.id, p]));

    const hostColors = ["#FB6376", "#5D2A42", "#059669", "#8B5CF6", "#F59E0B", "#EC4899"];
    const now = new Date();

    return activities.map((a, i) => {
      const creator = profileMap[a.creator_id] || {};
      const registrations = a.activity_registrations || [];
      const actDate = a.activity_date ? new Date(a.activity_date) : null;

      const fullName = creator.full_name || "";
      const hostInit = fullName
        ? fullName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
        : "?";

      return {
        id:           a.id,
        title:        a.title || "",
        desc:         a.description || "",
        cat:          a.category || "Autre",
        loc:          a.location || "",
        address:      "",
        date:         actDate
          ? actDate.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })
          : "",
        time:         actDate
          ? actDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
          : "",
        img:          a.image_url || `https://picsum.photos/seed/sv${a.id}/800/420`,
        host:         fullName || "Inconnu",
        hostInit,
        hostColor:    hostColors[i % hostColors.length],
        joined:       registrations.some(r => r.user_id === currentUserId),
        participants: registrations.length,
        past:         actDate ? actDate < now : false,
        createdByMe:  a.creator_id === currentUserId,
      };
    });
  }

  // ── CHAT MESSAGES ───────────────────────────────────────────

  async function sendChatMessage(userId, activityId, role, content) {
    const { data, error } = await s.from("chat_messages").insert({
      user_id:     userId,
      activity_id: activityId,
      role,
      content,
    }).select().single();
    if (error) throw error;
    return data;
  }

  async function getChatMessages(userId, activityId) {
    const { data, error } = await s.from("chat_messages")
      .select("*")
      .eq("user_id", userId)
      .eq("activity_id", activityId)
      .order("created_at", { ascending: true });
    if (error) throw error;
    return data || [];
  }

  // Récupère TOUS les messages de l'utilisateur pour reconstruire la liste des conversations
  async function getAllChatMessages(userId) {
    const { data, error } = await s.from("chat_messages")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });
    if (error) throw error;
    return data || [];
  }

  return {
    signUp, signIn, signOut, getSession, onAuthChange,
    getProfile, updateProfile, uploadAvatar, uploadEventImage,
    createActivity, joinActivity, leaveActivity, getActivities,
    sendChatMessage, getChatMessages, getAllChatMessages,
  };
})();

window.DB = DB;
