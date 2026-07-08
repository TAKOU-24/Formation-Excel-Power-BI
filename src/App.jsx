import React, { useState, useRef } from "react";
import {
  CheckCircle2,
  ArrowRight,
  Users,
  Clock,
  Video,
  TrendingUp,
  ChevronDown,
  Send,
  BarChart3,
  Table2,
  GitBranch,
  Sigma,
  Sparkles,
  Award,
  Briefcase,
} from "lucide-react";

/* ============================================================
   DESIGN TOKENS
   Color   — bg #0A0D16, surface #10141F, surface2 #161B2A,
             border #232A3D, text #F1F3F9, muted #8B93AC,
             blue #4C6FFF, violet #9B5CFF, cyan #35D0FF
   Type    — Display: Sora / Body: Inter / Data: JetBrains Mono
   Layout  — hero: headline + animated "formula → dashboard" card
   Signature — cell-reference eyebrows (A1, B2…) + live formula
             ticker that ties every section back to the subject
   ============================================================ */

const COLORS = {
  bg: "#0A0D16",
  surface: "#10141F",
  surface2: "#161B2A",
  surface3: "#1C2233",
  border: "#232A3D",
  borderLight: "#2E3650",
  text: "#F1F3F9",
  muted: "#8B93AC",
  mutedDark: "#5B637E",
  blue: "#15803D",
  violet: "#22C55E",
  cyan: "#4ADE80",
  green: "#3DDC97",
};

const GRADIENT = `linear-gradient(135deg, ${COLORS.blue} 0%, ${COLORS.violet} 100%)`;
const GRADIENT_TEXT = `linear-gradient(135deg, #4ADE80 0%, #86EFAC 100%)`;

const fontDisplay = { fontFamily: "'Sora', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };
const fontMono = { fontFamily: "'JetBrains Mono', monospace" };


/* ---------- Reusable eyebrow (cell-reference motif) ---------- */
function CellTag({ children }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-md mb-4"
      style={{
        ...fontMono,
        fontSize: "12px",
        letterSpacing: "0.06em",
        color: COLORS.cyan,
        background: "rgba(74,222,128,0.08)",
        border: "1px solid rgba(74,222,128,0.25)",
      }}
    >
      {children}
    </span>
  );
}

