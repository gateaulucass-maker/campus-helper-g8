// sv-shared.jsx — Design tokens, data, shared UI components (v3 – Design System)

// ── TOKENS ─────────────────────────────────────────────────
const T = {
  bg:     '#FFF9EC',
  purple: '#5D2A42',
  coral:  '#FB6376',
  coralD: '#E84D62',
  text:   '#5D2A42',
  sec:    '#9E7A8A',
  card:   '#FFFFFF',
  border: '#EEE0D4',
  lilac:  '#FDE8EC',
  muted:  '#FEF5E7',
};

// Font stacks
const F = {
  title:  "'Rammetto One', cursive",
  body:   "'Montserrat', sans-serif",
};

// ── DATA (BORDEAUX) ────────────────────────────────────────
const EVENTS_DATA = [
  { id:1, title:"Session révisions Droit", date:"Mer 30 Avr", time:"14h–17h", loc:"BU Bordeaux Montaigne", address:"Domaine universitaire, Pessac", cat:"Révisions", img:"https://picsum.photos/seed/sv1/800/420", joined:true, host:"Emma Laurent", hostInit:"EL", hostColor:"#FB6376", desc:"On se retrouve à la BU pour réviser le droit constitutionnel ensemble. Niveau L2. Apporte tes fiches, on partage nos résumés et on s'entraide sur les points difficiles. Café offert ☕" },
  { id:2, title:"Coworking Darwin Bordeaux", date:"Jeu 24 Avr", time:"10h–13h", loc:"Darwin Écosystème", address:"87 quai des Queyries, Bordeaux", cat:"Coworking", img:"https://picsum.photos/seed/sv2/800/420", joined:true, past:true, host:"Lucas Martin", hostInit:"LM", hostColor:"#5D2A42", desc:"Session de travail libre dans le cadre incroyable de Darwin, au bord de la Garonne. Chacun bosse sur ses projets dans une bonne ambiance estudiantine. Idéal pour changer d'air." },
  { id:3, title:"Sortie surf Médoc", date:"Sam 3 Mai", time:"9h–13h", loc:"Plage du Porge", address:"Le Porge, Médoc (33)", cat:"Sport", img:"https://picsum.photos/seed/sv3/800/420", joined:true, host:"Tom Ravel", hostInit:"TR", hostColor:"#059669", desc:"Cours de surf collectif pour étudiants ! Moniteur certifié, matériel inclus. 20€ par personne. Covoiturage organisé depuis le campus. Inscription avant vendredi midi." },
  { id:4, title:"Jam session guitare", date:"Ven 2 Mai", time:"19h–22h", loc:"Rock School Barbey", address:"18 cours Barbey, Bordeaux", cat:"Musique", img:"https://picsum.photos/seed/sv4/800/420", joined:false, host:"Sofia Diaz", hostInit:"SD", hostColor:"#8B5CF6", desc:"Jam ouverte à tous niveaux dans une salle mythique de Bordeaux. Guitares, basse, claviers bienvenus. Ambiance décontractée, bonne musique. Amenez vos instruments ou pas — on a du matos." },
  { id:5, title:"Révisions maths L2", date:"Mar 29 Avr", time:"9h–12h", loc:"Campus Victoire", address:"3 place de la Victoire, Bordeaux", cat:"Révisions", img:"https://picsum.photos/seed/sv5/800/420", joined:true, past:true, host:"Paul Nguyen", hostInit:"PN", hostColor:"#F59E0B", desc:"Révisions intensives pour le partiel de maths. Séries de Taylor, intégrales multiples et probabilités au programme. Niveau requis : avoir suivi le cours de M. Leroy. Places limitées à 8." },
  { id:6, title:"Apéro étudiant Darwin", date:"Ven 2 Mai", time:"18h30–21h", loc:"Darwin Écosystème", address:"87 quai des Queyries, Bordeaux", cat:"Sortie", img:"https://picsum.photos/seed/sv6/800/420", joined:false, host:"Camille Roy", hostInit:"CR", hostColor:"#FB6376", desc:"Soirée décompression de fin de semaine au bord de la Garonne. Entrée libre, ambiance chill, happy hour jusqu'à 20h. Le cadre de Darwin est parfait pour se retrouver entre étudiants." },
  { id:7, title:"Atelier peinture aquarelle", date:"Dim 4 Mai", time:"14h–17h", loc:"Marché des Capucins", address:"Place des Capucins, Bordeaux", cat:"Art", img:"https://picsum.photos/seed/sv7/800/420", joined:false, host:"Léa Morin", hostInit:"LM", hostColor:"#EC4899", desc:"Atelier aquarelle pour tous niveaux dans un cadre unique au cœur du marché des Capucins. Matériel fourni. On peint les façades bordelaises autour d'un verre de jus de fruit. Aucune expérience requise, juste de la bonne humeur !" },
  { id:8, title:"Tournoi de badminton étudiant", date:"Sam 3 Mai", time:"13h–18h", loc:"Gymnase Bordeaux Lac", address:"Allée Jacques Chaban-Delmas, Bordeaux", cat:"Sport", img:"https://picsum.photos/seed/sv8/800/420", joined:false, host:"Karim Benali", hostInit:"KB", hostColor:"#059669", desc:"Tournoi amical de badminton en double ouvert à tous les étudiants bordelais. Raquettes disponibles sur place. 4€ par équipe. Ambiance compétitive mais bienveillante, petite finale et remise de prix en fin d'après-midi." },
  { id:9, title:"Révisions éco-gestion L3", date:"Lun 5 Mai", time:"10h–13h", loc:"Sciences Po Bordeaux", address:"11 allée Ausone, Pessac", cat:"Révisions", img:"https://picsum.photos/seed/sv9/800/420", joined:false, host:"Nina Lefebvre", hostInit:"NL", hostColor:"#F59E0B", desc:"Session de révisions collective pour les partiels d'économie et gestion en L3. On se retrouve en salle de TD pour faire les annales ensemble. Apporte tes notes de cours et tes questions — on s'entraide !" },
  { id:10, title:"Soirée ciné plein air", date:"Jeu 8 Mai", time:"21h–23h30", loc:"Quais de la Garonne", address:"Quai Louis XVIII, Bordeaux", cat:"Sortie", img:"https://picsum.photos/seed/sv10/800/420", joined:true, host:"Antoine Faure", hostInit:"AF", hostColor:"#8B5CF6", desc:"Projection en plein air sur les quais avec apéro avant le film. Le film sera annoncé la veille — surprise garantie. Amène ton plaid et de quoi grignoter. Entrée libre, inscription pour réserver ta place." },
  { id:11, title:"Bootcamp photo smartphone", date:"Mar 6 Mai", time:"15h–17h30", loc:"Jardin Public", address:"Cours de Verdun, Bordeaux", cat:"Art", img:"https://picsum.photos/seed/sv11/800/420", joined:false, host:"Yasmine Haddad", hostInit:"YH", hostColor:"#FB6376", desc:"Apprends à sublimer tes photos avec juste ton téléphone. Composition, lumière naturelle, retouche rapide — on couvre tout en balade dans le Jardin Public. Max 10 participants pour un suivi perso." },
  { id:12, title:"Session coworking café Victoire", date:"Mer 7 Mai", time:"9h–12h", loc:"Café des Arts", address:"138 cours Victor Hugo, Bordeaux", cat:"Coworking", img:"https://picsum.photos/seed/sv12/800/420", joined:false, host:"Sofiane Oubella", hostInit:"SO", hostColor:"#5D2A42", desc:"Matinée de travail au Café des Arts, une adresse calme et inspirante près de la place de la Victoire. On commande chacun son café et on bosse dans une bonne ambiance. Idéal pour rédiger, coder ou réviser." },
  { id:13, title:"Atelier cuisine du monde", date:"Sam 10 Mai", time:"14h–17h", loc:"Marché des Capucins", address:"Place des Capucins, Bordeaux", cat:"Gastronomie", img:"https://picsum.photos/seed/sv13/800/420", joined:false, host:"Amina Toure", hostInit:"AT", hostColor:"#F59E0B", desc:"On se retrouve au marché pour cuisiner ensemble des plats du monde. Chaque participant apporte une recette de son pays ou de sa région. Tout le monde repart avec de nouvelles recettes et le ventre plein." },
  { id:14, title:"Dégustation vins de Bordeaux", date:"Ven 9 Mai", time:"19h–21h30", loc:"Cave des Chartrons", address:"58 rue Notre-Dame, Bordeaux", cat:"Gastronomie", img:"https://picsum.photos/seed/sv14/800/420", joined:false, host:"Pierre Lacombe", hostInit:"PL", hostColor:"#8B5CF6", desc:"Initiation à la dégustation de vins bordelais avec un sommelier amateur. 5 cuvées au programme, accord mets et vins, histoire du vignoble. Participation de 8€ pour couvrir les bouteilles. Places limitées à 12." },
  { id:15, title:"Brunch étudiant solidaire", date:"Dim 11 Mai", time:"10h–13h", loc:"Darwin Écosystème", address:"87 quai des Queyries, Bordeaux", cat:"Gastronomie", img:"https://picsum.photos/seed/sv15/800/420", joined:false, host:"Clara Vidal", hostInit:"CV", hostColor:"#FB6376", desc:"Brunch participatif où chacun apporte un plat à partager. Salé, sucré, fait maison ou du marché — tout est bienvenu. Ambiance conviviale en terrasse au bord de la Garonne. Entrée libre, venez nombreux !" },
];

