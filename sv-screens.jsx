// sv-screens.jsx — All views (v3 – Design System: Rammetto One + Montserrat + #FFF9EC/#5D2A42/#FB6376)

// ── HOME VIEW ──────────────────────────────────────────────
function HomeView({ events, navigate, onLike, profile }) {
  const [activeCat, setActiveCat] = React.useState("Tous");
  const [query, setQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [showAllActu, setShowAllActu] = React.useState(false);
  const [showAllSugg, setShowAllSugg] = React.useState(false);

  const upcomingEvents = events.filter(e => !e.past);

  // Combined filter: query + category
  const filtered = events.filter(e => {
    const matchCat = activeCat === "Tous" || e.cat === activeCat;
    const q = query.trim().toLowerCase();
    const matchQ = !q || [e.title, e.cat, e.loc].some(s => s.toLowerCase().includes(q));
    return matchCat && matchQ;
  });

  const hasFilter = query.trim() || activeCat !== "Tous";

  return (
    <div style={{ paddingBottom:64 }}>
      {/* ── HERO ── */}
      <div className="sv-hero" style={{
        background:`linear-gradient(135deg, ${T.purple} 0%, #8B3A5C 100%)`,
        borderRadius:24, padding:"48px 48px 44px", marginBottom:0,
      }}>
        {/* Greeting + title */}
        <p className="sv-hero-greeting" style={{ fontSize:14, color:"rgba(255,255,255,0.55)", fontFamily:F.body, fontWeight:600, marginBottom:10, textAlign:"center" }}>
          Bonjour {profile ? profile.name.split(" ")[0] : "toi"}
        </p>
        <h1 className="sv-hero-title" style={{ fontSize:38, fontFamily:F.title, fontWeight:400, color:"#fff", margin:"0 0 6px", lineHeight:1.2, textAlign:"center" }}>
          Événements à Bordeaux
        </h1>
        <p className="sv-hero-sub" style={{ fontSize:15, color:"rgba(255,255,255,0.55)", fontFamily:F.body, fontWeight:500, marginBottom:28, textAlign:"center" }}>
          Révisions, coworking, sorties — retrouve ta communauté étudiante
        </p>

        {/* Search bar — large, Airbnb-style */}
        <div style={{ maxWidth:640, margin:"0 auto 0" }}>
          <div className="sv-search" style={{
            background:"#fff", borderRadius:16,
            display:"flex", alignItems:"center", gap:12,
            padding:"6px 6px 6px 20px",
            boxShadow: focused
              ? "0 0 0 3px rgba(251,99,118,0.35), 0 8px 32px rgba(0,0,0,0.18)"
              : "0 8px 32px rgba(0,0,0,0.18)",
          }}>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Rechercher un événement à Bordeaux..."
              style={{
                flex:1, border:"none", outline:"none", background:"none",
                fontSize:15, fontWeight:500, color:T.text,
                fontFamily:F.body, padding:"10px 0"
              }}
            />
            {query && (
              <button onClick={() => setQuery("")} style={{
                background:"none", border:"none", cursor:"pointer",
                color:T.sec, fontSize:18, padding:"0 8px", flexShrink:0
              }}>✕</button>
            )}
            <button onClick={() => navigate("create")} className="sv-btn-primary" style={{
              background:T.coral, color:"#fff", border:"none", borderRadius:12,
              padding:"11px 20px", fontFamily:F.body, fontWeight:700, fontSize:13,
              cursor:"pointer", whiteSpace:"nowrap", flexShrink:0,
              boxShadow:"0 3px 12px rgba(251,99,118,0.3)"
            }}>+ Créer</button>
          </div>
        </div>


      </div>

      {/* ── CATEGORY FILTERS ── */}
      <div className="sv-cats" style={{
        display:"flex", gap:8, flexWrap:"wrap", alignItems:"center",
        padding:"24px 0 32px",
        borderBottom:`1px solid ${T.border}`, marginBottom:40
      }}>
        {CATS.map(c => {
          const active = activeCat === c;
          return (
            <button key={c} onClick={() => setActiveCat(c)}
              className={`sv-pill${active ? " sv-pill-active" : ""}`}
              style={{
                padding:"8px 20px", borderRadius:50, fontWeight:600, fontSize:13,
                fontFamily:F.body, cursor:"pointer",
                background: active ? T.coral : T.card,
                color: active ? "#fff" : T.sec,
                border:`1.5px solid ${active ? T.coral : T.border}`,
                boxShadow: active ? "0 4px 14px rgba(251,99,118,0.3)" : "none",
              }}>{c}</button>
          );
        })}
        {hasFilter && (
          <button onClick={() => { setQuery(""); setActiveCat("Tous"); }} style={{
            padding:"8px 16px", borderRadius:50, fontWeight:600, fontSize:13,
            fontFamily:F.body, background:"none", cursor:"pointer",
            color:T.sec, border:`1.5px solid ${T.border}`, marginLeft:"auto",
            display:"flex", alignItems:"center", gap:6
          }}>✕ Réinitialiser</button>
        )}
      </div>

      {/* ── RESULTS ── */}
      {hasFilter ? (
        // Unified results when searching or filtering
        <>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
            <h2 style={{ fontSize:20, fontFamily:F.title, fontWeight:400, color:T.text, margin:0 }}>
              {filtered.length} événement{filtered.length!==1?"s":""} trouvé{filtered.length!==1?"s":""}
            </h2>
            <p style={{ fontSize:13, color:T.sec, fontFamily:F.body, margin:0 }}>
              {query && `"${query}"`}{query && activeCat!=="Tous" && " · "}{activeCat!=="Tous" && activeCat}
            </p>
          </div>
          {filtered.length > 0 ? (
            <div className="sv-ev-grid sv-ev-grid-3">
              {filtered.map((ev,i) => (
                <EventCard key={ev.id} ev={ev} idx={i} onClick={ev => navigate("detail", ev)} onLike={onLike} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign:"center", padding:"72px 0", color:T.sec }}>
              <p style={{ fontWeight:700, fontSize:15, fontFamily:F.body, margin:"0 0 8px", color:T.text }}>Aucun résultat</p>
              <p style={{ fontSize:14, fontFamily:F.body, margin:0 }}>
                Essaie une autre catégorie ou un autre mot-clé
              </p>
            </div>
          )}
        </>
      ) : (
        // Default home layout
        <>
          <SectionTitle action={showAllActu ? "Réduire" : "Voir tout"} onAction={() => setShowAllActu(v => !v)}>Actualité</SectionTitle>
          <div className="sv-ev-grid sv-ev-grid-3">
            {(showAllActu ? upcomingEvents : upcomingEvents.slice(0,3)).map((ev,i) => (
              <EventCard key={ev.id} ev={ev} idx={i} onClick={ev => navigate("detail", ev)} onLike={onLike} />
            ))}
          </div>

          <SectionTitle action={showAllSugg ? "Réduire" : "Voir tout"} onAction={() => setShowAllSugg(v => !v)}>Suggestions pour toi</SectionTitle>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {(showAllSugg ? upcomingEvents : upcomingEvents.slice(0,5)).map((ev,i) => (
              <EventCardHorizontal key={ev.id} ev={ev} idx={i+3} onClick={ev => navigate("detail", ev)} onLike={onLike} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── SEARCH VIEW ────────────────────────────────────────────
function SearchView({ events, navigate, onLike }) {
  const [query, setQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const results = query.trim()
    ? events.filter(e => [e.title,e.cat,e.loc].some(s => s.toLowerCase().includes(query.toLowerCase())))
    : events;

  return (
    <div style={{ paddingBottom:64 }}>
      <h1 style={{ fontSize:28, fontFamily:F.title, fontWeight:400, color:T.text, marginBottom:24 }}>
        Recherche à Bordeaux
      </h1>

      <div style={{
        background:T.card, borderRadius:16, padding:"14px 20px",
        display:"flex", alignItems:"center", gap:12, marginBottom:16,
        border:`2px solid ${focused ? T.coral : T.border}`,
        boxShadow:"0 2px 12px rgba(93,42,66,0.06)", transition:"border 0.2s"
      }}>
        <input value={query} onChange={e=>setQuery(e.target.value)}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
          placeholder="Événement, lieu, catégorie…"
          style={{ border:"none", outline:"none", background:"none",
            fontSize:15, fontWeight:500, color:T.text, flex:1, fontFamily:F.body }} />
        {query && (
          <button onClick={()=>setQuery("")} style={{
            color:T.sec, background:"none", border:"none", cursor:"pointer", fontSize:18
          }}>✕</button>
        )}
      </div>

      {!query && (
        <div style={{ display:"flex", gap:8, marginBottom:32, flexWrap:"wrap" }}>
          {["Révisions","Coworking","Musique","Sport","Sortie"].map(t => (
            <button key={t} onClick={()=>setQuery(t)} style={{
              background:T.card, border:`1.5px solid ${T.border}`, borderRadius:50,
              padding:"7px 16px", fontWeight:600, fontSize:13, color:T.text,
              cursor:"pointer", fontFamily:F.body
            }}>{t}</button>
          ))}
        </div>
      )}

      <p style={{ fontSize:12, color:T.sec, fontWeight:600, fontFamily:F.body,
        marginBottom:20, textTransform:"uppercase", letterSpacing:"0.06em" }}>
        {query ? `${results.length} résultat${results.length!==1?"s":""}` : "Tous les événements"}
      </p>

      <div className="sv-ev-grid sv-ev-grid-3">
        {results.map((ev,i) => (
          <EventCard key={ev.id} ev={ev} idx={i} onClick={ev => navigate("detail", ev)} onLike={onLike} />
        ))}
        {results.length===0 && (
          <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"72px 0", color:T.sec }}>
            <p style={{ fontWeight:700, fontSize:15, fontFamily:F.body, margin:"0 0 6px", color:T.text }}>Aucun résultat trouvé</p>
            <p style={{ fontSize:14, fontFamily:F.body, margin:0 }}>Essaie un autre mot-clé</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── REVIEW SECTION ─────────────────────────────────────────
function ReviewSection({ eventId }) {
  const storageKey = "sv_reviews";
  const load = () => { try { return JSON.parse(localStorage.getItem(storageKey)) || {}; } catch(e) { return {}; } };

  const [allReviews, setAllReviews] = React.useState(load);
  const reviews = allReviews[eventId] || [];
  const myReview = reviews.find(r => r.me);

  const [stars, setStars] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  const [text, setText] = React.useState("");
  const [submitted, setSubmitted] = React.useState(!!myReview);

  const submit = () => {
    if (!stars) return;
    const review = { me:true, author:"Marie", stars, text:text.trim(), date:"Aujourd'hui" };
    const next = { ...allReviews, [eventId]: [...reviews.filter(r => !r.me), review] };
    localStorage.setItem(storageKey, JSON.stringify(next));
    setAllReviews(next);
    setSubmitted(true);
  };

  const avgStars = reviews.length ? (reviews.reduce((s,r) => s+r.stars, 0) / reviews.length).toFixed(1) : null;

  return (
    <div style={{ marginTop:32 }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
        <h3 style={{ fontSize:18, fontFamily:F.title, fontWeight:400, color:T.text, margin:0 }}>Avis & notes</h3>
        {avgStars && (
          <div style={{ display:"flex", alignItems:"center", gap:6,
            background:T.muted, borderRadius:20, padding:"4px 12px", border:`1px solid ${T.border}` }}>
            <span style={{ fontSize:14 }}>★</span>
            <span style={{ fontWeight:700, fontSize:14, color:T.text, fontFamily:F.body }}>{avgStars}</span>
            <span style={{ fontSize:12, color:T.sec, fontFamily:F.body }}>({reviews.length})</span>
          </div>
        )}
      </div>

      {/* Existing reviews */}
      {reviews.length > 0 && (
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:24 }}>
          {reviews.map((r,i) => (
            <div key={i} style={{ background:T.card, borderRadius:14, padding:"16px 20px",
              border:`1px solid ${T.border}` }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontWeight:700, fontSize:14, color:T.text, fontFamily:F.body }}>{r.author}</span>
                  {r.me && <span style={{ fontSize:11, background:T.lilac, color:T.coral,
                    borderRadius:20, padding:"2px 8px", fontWeight:600, fontFamily:F.body }}>Toi</span>}
                </div>
                <div style={{ display:"flex", gap:2 }}>
                  {[1,2,3,4,5].map(s => (
                    <span key={s} style={{ fontSize:14, color: s<=r.stars ? "#F59E0B" : T.border }}>★</span>
                  ))}
                </div>
              </div>
              {r.text && <p style={{ fontSize:14, color:T.text, margin:0, fontFamily:F.body, lineHeight:1.6 }}>{r.text}</p>}
              <p style={{ fontSize:11, color:T.sec, margin:"6px 0 0", fontFamily:F.body }}>{r.date}</p>
            </div>
          ))}
        </div>
      )}

      {/* Form */}
      {submitted ? (
        <div style={{ background:"#F0FDF4", borderRadius:14, padding:"16px 20px",
          border:"1px solid #BBF7D0", display:"flex", alignItems:"center", gap:10 }}>
          <p style={{ margin:0, fontWeight:600, fontSize:14, color:"#059669", fontFamily:F.body }}>
            Merci pour ton avis !
          </p>
        </div>
      ) : (
        <div style={{ background:T.card, borderRadius:16, padding:"20px 24px", border:`1px solid ${T.border}` }}>
          <p style={{ fontSize:14, fontWeight:600, color:T.text, fontFamily:F.body, marginBottom:12 }}>
            Donne ton avis sur cet événement
          </p>
          <div style={{ display:"flex", gap:6, marginBottom:16 }}>
            {[1,2,3,4,5].map(s => (
              <button key={s}
                onClick={() => setStars(s)}
                onMouseEnter={() => setHover(s)}
                onMouseLeave={() => setHover(0)}
                style={{ background:"none", border:"none", cursor:"pointer", fontSize:28, padding:0,
                  color: s <= (hover || stars) ? "#F59E0B" : T.border,
                  transition:"color 0.12s, transform 0.12s",
                  transform: s <= (hover || stars) ? "scale(1.2)" : "scale(1)" }}>★</button>
            ))}
          </div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Décris ton expérience (optionnel)…"
            rows={3}
            style={{ width:"100%", background:T.muted, border:`1.5px solid ${T.border}`,
              borderRadius:12, padding:"12px 16px", fontSize:14, fontFamily:F.body,
              color:T.text, resize:"none", outline:"none", boxSizing:"border-box",
              marginBottom:12 }}
          />
          <button
            onClick={submit}
            disabled={!stars}
            className="sv-btn-primary"
            style={{ padding:"11px 28px", borderRadius:12, fontWeight:700, fontSize:14,
              cursor: stars ? "pointer" : "not-allowed",
              background: stars ? T.coral : T.border, color:"#fff", border:"none",
              fontFamily:F.body, opacity: stars ? 1 : 0.5,
              boxShadow: stars ? "0 4px 14px rgba(251,99,118,0.35)" : "none",
              transition:"all 0.18s" }}>
            Envoyer mon avis
          </button>
        </div>
      )}
    </div>
  );
}

// ── EVENT DETAIL ───────────────────────────────────────────
function EventDetailView({ ev, navigate, onJoin, onLike, onContactHost, onUpdateImage, onEdit, onDelete }) {
  const idx = EVENTS_DATA.findIndex(e => e.id === ev.id);
  const parts = PCOUNT[idx >= 0 ? idx : 0];
  const [joined, setJoined] = React.useState(ev.joined);
  const liked = !!ev.liked;
  const [imgSrc, setImgSrc] = React.useState(ev.img);
  const [uploadingImg, setUploadingImg] = React.useState(false);
  const [cropping, setCropping] = React.useState(false);
  const [imgPos, setImgPos] = React.useState(ev.imgPosition || "50% 50%");
  const [savingPos, setSavingPos] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const dragRef = React.useRef(null);

  const handleImageEdit = async (e) => {
    const file = e.target.files[0];
    if (!file || !onUpdateImage) return;
    setUploadingImg(true);
    try {
      const url = await onUpdateImage(ev.id, file);
      if (url) setImgSrc(url);
    } catch(err) { console.warn("Photo update failed:", err); }
    setUploadingImg(false);
  };

  const startCrop = (e) => {
    const startX = e.clientX, startY = e.clientY;
    const parts = imgPos.split(" ");
    const startPx = parseFloat(parts[0]) || 50;
    const startPy = parseFloat(parts[1]) || 50;
    const onMove = (me) => {
      const dx = me.clientX - startX;
      const dy = me.clientY - startY;
      const nx = Math.max(0, Math.min(100, startPx - dx * 0.15));
      const ny = Math.max(0, Math.min(100, startPy - dy * 0.15));
      setImgPos(`${nx.toFixed(1)}% ${ny.toFixed(1)}%`);
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const savePosition = async () => {
    setSavingPos(true);
    try {
      await DB.updateActivityImagePosition(ev.id, imgPos);
      setCropping(false);
    } catch(err) { console.warn("Position save failed:", err); }
    setSavingPos(false);
  };

  const infoItems = [
    { icon:"", label:"Date", val:`${ev.date} · ${ev.time}` },
    { icon:"", label:"Lieu", val:ev.loc },
    { icon:"", label:"Adresse", val:ev.address },
    { icon:"", label:"Organisé par", val:ev.host },
  ];

  return (
    <div style={{ paddingBottom:64 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24, gap:10, flexWrap:"wrap" }}>
        <button onClick={() => navigate(-1)} style={{
          display:"flex", alignItems:"center", gap:8,
          color:T.sec, background:"none", border:"none", cursor:"pointer",
          fontFamily:F.body, fontWeight:600, fontSize:14
        }}>← Retour</button>

        {ev.createdByMe && (
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {onEdit && (
              <button onClick={() => onEdit(ev)} style={{
                display:"flex", alignItems:"center", gap:6,
                background:T.card, border:`1.5px solid ${T.border}`,
                borderRadius:12, padding:"9px 16px", cursor:"pointer",
                fontFamily:F.body, fontWeight:700, fontSize:13, color:T.text
              }}>Modifier</button>
            )}
            {onDelete && !confirmDelete && (
              <button onClick={() => setConfirmDelete(true)} style={{
                display:"flex", alignItems:"center", gap:6,
                background:"#FDE8EC", border:"1.5px solid #FB6376",
                borderRadius:12, padding:"9px 16px", cursor:"pointer",
                fontFamily:F.body, fontWeight:700, fontSize:13, color:"#E84D62"
              }}>Supprimer</button>
            )}
            {confirmDelete && (
              <div style={{ display:"flex", gap:8, alignItems:"center",
                background:T.card, border:`1.5px solid ${T.border}`,
                borderRadius:12, padding:"8px 14px" }}>
                <span style={{ fontSize:13, fontFamily:F.body, color:T.text, fontWeight:600 }}>
                  Supprimer définitivement ?
                </span>
                <button onClick={async () => {
                  setDeleting(true);
                  try { await onDelete(ev.id); } catch(e) { console.error(e); setDeleting(false); setConfirmDelete(false); }
                }} disabled={deleting} style={{
                  background:"#E84D62", color:"#fff", border:"none", borderRadius:10,
                  padding:"7px 14px", fontFamily:F.body, fontWeight:700, fontSize:12,
                  cursor: deleting ? "not-allowed" : "pointer", opacity: deleting ? 0.7 : 1
                }}>{deleting ? "…" : "Oui, supprimer"}</button>
                <button onClick={() => setConfirmDelete(false)} style={{
                  background:"none", border:`1.5px solid ${T.border}`, borderRadius:10,
                  padding:"7px 12px", fontFamily:F.body, fontWeight:600, fontSize:12,
                  cursor:"pointer", color:T.sec
                }}>Annuler</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="sv-detail-img" style={{ borderRadius:24, overflow:"hidden", height:400, marginBottom:40, position:"relative" }}>
        <img src={imgSrc} alt={ev.title}
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition: imgPos,
            cursor: cropping ? "grab" : "default", userSelect:"none" }}
          onMouseDown={cropping ? startCrop : undefined}
        />
        {/* Overlay recadrage */}
        {cropping && (
          <div style={{
            position:"absolute", inset:0,
            background:"rgba(0,0,0,0.35)", display:"flex",
            flexDirection:"column", alignItems:"center", justifyContent:"center", gap:12
          }}>
            <p style={{ color:"#fff", fontFamily:F.body, fontWeight:600, fontSize:14,
              background:"rgba(0,0,0,0.5)", borderRadius:10, padding:"8px 16px" }}>
              Glisse l'image pour recadrer
            </p>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => { setCropping(false); setImgPos(ev.imgPosition || "50% 50%"); }}
                style={{ padding:"9px 20px", borderRadius:12, border:"none", background:"rgba(255,255,255,0.2)",
                  color:"#fff", fontFamily:F.body, fontWeight:600, fontSize:13, cursor:"pointer" }}>
                Annuler
              </button>
              <button onClick={savePosition} disabled={savingPos}
                style={{ padding:"9px 20px", borderRadius:12, border:"none", background:T.coral,
                  color:"#fff", fontFamily:F.body, fontWeight:700, fontSize:13, cursor:"pointer",
                  opacity: savingPos ? 0.7 : 1 }}>
                {savingPos ? "Sauvegarde…" : "✓ Enregistrer"}
              </button>
            </div>
          </div>
        )}
        {/* Boutons créateur */}
        {ev.createdByMe && !cropping && (
          <div style={{ position:"absolute", bottom:16, right:16, display:"flex", gap:8 }}>
            <button onClick={() => setCropping(true)} style={{
              background:"rgba(0,0,0,0.55)", color:"#fff",
              borderRadius:12, padding:"9px 16px", border:"none",
              fontFamily:F.body, fontWeight:600, fontSize:13, cursor:"pointer",
              backdropFilter:"blur(4px)"
            }}>Recadrer</button>
            <label style={{
              background:"rgba(0,0,0,0.55)", color:"#fff",
              borderRadius:12, padding:"9px 16px",
              fontFamily:F.body, fontWeight:600, fontSize:13,
              cursor: uploadingImg ? "wait" : "pointer",
              display:"flex", alignItems:"center", gap:8,
              backdropFilter:"blur(4px)"
            }}>
              {uploadingImg ? "Upload…" : "Modifier la photo"}
              <input type="file" accept="image/*" style={{ display:"none" }}
                onChange={handleImageEdit} disabled={uploadingImg} />
            </label>
          </div>
        )}
      </div>

      <div className="sv-detail-grid">
        {/* Left */}
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
            <Badge>{ev.cat}</Badge>
            {joined && <Badge color="#059669">✓ Tu participes</Badge>}
          </div>
          <h1 style={{ fontSize:30, fontFamily:F.title, fontWeight:400, color:T.text, marginBottom:24, lineHeight:1.2 }}>
            {ev.title}
          </h1>

          <div className="sv-info-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:32 }}>
            {infoItems.map(({label,val}) => (
              <div key={label} style={{
                background:T.muted, borderRadius:14, padding:"14px 16px",
                border:`1px solid ${T.border}`
              }}>
                <p style={{ fontSize:11, color:T.sec, fontWeight:600, fontFamily:F.body, marginBottom:4, textTransform:"uppercase", letterSpacing:"0.05em" }}>{label}</p>
                <p style={{ fontSize:13, fontWeight:600, color:T.text, fontFamily:F.body, margin:0, lineHeight:1.4 }}>{val}</p>
              </div>
            ))}
          </div>

          <div style={{ background:T.card, borderRadius:16, padding:"24px", border:`1px solid ${T.border}`, marginBottom:24 }}>
            <h3 style={{ fontSize:16, fontFamily:F.title, fontWeight:400, color:T.text, marginBottom:12 }}>Description</h3>
            <p style={{ fontSize:15, color:T.text, lineHeight:1.75, margin:0, fontFamily:F.body, fontWeight:400 }}>{ev.desc}</p>
          </div>

          <div style={{ background:T.card, borderRadius:16, padding:"24px", border:`1px solid ${T.border}` }}>
            <h3 style={{ fontSize:16, fontFamily:F.title, fontWeight:400, color:T.text, marginBottom:16 }}>
              Participants ({parts})
            </h3>
            <ParticipantDots count={parts} />
          </div>

          {ev.past && <ReviewSection eventId={ev.id} />}
        </div>

        {/* Right sticky card */}
        <div className="sv-detail-sticky" style={{
          background:T.card, borderRadius:20, padding:"28px",
          border:`1px solid ${T.border}`,
          boxShadow:"0 4px 24px rgba(93,42,66,0.1)",
          position:"sticky", top:88
        }}>
          <h2 style={{ fontSize:18, fontFamily:F.title, fontWeight:400, color:T.text, marginBottom:4, lineHeight:1.3 }}>
            {ev.title}
          </h2>
          <p style={{ fontSize:14, color:T.sec, fontFamily:F.body, fontWeight:500, marginBottom:24 }}>
            {ev.date} · {ev.time}
          </p>

          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
            <Avatar init={ev.hostInit} color={ev.hostColor} size={40} />
            <div>
              <p style={{ fontSize:12, color:T.sec, fontFamily:F.body, margin:0 }}>Organisé par</p>
              <p style={{ fontWeight:700, fontSize:15, color:T.text, fontFamily:F.body, margin:0 }}>{ev.host}</p>
            </div>
          </div>

          <div style={{ marginBottom:24 }}>
            <ParticipantDots count={parts} />
          </div>

          <button onClick={() => { setJoined(!joined); onJoin(ev.id); }} className={joined ? "sv-btn-ghost" : "sv-btn-primary"} style={{
            width:"100%", padding:"15px", borderRadius:14, fontWeight:700,
            fontSize:16, cursor:"pointer", border:"none", fontFamily:F.body,
            background: joined ? T.lilac : T.coral,
            color: joined ? T.coral : "#fff",
            boxShadow: joined ? "none" : "0 6px 20px rgba(251,99,118,0.35)",
            transition:"all 0.2s", marginBottom:12
          }}>
            {joined ? "✓ Tu participes déjà" : "Rejoindre l'événement"}
          </button>

          {joined && (
            <button onClick={() => { setJoined(false); onJoin(ev.id); }} style={{
              width:"100%", padding:"10px", borderRadius:12, fontWeight:600,
              fontSize:13, cursor:"pointer", border:`1.5px solid ${T.border}`,
              background:"transparent", color:T.sec, fontFamily:F.body, marginBottom:12
            }}>Se désinscrire</button>
          )}

          <button onClick={() => onContactHost ? onContactHost(ev) : navigate("messages")} style={{
            width:"100%", padding:"11px", borderRadius:12, fontWeight:600,
            fontSize:14, cursor:"pointer", border:`1.5px solid ${T.border}`,
            background:"transparent", color:T.text, fontFamily:F.body, marginBottom:8
          }}>Contacter l'organisateur</button>

          {onLike && (
            <button onClick={() => onLike(ev.id)} style={{
              width:"100%", padding:"11px", borderRadius:12, fontWeight:600,
              fontSize:14, cursor:"pointer",
              border:`1.5px solid ${liked ? T.coral : T.border}`,
              background: liked ? T.lilac : "transparent",
              color: liked ? T.coral : T.text,
              fontFamily:F.body, transition:"all 0.18s"
            }}>{liked ? "♥ Retirer des favoris" : "♡ Ajouter aux favoris"}</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── MESSAGES VIEW ──────────────────────────────────────────
function MessagesView({ convos, setConvos, activeConvoId, setActiveConvoId, navigate, currentUser }) {
  const initialIdx = React.useMemo(() => {
    if (activeConvoId) {
      const i = convos.findIndex(c => c.id === activeConvoId);
      if (i >= 0) return i;
    }
    return 0;
  }, []); // run once on mount
  const [active, setActive] = React.useState(initialIdx);
  const [draft, setDraft] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const bottomRef = React.useRef(null);
  const convo = convos[active];

  // (Plus de persistance localStorage : les messages sont stockés dans Supabase chat_messages)

  // Si on arrive depuis "Contacter l'organisateur", on focus la bonne convo puis on consomme l'id
  React.useEffect(() => {
    if (activeConvoId) {
      const i = convos.findIndex(c => c.id === activeConvoId);
      if (i >= 0) {
        setActive(i);
        setConvos(prev => prev.map((c, j) => j === i ? {...c, unread: 0} : c));
      }
      setActiveConvoId && setActiveConvoId(null);
    }
  }, [activeConvoId]);

  const openConvo = (i) => {
    setActive(i);
    setConvos(prev => prev.map((c, j) => j === i ? {...c, unread: 0} : c));
    setMobileSidebarOpen(false);
  };

  React.useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior:"smooth" });
  }, [convos, typing]);

  const send = async () => {
    if (!draft.trim() || typing || !convo || !currentUser) return;
    const msgText = draft;

    // 1. Optimistic update : ajouter le message de l'utilisateur immédiatement
    const updatedMsgs = [...convo.msgs, {me:true, txt:msgText}];
    setConvos(prev => prev.map((c,i) => i===active
      ? {...c, msgs:updatedMsgs, preview:msgText, unread:0}
      : c));
    setDraft("");
    setTyping(true);

    // 2. Sauvegarder le message user dans Supabase (best-effort, on continue même si ça échoue)
    try {
      await DB.sendChatMessage(currentUser.id, convo.activity_id, "user", msgText);
    } catch(err) {
      console.error("Échec sauvegarde du message utilisateur :", err);
    }

    // 3. Construire le payload pour OpenAI
    const apiMessages = updatedMsgs.map(m => ({
      role: m.me ? "user" : "assistant",
      content: m.txt,
    }));
    const systemPrompt = convo.persona
      || "Tu es un·e étudiant·e bordelais·e sympa qui chatte sur Study Vibes. Réponds en français, court, chaleureux, max 2-3 phrases.";

    // 4. Appeler la fonction serverless /api/chat
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, systemPrompt }),
      });
      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`API ${res.status} : ${errBody}`);
      }
      const data = await res.json();
      const reply = (data.reply || "").trim() || "Hmm…";

      // 5. Sauvegarder la réponse IA dans Supabase
      try {
        await DB.sendChatMessage(currentUser.id, convo.activity_id, "assistant", reply);
      } catch(err) {
        console.error("Échec sauvegarde de la réponse IA :", err);
      }

      setTyping(false);
      setConvos(prev => prev.map((c,i) => i===active
        ? {...c, msgs:[...c.msgs, {me:false, txt:reply}], preview:reply, time:"maintenant"}
        : c));
    } catch (err) {
      console.error("Chat error:", err);
      setTyping(false);
      setConvos(prev => prev.map((c,i) => i===active
        ? {...c, msgs:[...c.msgs, {me:false, txt:"Impossible de joindre l'IA. Réessaie dans un instant."}], preview:"Erreur de connexion", time:"maintenant"}
        : c));
    }
  };

  // Empty state : aucune conversation tant qu'on n'a contacté personne
  if (convos.length === 0) {
    return (
      <div style={{
        height:"calc(100vh - 64px - 80px)",
        background:T.card,
        borderRadius:20,
        border:`1px solid ${T.border}`,
        boxShadow:"0 4px 24px rgba(93,42,66,0.08)",
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        padding:"48px 24px", textAlign:"center", gap:16
      }}>
        <h2 style={{ fontSize:22, fontFamily:F.title, fontWeight:400, color:T.text, margin:0 }}>
          Aucune conversation pour l'instant
        </h2>
        <p style={{ fontSize:14, color:T.sec, fontFamily:F.body, maxWidth:420, lineHeight:1.6, margin:0, fontWeight:500 }}>
          Pour démarrer une discussion, ouvre un événement qui t'intéresse et clique sur <span style={{color:T.coral, fontWeight:700}}>« Contacter l'organisateur »</span>.
        </p>
        <button onClick={() => navigate && navigate("home")} className="sv-btn-primary" style={{
          marginTop:8,
          padding:"12px 28px", borderRadius:12, fontWeight:700,
          fontSize:14, cursor:"pointer", border:"none",
          background:T.coral, color:"#fff",
          fontFamily:F.body,
          boxShadow:"0 4px 14px rgba(251,99,118,0.3)"
        }}>
          Découvrir les événements
        </button>
      </div>
    );
  }

  return (
    <div className="sv-msg-container" style={{
      display:"grid", gridTemplateColumns:"300px 1fr",
      height:"calc(100vh - 64px - 80px)", background:T.card,
      borderRadius:20, overflow:"hidden",
      border:`1px solid ${T.border}`,
      boxShadow:"0 4px 24px rgba(93,42,66,0.08)"
    }}>
      {/* Sidebar */}
      <div className={mobileSidebarOpen ? "sv-msg-sidebar sv-msg-show" : "sv-msg-sidebar"} style={{ borderRight:`1px solid ${T.border}`, display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"16px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <h2 style={{ fontSize:17, fontFamily:F.title, fontWeight:400, color:T.text, margin:0 }}>Messages</h2>
          <span style={{ fontSize:11, color:T.sec, fontFamily:F.body, fontWeight:600 }}>
            {convos.reduce((n,c) => n + (c.unread||0), 0) > 0
              ? `${convos.reduce((n,c) => n + (c.unread||0), 0)} non lu${convos.reduce((n,c) => n + (c.unread||0), 0) > 1 ? "s" : ""}`
              : "Tout lu"}
          </span>
        </div>
        <div style={{ overflowY:"auto", flex:1 }}>
          {convos.map((c,i) => {
            const isActive = active === i;
            return (
              <button key={c.id} onClick={()=>openConvo(i)} className="sv-convo-row" style={{
                width:"100%", padding:"13px 16px 13px 13px",
                display:"flex", gap:12, alignItems:"center", textAlign:"left",
                background: isActive ? T.lilac : "transparent",
                border:"none", borderBottom:`1px solid ${T.border}`,
                borderLeft: isActive ? `3px solid ${T.coral}` : "3px solid transparent",
                cursor:"pointer", fontFamily:F.body,
                transition:"background 0.12s, border-color 0.12s"
              }}>
                <div style={{ position:"relative", flexShrink:0 }}>
                  <Avatar init={c.init} color={c.color} size={42} />
                  {c.unread>0 && (
                    <div style={{
                      position:"absolute", top:-2, right:-2,
                      background:T.coral, borderRadius:50, width:18, height:18,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:10, color:"#fff", fontWeight:700
                    }}>{c.unread}</div>
                  )}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:3 }}>
                    <span style={{ fontWeight:700, fontSize:14, color: isActive ? T.coral : T.text }}>{c.name}</span>
                    <span style={{ fontSize:11, color:T.sec, fontWeight:500, flexShrink:0, marginLeft:6 }}>{c.time}</span>
                  </div>
                  <div style={{
                    fontSize:13, color: isActive ? T.purple : T.sec,
                    fontWeight: c.unread>0 ? 600 : 400,
                    whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"
                  }}>{c.preview}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat */}
      <div className={mobileSidebarOpen ? "sv-msg-chat sv-msg-hidden" : "sv-msg-chat"} style={{ display:"flex", flexDirection:"column", minHeight:0 }}>
        <div style={{ padding:"16px 24px", borderBottom:`1px solid ${T.border}`,
          display:"flex", alignItems:"center", gap:12 }}>
          <button className="sv-msg-back-btn" onClick={() => setMobileSidebarOpen(true)} style={{
            background:"none", border:"none", cursor:"pointer",
            color:T.sec, fontFamily:F.body, fontWeight:700, fontSize:18, padding:"0 4px 0 0"
          }}>←</button>
          <Avatar init={convo.init} color={convo.color} size={40} />
          <div>
            <p style={{ fontWeight:700, fontSize:16, color:T.text, margin:0, fontFamily:F.body }}>{convo.name}</p>
            <p style={{ fontSize:12, color:"#22c55e", fontWeight:600, margin:0, fontFamily:F.body }}>En ligne</p>
          </div>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:"24px", display:"flex", flexDirection:"column", gap:12 }}>
          {convo.msgs.map((m,i) => (
            <div key={i} style={{ display:"flex", justifyContent:m.me?"flex-end":"flex-start" }}>
              {!m.me && <div style={{marginRight:8,alignSelf:"flex-end"}}><Avatar init={convo.init} color={convo.color} size={28} /></div>}
              <div style={{
                background: m.me ? T.coral : T.muted,
                color: m.me ? "#fff" : T.text,
                borderRadius: m.me ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                padding:"11px 16px", fontSize:14, fontWeight:500, fontFamily:F.body,
                maxWidth:"60%", lineHeight:1.55,
                marginLeft: !m.me ? 4 : 0
              }}>{m.txt}</div>
            </div>
          ))}
          {typing && (
            <div style={{ display:"flex", justifyContent:"flex-start", alignItems:"flex-end", gap:8 }}>
              <Avatar init={convo.init} color={convo.color} size={28} />
              <div style={{
                background:T.muted, borderRadius:"18px 18px 18px 4px",
                padding:"12px 18px", display:"flex", gap:5, alignItems:"center"
              }}>
                {[0,1,2].map(j => (
                  <div key={j} style={{
                    width:7, height:7, borderRadius:"50%", background:T.sec,
                    animation:"sv-bounce 1.2s infinite", animationDelay:`${j*0.2}s`
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div style={{ padding:"16px 24px", borderTop:`1px solid ${T.border}`,
          display:"flex", gap:12, alignItems:"center" }}>
          <input value={draft} onChange={e=>setDraft(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&send()}
            disabled={typing}
            placeholder={typing ? "L'IA réfléchit…" : "Écrire un message…"}
            style={{
              flex:1, background:T.muted, border:`1.5px solid ${T.border}`, borderRadius:50,
              padding:"12px 20px", fontSize:14, fontWeight:500, color:T.text,
              fontFamily:F.body, outline:"none",
              opacity: typing ? 0.6 : 1
            }} />
          <button onClick={send} disabled={typing || !draft.trim()} className="sv-btn-primary" style={{
            width:46, height:46, borderRadius:46,
            background: (typing || !draft.trim()) ? T.border : T.coral,
            border:"none",
            cursor: (typing || !draft.trim()) ? "not-allowed" : "pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:18,
            boxShadow: (typing || !draft.trim()) ? "none" : "0 4px 12px rgba(251,99,118,0.3)",
            opacity: (typing || !draft.trim()) ? 0.5 : 1
          }}>➤</button>
        </div>
      </div>
    </div>
  );
}

// ── PROFILE VIEW ───────────────────────────────────────────
function ProfileView({ events, navigate, onLike, profile, setProfile, onAvatarUpload }) {
  const [showAllParticipating, setShowAllParticipating] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(profile);
  const [uploadingAvatar, setUploadingAvatar] = React.useState(false);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !onAvatarUpload) return;
    setUploadingAvatar(true);
    try { await onAvatarUpload(file); } catch(err) { console.error("Avatar upload error:", err); }
    setUploadingAvatar(false);
  };

  const saveProfile = () => {
    localStorage.setItem("sv_profile", JSON.stringify(draft));
    setProfile(draft);
    setEditing(false);
  };


  const participating = events.filter(e => e.joined);
  const participatingVisible = showAllParticipating ? participating : participating.slice(0, 6);
  const past = events.filter(e => e.past);
  const liked = events.filter(e => e.liked);
  const created = events.filter(e => e.createdByMe);
  const initials = profile.name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();

  return (
    <div style={{ paddingBottom:64 }}>

      {/* ── EDIT MODAL ── */}
      {editing && (
        <div onClick={() => setEditing(false)} style={{
          position:"fixed", inset:0, background:"rgba(93,42,66,0.45)",
          zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center"
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background:T.card, borderRadius:24, padding:"36px 40px",
            width:"100%", maxWidth:520, boxShadow:"0 20px 60px rgba(93,42,66,0.25)"
          }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
              <h2 style={{ fontSize:20, fontFamily:F.title, fontWeight:400, color:T.text, margin:0 }}>Modifier le profil</h2>
              <button onClick={() => setEditing(false)} style={{
                background:"none", border:"none", fontSize:20, cursor:"pointer", color:T.sec
              }}>✕</button>
            </div>
            {[
              { label:"Nom complet", key:"name", placeholder:"Marie Dupont" },
              { label:"Pseudo", key:"handle", placeholder:"marie.dupont" },
              { label:"Filière", key:"study", placeholder:"Droit, Informatique…" },
              { label:"Ville", key:"city", placeholder:"Bordeaux" },
            ].map(({ label, key, placeholder }) => (
              <div key={key} style={{ marginBottom:16 }}>
                <p style={{ fontSize:12, fontWeight:600, color:T.sec, fontFamily:F.body,
                  marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>{label}</p>
                <input
                  value={draft[key]}
                  onChange={e => setDraft(p => ({...p, [key]: e.target.value}))}
                  placeholder={placeholder}
                  style={{ width:"100%", background:T.muted, border:`1.5px solid ${T.border}`,
                    borderRadius:12, padding:"11px 16px", fontSize:14, fontFamily:F.body,
                    color:T.text, outline:"none", boxSizing:"border-box" }}
                />
              </div>
            ))}
            <div style={{ marginBottom:24 }}>
              <p style={{ fontSize:12, fontWeight:600, color:T.sec, fontFamily:F.body,
                marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Bio</p>
              <textarea
                value={draft.bio}
                onChange={e => setDraft(p => ({...p, bio: e.target.value}))}
                rows={3}
                placeholder="Décris-toi en quelques mots…"
                style={{ width:"100%", background:T.muted, border:`1.5px solid ${T.border}`,
                  borderRadius:12, padding:"11px 16px", fontSize:14, fontFamily:F.body,
                  color:T.text, outline:"none", resize:"none", boxSizing:"border-box" }}
              />
            </div>
            <div style={{ display:"flex", gap:12, justifyContent:"flex-end" }}>
              <button onClick={() => setEditing(false)} style={{
                padding:"11px 24px", borderRadius:12, fontWeight:600, fontSize:14,
                cursor:"pointer", background:"none", border:`1.5px solid ${T.border}`,
                color:T.sec, fontFamily:F.body
              }}>Annuler</button>
              <button onClick={saveProfile} className="sv-btn-primary" style={{
                padding:"11px 28px", borderRadius:12, fontWeight:700, fontSize:14,
                cursor:"pointer", background:T.coral, border:"none", color:"#fff",
                fontFamily:F.body, boxShadow:"0 4px 14px rgba(251,99,118,0.35)"
              }}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* Header banner */}
      <div className="sv-profile-banner" style={{
        background:`linear-gradient(135deg, ${T.purple} 0%, #8B3A5C 100%)`,
        borderRadius:24, padding:"24px 28px", marginBottom:32,
        display:"flex", alignItems:"center", gap:20, flexWrap:"wrap"
      }}>
        {/* Avatar + upload */}
        <div style={{ position:"relative", flexShrink:0 }}>
          <Avatar init={initials} color={T.coral} size={80} src={profile.avatarUrl} />
          <label htmlFor="sv-avatar-upload" style={{
            position:"absolute", bottom:-2, right:-2,
            width:26, height:26, borderRadius:26,
            background:"#fff", border:`2px solid ${T.coral}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            cursor: uploadingAvatar ? "wait" : "pointer", fontSize:11
          }} title="Changer la photo">
            {uploadingAvatar ? "…" : "+"}
            <input id="sv-avatar-upload" type="file" accept="image/*"
              style={{ display:"none" }} onChange={handleAvatarUpload}
              disabled={uploadingAvatar} />
          </label>
        </div>

        {/* Info */}
        <div style={{ flex:1, minWidth:160 }}>
          <h1 style={{ fontSize:20, fontFamily:F.title, fontWeight:400, color:"#fff", marginBottom:3, lineHeight:1.2 }}>{profile.name}</h1>
          <p style={{ fontSize:12, color:"rgba(255,255,255,0.6)", fontFamily:F.body, fontWeight:500, marginBottom:14 }}>
            @{profile.handle}{profile.study ? ` · ${profile.study}` : ""}{profile.city ? `, ${profile.city}` : ""}
          </p>
          <div className="sv-profile-stats" style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
            {[[String(participating.length),"Participations"],["12","Amis"],[String(created.length),"Créés"],[String(liked.length),"Favoris"]].map(([n,l])=>(
              <div key={l}>
                <p style={{ fontSize:18, fontFamily:F.title, fontWeight:400, color:"#fff", margin:0 }}>{n}</p>
                <p style={{ fontSize:11, color:"rgba(255,255,255,0.55)", fontFamily:F.body, margin:0 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display:"flex", gap:8, flexShrink:0 }}>
          <button onClick={() => { setDraft(profile); setEditing(true); }} style={{
            background:"rgba(255,255,255,0.15)", color:"#fff",
            border:"1.5px solid rgba(255,255,255,0.25)", borderRadius:10,
            padding:"9px 16px", fontWeight:700, fontSize:13,
            cursor:"pointer", fontFamily:F.body, whiteSpace:"nowrap"
          }}>Modifier</button>
        </div>
      </div>

      {/* Bio */}
      <div className="sv-profile-bio" style={{ background:T.card, borderRadius:16, padding:"20px 24px",
        border:`1px solid ${T.border}`, marginBottom:40 }}>
        <p style={{ fontSize:12, fontWeight:600, color:T.sec, fontFamily:F.body, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.06em" }}>À propos</p>
        <p style={{ fontSize:15, color:T.text, lineHeight:1.7, margin:0, fontFamily:F.body, fontWeight:400 }}>
          {profile.bio}
        </p>
      </div>

      {/* Mes créations */}
      <SectionTitle action={created.length > 3 ? "Voir tout" : null} onAction={() => navigate("home")}>Activités que j'ai créées</SectionTitle>
      {created.length > 0 ? (
        <div className="sv-ev-grid sv-ev-grid-3">
          {created.map((ev,i) => (
            <EventCard key={ev.id} ev={ev} idx={i} onClick={ev => navigate("detail", ev)} onLike={onLike} />
          ))}
        </div>
      ) : (
        <div style={{ padding:"28px 32px", color:T.sec,
          background:T.card, borderRadius:16, marginBottom:48, border:`1px solid ${T.border}`,
          display:"flex", alignItems:"center", gap:16 }}>
          <p style={{ fontWeight:500, fontFamily:F.body, margin:0, fontSize:14 }}>
            Tu n'as pas encore créé d'activité. Clique sur <span style={{color:T.coral, fontWeight:700}}>« + Créer »</span> pour lancer la tienne !
          </p>
        </div>
      )}

      {/* Favoris */}
      <SectionTitle>Mes favoris</SectionTitle>
      {liked.length > 0 ? (
        <div className="sv-ev-grid sv-ev-grid-3">
          {liked.map((ev,i) => (
            <EventCard key={ev.id} ev={ev} idx={i} onClick={ev => navigate("detail", ev)} onLike={onLike} />
          ))}
        </div>
      ) : (
        <div style={{ padding:"28px 32px", color:T.sec,
          background:T.card, borderRadius:16, marginBottom:48, border:`1px solid ${T.border}`,
          display:"flex", alignItems:"center", gap:16 }}>
          <p style={{ fontWeight:500, fontFamily:F.body, margin:0, fontSize:14 }}>
            Aucun favori pour l'instant. Clique sur le ♡ d'une activité pour la retrouver ici.
          </p>
        </div>
      )}

      {/* Participations */}
      <SectionTitle action={participating.length > 6 ? (showAllParticipating ? "Réduire" : "Voir tout") : null} onAction={() => setShowAllParticipating(v => !v)}>Mes participations</SectionTitle>
      {participating.length > 0 ? (
        <div className="sv-ev-grid sv-ev-grid-3">
          {participatingVisible.map((ev,i) => (
            <EventCard key={ev.id} ev={ev} idx={i} onClick={ev => navigate("detail", ev)} onLike={onLike} />
          ))}
        </div>
      ) : (
        <div style={{ padding:"28px 32px", color:T.sec,
          background:T.card, borderRadius:16, marginBottom:48, border:`1px solid ${T.border}`,
          display:"flex", alignItems:"center", gap:16 }}>
          <p style={{ fontWeight:500, fontFamily:F.body, margin:0, fontSize:14 }}>
            Tu ne participes à aucun événement pour l'instant. Rejoins une activité depuis l'accueil !
          </p>
        </div>
      )}

      {/* Past */}
      <SectionTitle>Événements passés</SectionTitle>
      <div className="sv-past-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
        {past.map((ev) => (
          <div key={ev.id} onClick={()=>navigate("detail",ev)} className="sv-past-card" style={{
            background:T.card, borderRadius:16, overflow:"hidden",
            display:"flex", border:`1px solid ${T.border}`,
            cursor:"pointer", opacity:0.7, transition:"opacity 0.18s"
          }}
          onMouseEnter={e=>e.currentTarget.style.opacity="1"}
          onMouseLeave={e=>e.currentTarget.style.opacity="0.7"}>
            <img src={ev.img} alt={ev.title} style={{width:96,height:88,objectFit:"cover",flexShrink:0}} />
            <div style={{ padding:"14px 16px", flex:1, minWidth:0 }}>
              <Badge>{ev.cat}</Badge>
              <p style={{ fontWeight:600, fontSize:14, color:T.text, margin:"6px 0 4px",
                whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", fontFamily:F.body }}>{ev.title}</p>
              <p style={{ fontSize:12, color:T.sec, margin:0, fontFamily:F.body }}>{ev.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── AUTH VIEW ──────────────────────────────────────────────
function AuthView({ onLogin }) {
  const [isLogin, setIsLogin] = React.useState(true);
  const [form, setForm]       = React.useState({ name:"", email:"", password:"", school:"", city:"" });
  const [error, setError]     = React.useState("");
  const [info, setInfo]       = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const set = k => e => setForm(f => ({...f, [k]: e.target.value}));

  const handleSubmit = async () => {
    setError(""); setInfo("");
    if (!form.email || !form.password) { setError("E-mail et mot de passe requis."); return; }
    if (!isLogin && !form.name)         { setError("Le nom est requis."); return; }
    setLoading(true);
    try {
      if (isLogin) {
        const data = await DB.signIn(form.email, form.password);
        onLogin(data.user);
      } else {
        const data = await DB.signUp(form.email, form.password, form.name, form.school, form.city);
        if (data.session) {
          onLogin(data.user);
        } else {
          // Confirmation e-mail requise
          setInfo("Vérifie ta boîte mail pour confirmer ton compte puis connecte-toi.");
          setIsLogin(true);
        }
      }
    } catch(e) {
      setError(e.message || "Une erreur est survenue.");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      background:`linear-gradient(160deg, ${T.purple} 0%, #8B3A5C 55%, #C04A6A 100%)`,
      padding:"40px 24px"
    }}>
      <div style={{ marginBottom:40, textAlign:"center" }}>
        <p style={{ fontSize:12, color:"rgba(255,255,255,0.45)", fontFamily:F.body,
          fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:14 }}>
          Bordeaux · Étudiants
        </p>
        <h1 style={{ fontSize:44, fontFamily:F.title, fontWeight:400, color:"#fff", margin:0, lineHeight:1.1 }}>
          Study Vibes
        </h1>
        <p style={{ fontSize:15, color:"rgba(255,255,255,0.55)", fontFamily:F.body,
          fontWeight:500, margin:"12px 0 0" }}>
          {isLogin ? "Content de te revoir !" : "Rejoins la communauté bordelaise"}
        </p>
      </div>

      <div style={{ width:"100%", maxWidth:420,
        background:T.card, borderRadius:24, padding:"36px",
        boxShadow:"0 24px 64px rgba(0,0,0,0.25)" }}>

        <div style={{ display:"flex", background:T.muted, borderRadius:14, padding:4, marginBottom:28 }}>
          {["Connexion","Inscription"].map((l,i) => (
            <button key={l} onClick={()=>{ setIsLogin(i===0); setError(""); setInfo(""); }}
              className="sv-auth-tab" style={{
              flex:1, padding:"10px", borderRadius:11,
              fontWeight:700, fontSize:14, fontFamily:F.body,
              background: (isLogin?i===0:i===1) ? T.card : "transparent",
              color: (isLogin?i===0:i===1) ? T.text : T.sec,
              border:"none", cursor:"pointer",
              boxShadow: (isLogin?i===0:i===1) ? "0 2px 8px rgba(93,42,66,0.08)" : "none",
            }}>{l}</button>
          ))}
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:16, marginBottom:24 }}>
          {!isLogin && (
            <>
              <Input label="Prénom & Nom" placeholder="Marie Dupont" value={form.name} onChange={set("name")} required />
              <Input label="École / Université" placeholder="Université de Bordeaux" value={form.school} onChange={set("school")} />
              <Input label="Ville" placeholder="Bordeaux" value={form.city} onChange={set("city")} />
            </>
          )}
          <Input label="Adresse e-mail" type="email" placeholder="marie@u-bordeaux.fr" value={form.email} onChange={set("email")} required />
          <Input label="Mot de passe" type="password" placeholder="••••••••" value={form.password} onChange={set("password")} required />
        </div>

        {isLogin && (
          <div style={{ textAlign:"right", marginBottom:20 }}>
            <button style={{ fontSize:13, color:T.coral, fontWeight:600,
              background:"none", border:"none", cursor:"pointer", fontFamily:F.body }}>
              Mot de passe oublié ?
            </button>
          </div>
        )}

        {error && (
          <div style={{ background:"#FDE8EC", border:`1px solid ${T.coral}`, borderRadius:10,
            padding:"10px 14px", marginBottom:16, fontSize:13, color:T.text, fontFamily:F.body }}>
            {error}
          </div>
        )}
        {info && (
          <div style={{ background:"#E7F8EF", border:"1px solid #059669", borderRadius:10,
            padding:"10px 14px", marginBottom:16, fontSize:13, color:"#065F46", fontFamily:F.body }}>
            {info}
          </div>
        )}

        <button onClick={handleSubmit} disabled={loading} className="sv-btn-primary" style={{
          width:"100%", padding:"14px", background:T.coral, color:"#fff",
          border:"none", borderRadius:14, fontFamily:F.body,
          fontWeight:700, fontSize:16, cursor: loading ? "not-allowed" : "pointer",
          boxShadow:"0 4px 16px rgba(251,99,118,0.35)", opacity: loading ? 0.7 : 1
        }}>
          {loading ? "…" : (isLogin ? "Se connecter" : "Créer mon compte")}
        </button>

        <p style={{ textAlign:"center", fontSize:13, color:T.sec, fontFamily:F.body, margin:"20px 0 0" }}>
          {isLogin ? "Pas encore de compte ? " : "Déjà un compte ? "}
          <button onClick={()=>{ setIsLogin(!isLogin); setError(""); setInfo(""); }} style={{
            color:T.coral, fontWeight:700, background:"none", border:"none",
            cursor:"pointer", fontFamily:F.body
          }}>{isLogin ? "S'inscrire" : "Se connecter"}</button>
        </p>
      </div>
    </div>
  );
}

// ── CREATE EVENT VIEW ──────────────────────────────────────
// Props: navigate, currentUser (objet Supabase), onCreated (callback après succès)
function CreateEventView({ navigate, currentUser, onCreated, onRefreshEvents, editEvent }) {
  const isEdit = !!editEvent;

  // Préremplissage si mode édition
  const initForm = () => {
    if (!isEdit) return {title:"",desc:"",date:"",time:"",loc:"",address:"",cat:"Révisions"};
    const parts = (editEvent.loc || "").split(" — ");
    let date = "", time = "";
    if (editEvent.rawDate) {
      const d = new Date(editEvent.rawDate);
      date = d.toISOString().slice(0, 10);
      time = d.toTimeString().slice(0, 5);
    }
    return { title: editEvent.title || "", desc: editEvent.desc || "",
      cat: editEvent.cat || "Révisions", loc: parts[0] || "",
      address: parts[1] || "", date, time };
  };

  const [form, setForm]       = React.useState(initForm);
  const [loading, setLoading]   = React.useState(false);
  const [error, setError]     = React.useState("");
  const [imageFile, setImageFile] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);
  const set = k => e => setForm(f=>({...f,[k]:e.target.value}));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = ev => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handlePublish = async () => {
    if (!form.title.trim()) { setError("Le titre est requis."); return; }
    setError(""); setLoading(true);
    try {
      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Délai dépassé — vérifie ta connexion et réessaie.")), 8000)
      );
      if (isEdit) {
        await Promise.race([DB.updateActivity(editEvent.id, form), timeout]);
      } else {
        const activity = await Promise.race([DB.createActivity(currentUser.id, form), timeout]);
        // Upload en arrière-plan : ne bloque pas la navigation
        if (imageFile && activity?.id) {
          DB.uploadEventImage(imageFile, activity.id)
            .then(() => onRefreshEvents && onRefreshEvents())
            .catch(err => console.warn("Image upload:", err.message || err));
        }
      }
    } catch(e) {
      setError(e.message || String(e) || "Erreur.");
      setLoading(false);
      return;
    }
    setLoading(false);
    onCreated();
  };

  return (
    <div style={{ paddingBottom:64 }}>
      <button onClick={()=>navigate(-1)} style={{
        display:"flex", alignItems:"center", gap:8, marginBottom:24,
        color:T.sec, background:"none", border:"none", cursor:"pointer",
        fontFamily:F.body, fontWeight:600, fontSize:14
      }}>← Retour</button>

      <div style={{ maxWidth:720, margin:"0 auto" }}>
        <h1 style={{ fontSize:28, fontFamily:F.title, fontWeight:400, color:T.text, marginBottom:8 }}>
          {isEdit ? "Modifier l'activité" : "Créer un événement"}
        </h1>
        <p style={{ fontSize:15, color:T.sec, fontFamily:F.body, marginBottom:36, fontWeight:400 }}>
          {isEdit ? "Mets à jour les informations de ton activité" : "Invite la communauté bordelaise à rejoindre ton activité"}
        </p>

        <div className="sv-form-card" style={{ background:T.card, borderRadius:20, padding:"36px",
          border:`1px solid ${T.border}`, display:"flex", flexDirection:"column", gap:24 }}>

          {/* Image upload — uniquement en création */}
          {!isEdit && <div>
            <label style={{ fontSize:13, fontWeight:600, color:T.text, fontFamily:F.body, display:"block", marginBottom:8 }}>
              Image de l'événement
            </label>
            {imagePreview ? (
              <div style={{ position:"relative", borderRadius:16, overflow:"hidden", height:180, marginBottom:0 }}>
                <img src={imagePreview} alt="preview" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                <button onClick={() => { setImageFile(null); setImagePreview(null); }} style={{
                  position:"absolute", top:10, right:10, background:"rgba(0,0,0,0.55)",
                  border:"none", borderRadius:50, width:30, height:30, cursor:"pointer",
                  color:"#fff", fontSize:15, display:"flex", alignItems:"center", justifyContent:"center"
                }}>✕</button>
              </div>
            ) : (
              <label style={{
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                border:`2px dashed ${T.border}`, borderRadius:16, padding:"32px 20px",
                cursor:"pointer", background:T.muted, transition:"border-color 0.2s"
              }}
                onMouseEnter={e=>e.currentTarget.style.borderColor=T.coral}
                onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
                <span style={{ fontSize:14, fontWeight:600, color:T.sec, fontFamily:F.body }}>Ajouter une photo</span>
                <span style={{ fontSize:12, color:T.sec, fontFamily:F.body, marginTop:4 }}>JPG, PNG — max 5 Mo</span>
                <input type="file" accept="image/*" style={{ display:"none" }} onChange={handleImageChange} />
              </label>
            )}
          </div>}

          <Input label="Titre de l'événement" placeholder="Ex : Session révisions droit constitutionnel" value={form.title} onChange={set("title")} required />

          {/* Catégorie */}
          <div>
            <label style={{ fontSize:13, fontWeight:600, color:T.text, fontFamily:F.body, display:"block", marginBottom:8 }}>
              Catégorie <span style={{color:T.coral}}>*</span>
            </label>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {CATS.filter(c=>c!=="Tous").map(c=>(
                <button key={c} onClick={()=>setForm(f=>({...f,cat:c}))} style={{
                  padding:"8px 18px", borderRadius:50, fontWeight:600, fontSize:13,
                  background: form.cat===c ? T.coral : T.muted,
                  color: form.cat===c ? "#fff" : T.text,
                  border:`1.5px solid ${form.cat===c ? T.coral : T.border}`,
                  cursor:"pointer", fontFamily:F.body, transition:"all 0.18s"
                }}>{c}</button>
              ))}
            </div>
          </div>

          <Input label="Description" placeholder="Décris ton événement, le programme, ce qu'il faut apporter…" value={form.desc} onChange={set("desc")} textarea required />

          <div className="sv-form-dt" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <Input label="Date" type="date" value={form.date} onChange={set("date")} required />
            <Input label="Heure" type="time" value={form.time} onChange={set("time")} required />
          </div>

          <Input label="Nom du lieu" placeholder="Ex : Darwin Écosystème, BU Montaigne…" value={form.loc} onChange={set("loc")} required />
          <Input label="Adresse complète" placeholder="Ex : 87 quai des Queyries, Bordeaux" value={form.address} onChange={set("address")} required />

          {error && (
            <div style={{ background:"#FDE8EC", border:`1px solid ${T.coral}`, borderRadius:10,
              padding:"10px 14px", fontSize:13, color:T.text, fontFamily:F.body }}>
              {error}
            </div>
          )}

          <div style={{ display:"flex", gap:12, paddingTop:8 }}>
            <button onClick={handlePublish} disabled={loading} className="sv-btn-primary" style={{
              flex:1, padding:"15px", background:T.coral, color:"#fff",
              border:"none", borderRadius:14, fontFamily:F.body,
              fontWeight:700, fontSize:16, cursor: loading ? "not-allowed" : "pointer",
              boxShadow:"0 4px 16px rgba(251,99,118,0.3)", opacity: loading ? 0.7 : 1
            }}>{loading ? "Enregistrement…" : isEdit ? "Enregistrer les modifications" : "Publier l'événement"}</button>
            <button onClick={()=>navigate(-1)} style={{
              padding:"15px 24px", background:"transparent", color:T.sec,
              border:`1.5px solid ${T.border}`, borderRadius:14,
              fontFamily:F.body, fontWeight:600, fontSize:14, cursor:"pointer"
            }}>Annuler</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  HomeView, SearchView, EventDetailView,
  MessagesView, ProfileView, AuthView, CreateEventView
});