function SectionHeading({ cell, title, subtitle, center }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} mb-12`}>
      <CellTag>{cell}</CellTag>
      <h2
        style={{ ...fontDisplay, color: COLORS.text }}
        className="text-3xl md:text-4xl font-semibold leading-tight"
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ ...fontBody, color: COLORS.muted }} className="mt-4 text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function PrimaryButton({ children, onClick, full, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-medium transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${
        full ? "w-full" : ""
      }`}
      style={{
        ...fontBody,
        background: GRADIENT,
        color: "#0A0D16",
        boxShadow: "0 10px 30px -8px rgba(34,197,94,0.55)",
        border: "none",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.7 : 1,
      }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-medium transition-colors duration-200"
      style={{
        ...fontBody,
        background: "transparent",
        color: COLORS.text,
        border: `1px solid ${COLORS.borderLight}`,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

/* ================= MAIN COMPONENT ================= */
export default function App() {
  const formRef = useRef(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [form, setForm] = useState({
    nom: "",
    email: "",
    telephone: "",
    ville: "",
    situation: "",
    niveauExcel: "",
    niveauPowerBI: "",
    objectif: "",
    message: "",
  });

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjgqdrwg";

  const handleSubmit = async () => {
    if (!form.nom || !form.email || submitting) return;
    setSubmitting(true);
    setSubmitError(false);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          "Nom et prénom": form.nom,
          "Email": form.email,
          "Téléphone": form.telephone,
          "Ville": form.ville,
          "Situation actuelle": form.situation,
          "Niveau Excel": form.niveauExcel,
          "Niveau Power BI": form.niveauPowerBI,
          "Objectif principal": form.objectif,
          "Message": form.message,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitError(true);
      }
    } catch (err) {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const raisons = [
    {
      icon: <Sigma size={20} color={COLORS.cyan} />,
      title: "Des cas pratiques réels",
      desc: "Chaque exercice reproduit une situation vécue en finance, comptabilité, RH, audit ou logistique — pas des données fictives.",
    },
    {
      icon: <GitBranch size={20} color={COLORS.cyan} />,
      title: "Une progression structurée",
      desc: "Excel → Power Query → Power Pivot → DAX → Power BI. Chaque semaine s'appuie sur la précédente, sans rupture.",
    },
    {
      icon: <Award size={20} color={COLORS.cyan} />,
      title: "Un formateur qui pratique au quotidien",
      desc: "7 ans d'expérience en entreprise, chez AXA, Mazars et Valophis, sur des problématiques de reporting réelles.",
    },
    {
      icon: <Users size={20} color={COLORS.cyan} />,
      title: "Un groupe volontairement restreint",
      desc: "10 participants maximum pour garantir un vrai suivi individuel et des retours personnalisés sur vos fichiers.",
    },
  ];

  const publics = [
    "Étudiant",
    "Alternant",
    "Jeune diplômé",
    "Salarié en poste",
    "En recherche d'emploi",
  ];

  const acquis = [
    "Construire des tableaux croisés dynamiques fiables et rapides",
    "Nettoyer et transformer des données avec Power Query",
    "Modéliser des données dans Power Pivot (tables de faits et dimensions)",
    "Écrire des mesures DAX pour piloter des indicateurs de performance",
    "Créer un tableau de bord Power BI complet et présentable",
    "Automatiser des tâches répétitives pour gagner un temps réel",
  ];

  const programme = [
    {
      cell: "S1",
      titre: "Excel professionnel",
      items: ["Fonctions indispensables", "SOMME.SI.ENS", "Sous-total", "Tableaux structurés", "Tableaux croisés dynamiques"],
    },
    {
      cell: "S2",
      titre: "Power Query",
      items: ["Importer et nettoyer des données", "Transformer des fichiers", "Automatiser les retraitements", "Combiner plusieurs sources"],
    },
    {
      cell: "S3",
      titre: "Power Pivot & modèle de données",
      items: ["Créer des relations", "Construire un modèle fiable", "Tables de faits et dimensions", "Préparer les bases du reporting"],
    },
    {
      cell: "S4",
      titre: "DAX",
      items: ["Mesures simples", "CALCULATE", "Indicateurs de performance", "Analyse mensuelle et annuelle"],
    },
    {
      cell: "S5",
      titre: "Power BI & dashboard final",
      items: ["Création d'un dashboard complet", "Visualisations", "Filtres et segments", "Présentation professionnelle du résultat"],
    },
  ];

  const stats = [
    { chiffre: "10", desc: "étudiants formés sur Excel et Power BI" },
    { chiffre: "2", desc: "contrôleurs de gestion accompagnés jusqu'à la validation de leur période d'essai" },
  ];

  const faqs = [
    { q: "Faut-il déjà être avancé sur Excel ?", a: "Non. La formation démarre avec les fonctions professionnelles indispensables et monte progressivement en complexité. Un niveau débutant motivé suffit pour suivre." },
    { q: "La formation est-elle en ligne ?", a: "Oui, l'intégralité des séances se déroule en visioconférence, en direct, avec interaction possible à chaque session." },
    { q: "Les fichiers d'exercices sont-ils fournis ?", a: "Oui, chaque semaine s'accompagne de fichiers d'exercices prêts à l'emploi, basés sur des cas réels d'entreprise." },
    { q: "Y aura-t-il des cas pratiques ?", a: "Oui, l'ensemble du programme est construit autour de cas pratiques orientés finance, comptabilité, RH, audit, contrôle de gestion et logistique." },
    { q: "Combien de places sont disponibles ?", a: "La cohorte est volontairement limitée à 10 participants afin de garantir un suivi individuel de qualité." },
    { q: "Comment réserver sa place ?", a: "Il suffit de remplir le formulaire d'inscription ci-dessus. Vous serez recontacté rapidement pour finaliser votre inscription." },
    { q: "La formation est-elle adaptée aux étudiants ?", a: "Tout à fait. De nombreux cas pratiques sont pensés pour préparer des entretiens et des alternances en finance, contrôle de gestion ou data." },
    { q: "Peut-on suivre la formation en étant salarié ?", a: "Oui, les séances sont organisées pour rester compatibles avec une activité professionnelle en parallèle." },
  ];

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", ...fontBody }} className="w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: rgba(34,197,94,0.35); }
        input::placeholder, textarea::placeholder { color: #5B637E; }
        select { color-scheme: dark; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ---------- HEADER ---------- */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ background: "rgba(10,13,22,0.75)", borderBottom: `1px solid ${COLORS.border}` }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: GRADIENT }}
            >
              <Table2 size={16} color="#0A0D16" />
            </div>
            <span style={{ ...fontDisplay, color: COLORS.text }} className="font-semibold text-sm">
              Dimitri Takou <span style={{ color: COLORS.muted, fontWeight: 400 }}>· Formation</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#programme" style={{ color: COLORS.muted }} className="text-sm hover:text-white transition-colors">Programme</a>
            <a href="#formateur" style={{ color: COLORS.muted }} className="text-sm hover:text-white transition-colors">Formateur</a>
            <a href="#faq" style={{ color: COLORS.muted }} className="text-sm hover:text-white transition-colors">FAQ</a>
          </div>
          <button
            onClick={scrollToForm}
            className="rounded-lg px-4 py-2 text-sm font-medium transition-transform hover:scale-105"
            style={{ background: GRADIENT, color: "#0A0D16", border: "none", cursor: "pointer" }}
          >
            Réserver ma place
          </button>
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <section className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 pb-16">
        <div>
          <CellTag>COHORTE — SEPTEMBRE 2026</CellTag>
          <h1
            style={{ ...fontDisplay, color: COLORS.text }}
            className="text-4xl md:text-5xl font-bold leading-[1.12] mb-6"
          >
            25 heures pour maîtriser{" "}
            <span
              style={{
                background: GRADIENT_TEXT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Excel &amp; Power BI
            </span>{" "}
            grâce à des cas pratiques réels.
          </h1>
          <p style={{ color: COLORS.muted }} className="text-lg leading-relaxed mb-8 max-w-lg">
            Apprenez à automatiser vos tâches, construire des tableaux de bord dynamiques et exploiter
            Power Query, Power Pivot et DAX pour gagner en efficacité en entreprise.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span style={{ ...fontDisplay, color: COLORS.text }} className="text-3xl font-bold">199 €</span>
            <span style={{ ...fontMono, color: COLORS.mutedDark }} className="text-sm line-through">249 €</span>
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ background: "rgba(61,220,151,0.12)", color: COLORS.green, border: "1px solid rgba(61,220,151,0.3)" }}
            >
              Offre de lancement
            </span>
          </div>
          <p style={{ ...fontMono, color: COLORS.mutedDark }} className="text-xs mb-8">
            Tarif à 199 € valable jusqu'au 30 juillet 2026
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <PrimaryButton onClick={scrollToForm}>
              Réserver ma place <ArrowRight size={16} />
            </PrimaryButton>
            <SecondaryButton onClick={() => document.getElementById("programme")?.scrollIntoView({ behavior: "smooth" })}>
              Voir le programme
            </SecondaryButton>
          </div>

          <div className="flex flex-wrap gap-6" style={{ color: COLORS.muted }}>
            <span className="flex items-center gap-2 text-sm"><Clock size={15} /> 25 heures</span>
            <span className="flex items-center gap-2 text-sm"><Video size={15} /> Visioconférence</span>
            <span className="flex items-center gap-2 text-sm"><Users size={15} /> 10 places max</span>
          </div>
        </div>
      </section>

      {/* ---------- RARETÉ BANNER ---------- */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div
          className="rounded-2xl p-6 md:p-7 flex items-center gap-4"
          style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
        >
          <Sparkles size={18} color={COLORS.cyan} className="flex-shrink-0" />
          <div>
            <span style={{ ...fontDisplay, color: COLORS.text }} className="font-semibold">
              Places limitées à 10 participants
            </span>
            <p style={{ color: COLORS.muted }} className="text-sm mt-1">
              Groupe volontairement restreint pour garantir un suivi individuel réel.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- POURQUOI ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeading cell="B2" title="Pourquoi cette formation ?" />
        <div className="grid sm:grid-cols-2 gap-5">
          {raisons.map((r, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 transition-colors duration-200"
              style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.25)" }}
              >
                {r.icon}
              </div>
              <h3 style={{ ...fontDisplay, color: COLORS.text }} className="font-semibold mb-2">{r.title}</h3>
              <p style={{ color: COLORS.muted }} className="text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- À QUI ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeading cell="C3" title="À qui s'adresse la formation ?" subtitle="Pensée pour toute personne qui veut devenir réellement efficace sur Excel et Power BI, quel que soit son point de départ." />
        <div className="flex flex-wrap gap-3">
          {publics.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-full px-5 py-2.5"
              style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}` }}
            >
              <Briefcase size={14} color={COLORS.cyan} />
              <span style={{ color: COLORS.text }} className="text-sm">{p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- ACQUIS ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeading cell="D4" title="Ce que vous saurez faire après la formation" />
        <div className="grid sm:grid-cols-2 gap-4">
          {acquis.map((a, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 size={18} color={COLORS.green} className="mt-0.5 flex-shrink-0" />
              <span style={{ color: COLORS.text }} className="text-sm leading-relaxed">{a}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- PROGRAMME ---------- */}
      <section id="programme" className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeading cell="E5" title="Programme détaillé — 5 semaines" subtitle="Une progression pensée comme un modèle de données : chaque semaine est une table reliée à la suivante." />
        <div className="space-y-4">
          {programme.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-5"
              style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
            >
              <div
                className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ ...fontMono, background: COLORS.surface3, color: COLORS.cyan, fontSize: "13px", border: `1px solid ${COLORS.border}` }}
              >
                {s.cell}
              </div>
              <div className="flex-1">
                <h3 style={{ ...fontDisplay, color: COLORS.text }} className="font-semibold mb-2">{s.titre}</h3>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((it, j) => (
                    <span
                      key={j}
                      className="text-xs px-2.5 py-1 rounded-md"
                      style={{ ...fontMono, color: COLORS.muted, background: COLORS.surface3, border: `1px solid ${COLORS.border}` }}
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- FORMATEUR ---------- */}
      <section id="formateur" className="max-w-6xl mx-auto px-6 py-16">
        <div
          className="rounded-3xl p-8 md:p-10 grid md:grid-cols-3 gap-8 items-center"
          style={{ background: `linear-gradient(135deg, ${COLORS.surface} 0%, ${COLORS.surface2} 100%)`, border: `1px solid ${COLORS.borderLight}` }}
        >
          <div className="flex md:flex-col items-center md:items-start gap-4">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ ...fontDisplay, background: GRADIENT, color: "#0A0D16", fontSize: "22px", fontWeight: 700 }}
            >
              DT
            </div>
            <div className="md:mt-2">
              <div style={{ ...fontDisplay, color: COLORS.text }} className="font-semibold">Dimitri Takou</div>
              <div style={{ color: COLORS.muted }} className="text-sm">Responsable Administratif &amp; Financier</div>
            </div>
          </div>
          <div className="md:col-span-2">
            <CellTag>FORMATEUR</CellTag>
            <p style={{ color: COLORS.text }} className="leading-relaxed mb-4 text-sm">
              Responsable Administratif &amp; Financier avec 6 ans d'expérience en contrôle de gestion,
              comptabilité et pilotage de la performance (assurance, conseil, immobilier). Actuellement RAF
              chez Actudata Assurances, où je pilote la comptabilité technique et les KPI stratégiques. Passé
              par AXA, Mazars et Valophis, je conçois aujourd'hui des tableaux de bord décisionnels sous Excel
              BI / Power BI pour accompagner la prise de décision.
            </p>
            <div className="flex flex-wrap gap-2">
              {["AXA", "Mazars", "Valophis", "Actudata Assurances", "Excel BI", "Power Query", "DAX"].map((t, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{ color: COLORS.muted, background: COLORS.surface3, border: `1px solid ${COLORS.border}` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- ILS M'ONT DÉJÀ FAIT CONFIANCE ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeading cell="F6" title="Ils m'ont déjà fait confiance" subtitle="Un accompagnement déjà éprouvé, en formation comme en mentorat individuel." />
        <div className="grid sm:grid-cols-2 gap-5">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex items-center gap-5"
              style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
            >
              <span
                style={{ ...fontDisplay, background: GRADIENT_TEXT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                className="text-4xl font-bold flex-shrink-0"
              >
                {s.chiffre}
              </span>
              <p style={{ color: COLORS.text }} className="text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- TARIF ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeading cell="G7" title="Tarif" center />
        <div className="max-w-md mx-auto">
          <div
            className="rounded-3xl p-8 text-center relative overflow-hidden"
            style={{ background: COLORS.surface, border: `1px solid ${COLORS.borderLight}` }}
          >
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: GRADIENT }} />
            <span
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{ background: "rgba(61,220,151,0.12)", color: COLORS.green, border: "1px solid rgba(61,220,151,0.3)" }}
            >
              Offre de lancement — cohorte septembre 2026
            </span>
            <div className="mt-5 mb-1 flex items-center justify-center gap-3">
              <span style={{ ...fontDisplay, color: COLORS.text }} className="text-5xl font-bold">199 €</span>
              <span style={{ ...fontMono, color: COLORS.mutedDark }} className="text-lg line-through">249 €</span>
            </div>
            <p style={{ color: COLORS.muted }} className="text-sm mb-1">Paiement unique, sans engagement récurrent</p>
            <p style={{ ...fontMono, color: COLORS.green }} className="text-xs mb-6">Tarif à 199 € valable jusqu'au 30 juillet 2026</p>
            <div className="text-left space-y-3 mb-8">
              {["25 heures de formation en visioconférence", "Fichiers d'exercices fournis chaque semaine", "Cas pratiques issus de situations réelles", "Groupe limité à 10 participants", "Dashboard Power BI complet à l'issue"].map((f, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} color={COLORS.green} className="mt-0.5 flex-shrink-0" />
                  <span style={{ color: COLORS.text }} className="text-sm">{f}</span>
                </div>
              ))}
            </div>
            <PrimaryButton onClick={scrollToForm} full>
              Réserver ma place <ArrowRight size={16} />
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* ---------- FORMULAIRE ---------- */}
      <section ref={formRef} id="inscription" className="max-w-3xl mx-auto px-6 py-16">
        <SectionHeading cell="H8" title="Formulaire d'inscription" subtitle="Remplissez ce formulaire pour réserver votre place. Vous serez recontacté rapidement." center />

        {submitted ? (
          <div
            className="rounded-2xl p-10 text-center"
            style={{ background: COLORS.surface, border: `1px solid ${COLORS.borderLight}` }}
          >
            <CheckCircle2 size={40} color={COLORS.green} className="mx-auto mb-4" />
            <h3 style={{ ...fontDisplay, color: COLORS.text }} className="text-xl font-semibold mb-2">
              Demande envoyée
            </h3>
            <p style={{ color: COLORS.muted }} className="text-sm">
              Merci {form.nom || ""} — votre demande d'inscription a bien été enregistrée. Vous serez recontacté à l'adresse {form.email}.
            </p>
          </div>
        ) : (
          <div
            className="rounded-2xl p-6 md:p-8 space-y-5"
            style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Nom et prénom *">
                <input value={form.nom} onChange={update("nom")} placeholder="Jean Dupont" style={inputStyle} />
              </Field>
              <Field label="Adresse e-mail *">
                <input value={form.email} onChange={update("email")} placeholder="jean.dupont@email.com" type="email" style={inputStyle} />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Numéro de téléphone">
                <input value={form.telephone} onChange={update("telephone")} placeholder="06 12 34 56 78" style={inputStyle} />
              </Field>
              <Field label="Ville">
                <input value={form.ville} onChange={update("ville")} placeholder="Paris" style={inputStyle} />
              </Field>
            </div>

            <Field label="Situation actuelle">
              <select value={form.situation} onChange={update("situation")} style={inputStyle}>
                <option value="">Sélectionner…</option>
                <option value="etudiant">Étudiant</option>
                <option value="alternant">Alternant</option>
                <option value="salarie">Salarié</option>
                <option value="recherche">En recherche d'emploi</option>
                <option value="entrepreneur">Entrepreneur</option>
                <option value="autre">Autre</option>
              </select>
            </Field>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Niveau Excel">
                <select value={form.niveauExcel} onChange={update("niveauExcel")} style={inputStyle}>
                  <option value="">Sélectionner…</option>
                  <option value="debutant">Débutant</option>
                  <option value="intermediaire">Intermédiaire</option>
                  <option value="avance">Avancé</option>
                </select>
              </Field>
              <Field label="Niveau Power BI">
                <select value={form.niveauPowerBI} onChange={update("niveauPowerBI")} style={inputStyle}>
                  <option value="">Sélectionner…</option>
                  <option value="jamais">Jamais utilisé</option>
                  <option value="debutant">Débutant</option>
                  <option value="intermediaire">Intermédiaire</option>
                  <option value="avance">Avancé</option>
                </select>
              </Field>
            </div>

            <Field label="Objectif principal">
              <select value={form.objectif} onChange={update("objectif")} style={inputStyle}>
                <option value="">Sélectionner…</option>
                <option value="entretien">Réussir un entretien</option>
                <option value="alternance">Obtenir une alternance</option>
                <option value="efficace">Être plus efficace en entreprise</option>
                <option value="automatiser">Automatiser ses tâches</option>
                <option value="dashboards">Construire des tableaux de bord</option>
                <option value="evoluer">Évoluer professionnellement</option>
              </select>
            </Field>

            <Field label="Message ou question">
              <textarea value={form.message} onChange={update("message")} placeholder="Une question avant de vous inscrire ?" rows={4} style={{ ...inputStyle, resize: "vertical" }} />
            </Field>

            <PrimaryButton onClick={handleSubmit} full disabled={submitting}>
              {submitting ? "Envoi en cours…" : <>Envoyer ma demande d'inscription <Send size={16} /></>}
            </PrimaryButton>
            {submitError && (
              <p style={{ color: "#F87171" }} className="text-xs text-center">
                Une erreur est survenue, réessayez ou écrivez-moi directement par e-mail.
              </p>
            )}
          </div>
        )}
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-16">
        <SectionHeading cell="I9" title="Questions fréquentes" center />
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                style={{ background: "transparent", border: "none", cursor: "pointer" }}
              >
                <span style={{ color: COLORS.text }} className="text-sm font-medium">{f.q}</span>
                <ChevronDown
                  size={16}
                  color={COLORS.muted}
                  style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4" style={{ color: COLORS.muted }}>
                  <p className="text-sm leading-relaxed">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- DERNIER CTA ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div
          className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          style={{ background: GRADIENT }}
        >
          <BarChart3 size={28} color="rgba(10,13,22,0.4)" className="mx-auto mb-4" />
          <h2 style={{ ...fontDisplay, color: "#0A0D16" }} className="text-2xl md:text-3xl font-bold mb-3">
            Réservez votre place pour la cohorte de septembre 2026
          </h2>
          <p style={{ color: "rgba(10,13,22,0.75)" }} className="mb-2 max-w-lg mx-auto">
            Réservez votre place dès maintenant et commencez à automatiser votre reporting dès la première semaine.
          </p>
          <p style={{ ...fontMono, color: "rgba(10,13,22,0.6)" }} className="text-xs mb-7">
            Tarif à 199 € valable jusqu'au 30 juillet 2026
          </p>
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold transition-transform hover:scale-105"
            style={{ background: "#0A0D16", color: "#F1F3F9", border: "none", cursor: "pointer" }}
          >
            Réserver ma place <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <span style={{ color: COLORS.mutedDark }} className="text-sm">© 2026 Dimitri Takou — Formation Excel &amp; Power BI</span>
        <div className="flex items-center gap-2" style={{ ...fontMono, color: COLORS.mutedDark, fontSize: "11px" }}>
          <TrendingUp size={12} /> Cohorte septembre 2026
        </div>
      </footer>
    </div>
  );
}

const inputStyle = {
  ...fontBody,
  width: "100%",
  background: "#161B2A",
  border: "1px solid #232A3D",
  borderRadius: "10px",
  padding: "10px 14px",
  color: "#F1F3F9",
  fontSize: "14px",
  outline: "none",
};

function Field({ label, children }) {
  return (
    <label className="block">
      <span style={{ color: "#8B93AC", ...fontBody }} className="text-xs font-medium mb-1.5 block">
        {label}
      </span>
      {children}
    </label>
  );
}