// Aucune conversation par défaut — les convos sont créées à la demande
// via le bouton "Contacter l'organisateur" sur un événement.
const CONVOS_DATA = [];

// ── PERSONA HELPERS (chat OpenAI) ──────────────────────────
function personaForEvent(ev) {
  return `Tu es ${ev.host}, étudiant·e bordelais·e qui organise l'événement "${ev.title}" (catégorie : ${ev.cat}).
Date : ${ev.date} à ${ev.time}. Lieu : ${ev.loc}${ev.address ? ` (${ev.address})` : ""}.
Description de ton événement : ${ev.desc}

Tu chattes avec un·e autre étudiant·e qui te contacte via Study Vibes au sujet de cet événement.
Tu connais tous les détails (horaires, lieu, prix éventuel, ce qu'il faut apporter) et tu peux y répondre à partir de la description.

Style de réponse :
- Ton chaleureux, direct, comme un pote — jamais corporate ni formel
- Phrases courtes
- 1 emoji max par message, parfois aucun
- Max 2-3 phrases par réponse
- Tu peux relancer avec une question pour faire vivre la conversation
- Français uniquement`;
}

function createConvoFromEvent(ev) {
  return {
    id: `event-${ev.id}`,
    activity_id: ev.id, // pour les requêtes Supabase (bigint de la table activities)
    name: ev.host,
    init: ev.hostInit,
    color: ev.hostColor,
    eventTitle: ev.title,
    persona: personaForEvent(ev),
    preview: "Démarre la conversation…",
    time: "maintenant",
    unread: 0,
    msgs: [],
  };
}

const CATS = ["Tous","Révisions","Coworking","Sport","Musique","Sortie","Art","Gastronomie"];

// ── SHARED COMPONENTS ──────────────────────────────────────

function Avatar({ init, color, size = 40, src }) {
  if (src) {
    return (
      <div style={{
        width:size, height:size, borderRadius:"50%",
        overflow:"hidden", flexShrink:0,
        border:"2px solid rgba(255,255,255,0.2)"
      }}>
        <img src={src} alt={init || ""} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
      </div>
    );
  }
  return (
    <div style={{
      width:size, height:size, borderRadius:size,
      background: color || T.coral,
      display:"flex", alignItems:"center", justifyContent:"center",
      color:"#fff", fontWeight:700, fontSize:size*0.36,
      fontFamily:F.body, flexShrink:0
    }}>{init}</div>
  );
}

function Badge({ children, color }) {
  return (
    <span style={{
      background: color ? color+'20' : T.lilac,
      color: color || T.coral,
      borderRadius:50, padding:"4px 12px",
      fontSize:12, fontWeight:700, fontFamily:F.body,
      display:"inline-block"
    }}>{children}</span>
  );
}

function Btn({ children, onClick, variant="primary", style:sx={} }) {
  const base = {
    borderRadius:12, padding:"11px 24px",
    fontWeight:700, fontSize:14,
    cursor:"pointer", border:"none",
    fontFamily:F.body,
    transition:"all 0.18s",
    letterSpacing:"0.01em",
    ...sx
  };
  const variants = {
    primary: { background:T.coral, color:"#fff", boxShadow:"0 4px 16px rgba(251,99,118,0.3)" },
    secondary: { background:T.lilac, color:T.coral },
    ghost: { background:"transparent", color:T.text, border:`1.5px solid ${T.border}` },
    purple: { background:T.purple, color:"#fff", boxShadow:"0 4px 16px rgba(93,42,66,0.25)" },
  };
  return <button onClick={onClick} style={{...base, ...variants[variant]}}>{children}</button>;
}

function Input({ label, type="text", placeholder, value, onChange, textarea, required }) {
  const s = {
    width:"100%", background:T.muted,
    border:`1.5px solid ${T.border}`,
    borderRadius:12, padding:"12px 16px",
    fontSize:14, fontWeight:500,
    color:T.text, fontFamily:F.body, outline:"none",
    transition:"border 0.2s",
    resize: textarea ? "vertical" : undefined,
    minHeight: textarea ? 100 : undefined
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      {label && (
        <label style={{ fontSize:13, fontWeight:600, color:T.text, fontFamily:F.body }}>
          {label}{required && <span style={{color:T.coral}}> *</span>}
        </label>
      )}
      {textarea
        ? <textarea placeholder={placeholder} value={value} onChange={onChange} style={s} rows={4} />
        : <input type={type} placeholder={placeholder} value={value} onChange={onChange} style={s} />
      }
    </div>
  );
}

function SectionTitle({ children, action, onAction }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:24 }}>
      <h2 className="sv-section-title-el" style={{ fontSize:20, fontWeight:400, color:T.text, margin:0, fontFamily:F.title }}>{children}</h2>
      {action && (
        <button onClick={onAction} className="sv-section-action" style={{
          fontSize:13, color:T.coral, fontWeight:600, letterSpacing:"0.01em",
          background:"none", border:"none", cursor:"pointer", fontFamily:F.body,
          textDecoration:"underline", textDecorationColor:"transparent", padding:0
        }}>{action}</button>
      )}
    </div>
  );
}

function ParticipantDots({ count }) {
  const colors = [T.coral, T.purple, "#059669", "#8B5CF6", "#F59E0B"];
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <div style={{ display:"flex" }}>
        {Array.from({length:Math.min(count,4)}).map((_,i)=>(
          <div key={i} style={{
            width:22, height:22, borderRadius:22,
            border:`2px solid ${T.card}`,
            background:colors[i%colors.length],
            marginLeft:i>0?-7:0,
            flexShrink:0
          }} />
        ))}
      </div>
      <span style={{ fontSize:12, color:T.sec, fontWeight:600, fontFamily:F.body, letterSpacing:"0.01em" }}>
        {count} participant{count>1?"s":""}
      </span>
    </div>
  );
}

const PCOUNT = [8,5,12,6,4,9,7,14,3,11,6,8,10,7,15];

function EventCard({ ev, idx=0, onClick, onLike }) {
  const parts = PCOUNT[idx % PCOUNT.length];
  return (
    <div onClick={() => onClick && onClick(ev)}
      className="sv-card"
      style={{
        background:T.card, borderRadius:20, overflow:"hidden",
        boxShadow:"0 2px 10px rgba(93,42,66,0.07)",
        cursor:"pointer",
        display:"flex", flexDirection:"column",
        border:`1px solid ${T.border}`
      }}>
      <div className="sv-card-img-wrap" style={{ position:"relative", paddingTop:"56%" }}>
        <img src={ev.img} alt={ev.title} className="sv-card-img"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition: ev.imgPosition || "50% 50%" }} />
        <div style={{ position:"absolute", top:12, left:12 }}>
          <Badge>{ev.cat}</Badge>
        </div>
        {onLike && (
          <button onClick={e => { e.stopPropagation(); onLike(ev.id); }}
            aria-label={ev.liked ? "Retirer des favoris" : "Ajouter aux favoris"}
            style={{
              position:"absolute", top:12, right:12,
              width:34, height:34, borderRadius:34,
              background: ev.liked ? T.coral : "rgba(255,255,255,0.9)",
              border:"none", cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:16, lineHeight:1,
              color: ev.liked ? "#fff" : T.coral,
              boxShadow:"0 2px 8px rgba(0,0,0,0.14)",
              transition:"transform 0.18s cubic-bezier(0.16,1,0.3,1), background 0.15s"
            }}
            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.12)"}
            onMouseLeave={e=>e.currentTarget.style.transform=""}>
            {ev.liked ? "♥" : "♡"}
          </button>
        )}
      </div>
      <div style={{ padding:"16px 18px 18px", flex:1, display:"flex", flexDirection:"column", gap:6 }}>
        <div style={{ fontWeight:700, fontSize:15, color:T.text, lineHeight:1.3, fontFamily:F.body }}>{ev.title}</div>
        <div style={{ fontSize:12, color:T.sec, fontFamily:F.body, fontWeight:600, letterSpacing:"0.01em" }}>{ev.date} · {ev.time}</div>
        <div style={{ fontSize:12, color:T.sec, fontFamily:F.body, fontWeight:500, marginBottom:2 }}>{ev.loc}</div>
        <div style={{ marginTop:"auto", paddingTop:12, borderTop:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <ParticipantDots count={parts} />
          <span style={{
            background:ev.joined ? T.lilac : T.coral,
            color:ev.joined ? T.coral : "#fff",
            borderRadius:50, padding:"5px 14px",
            fontSize:12, fontWeight:700, fontFamily:F.body, letterSpacing:"0.01em",
            boxShadow: ev.joined ? "none" : "0 3px 10px rgba(251,99,118,0.28)"
          }}>{ev.joined ? "✓ Rejoint" : "Rejoindre"}</span>
        </div>
      </div>
    </div>
  );
}

function EventCardHorizontal({ ev, idx=0, onClick, onLike }) {
  const parts = PCOUNT[idx % PCOUNT.length];
  return (
    <div onClick={() => onClick && onClick(ev)}
      className="sv-card-h"
      style={{
        background:T.card, borderRadius:16, overflow:"hidden",
        boxShadow:"0 2px 10px rgba(93,42,66,0.07)",
        cursor:"pointer", display:"flex",
        border:`1px solid ${T.border}`, height:120
      }}>
      <div style={{ width:140, flexShrink:0, position:"relative", overflow:"hidden" }}>
        <img src={ev.img} alt={ev.title} className="sv-card-img"
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition: ev.imgPosition || "50% 50%" }} />
        <div style={{ position:"absolute", top:8, left:8 }}>
          <Badge>{ev.cat}</Badge>
        </div>
      </div>
      <div style={{ flex:1, padding:"14px 18px", display:"flex", flexDirection:"column", justifyContent:"space-between", minWidth:0 }}>
        <div>
          <div style={{ fontWeight:700, fontSize:14, color:T.text, fontFamily:F.body, lineHeight:1.3,
            overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical",
            marginBottom:5 }}>{ev.title}</div>
          <div style={{ fontSize:12, color:T.sec, fontFamily:F.body, fontWeight:600 }}>{ev.date} · {ev.loc}</div>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <ParticipantDots count={parts} />
          {onLike && (
            <button onClick={e => { e.stopPropagation(); onLike(ev.id); }}
              aria-label={ev.liked ? "Retirer des favoris" : "Ajouter aux favoris"}
              style={{ background:"none", border:"none", cursor:"pointer",
                fontSize:16, color: ev.liked ? T.coral : T.sec,
                transition:"color 0.15s, transform 0.18s cubic-bezier(0.16,1,0.3,1)",
                padding:"4px" }}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.2)"}
              onMouseLeave={e=>e.currentTarget.style.transform=""}>
              {ev.liked ? "♥" : "♡"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  T, F, EVENTS_DATA, CONVOS_DATA, CATS,
  personaForEvent, createConvoFromEvent,
  Avatar, Badge, Btn, Input, SectionTitle, ParticipantDots, PCOUNT, EventCard, EventCardHorizontal
});
