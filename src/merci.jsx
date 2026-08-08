import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { CheckCircle2 } from "lucide-react";

const COLORS = {
  bg: "#0A0D16",
  surface: "#10141F",
  borderLight: "#2E3650",
  text: "#F1F3F9",
  muted: "#8B93AC",
  green: "#3DDC97",
};

const fontDisplay = { fontFamily: "'Sora', sans-serif" };
const fontBody = { fontFamily: "'Inter', sans-serif" };

function MerciPage() {
  const params = new URLSearchParams(window.location.search);
  const prenom = params.get("prenom");
  const email = params.get("email");

  useEffect(() => {
    // Meta Pixel — Lead event fired once, tied to the confirmation page view itself
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead", {
        content_name: "Webinaire Excel, Power Query & Power BI - 13 août 2026",
      });
    }
  }, []);

  return (
    <div
      style={{ background: COLORS.bg, minHeight: "100vh", ...fontBody }}
      className="w-full flex items-center justify-center px-6"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
      `}</style>
      <div
        className="rounded-2xl p-10 text-center max-w-lg w-full"
        style={{ background: COLORS.surface, border: `1px solid ${COLORS.borderLight}` }}
      >
        <CheckCircle2 size={40} color={COLORS.green} className="mx-auto mb-4" />
        <h1 style={{ ...fontDisplay, color: COLORS.text }} className="text-xl font-semibold mb-2">
          Place réservée
        </h1>
        <p style={{ color: COLORS.muted }} className="text-sm leading-relaxed">
          Merci {prenom || ""}, votre inscription au webinaire Excel, Power Query &amp; Power BI du jeudi 13
          août 2026 à 20h (heure de France) est bien enregistrée.
          <br /><br />
          Le lien de connexion Google Meet vous sera transmis par e-mail{email ? ` à ${email}` : ""} avant le
          webinaire.
          <br /><br />
          Pour recevoir les rappels et les informations pratiques, rejoignez dès maintenant le groupe
          WhatsApp dédié au webinaire.
        </p>
        <a
          href="https://chat.whatsapp.com/E6dm1GNx9LgKLk61qu56L8"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-cta-button"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="#FFFFFF" aria-hidden="true">
            <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4c-4.35 0-7.85 3.5-7.85 7.85 0 1.38.36 2.7.99 3.87L4 20l4.4-1.15c1.12.6 2.37.94 3.65.94h.003c4.34 0 7.85-3.5 7.85-7.85a7.8 7.8 0 0 0-2.3-5.62zM12.05 18.4a6.5 6.5 0 0 1-3.31-.9l-.24-.14-2.46.64.66-2.4-.16-.25a6.5 6.5 0 0 1-1-3.5c0-3.6 2.93-6.53 6.54-6.53a6.5 6.5 0 0 1 4.62 1.92 6.5 6.5 0 0 1 1.91 4.61c0 3.61-2.93 6.55-6.56 6.55zm3.59-4.9c-.2-.1-1.17-.58-1.35-.64-.18-.07-.32-.1-.45.1-.13.2-.51.64-.63.77-.11.13-.23.15-.43.05-.2-.1-.83-.31-1.58-.98-.58-.52-.98-1.16-1.09-1.36-.11-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.11.13-.2.2-.33.07-.13.03-.25-.02-.35-.05-.1-.45-1.09-.62-1.49-.16-.39-.33-.34-.45-.34-.11 0-.25-.01-.38-.01-.13 0-.35.05-.53.25-.18.2-.7.68-.7 1.67s.72 1.94.82 2.07c.1.13 1.4 2.15 3.4 3.01.48.21.85.33 1.14.42.48.15.91.13 1.26.08.38-.06 1.17-.48 1.34-.94.16-.46.16-.86.11-.94-.05-.08-.18-.13-.38-.23z" />
          </svg>
          <span>Rejoindre le groupe WhatsApp</span>
        </a>
      </div>
      <style>{`
        .whatsapp-cta-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-top: 24px;
          padding: 22px 32px;
          background-color: #25D366;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 22px;
          line-height: 1.25;
          text-align: center;
          text-decoration: none;
          border-radius: 22px;
          width: 100%;
          box-sizing: border-box;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
          animation: whatsapp-pulse 2s ease-in-out infinite;
        }
        .whatsapp-cta-button svg {
          flex-shrink: 0;
        }
        .whatsapp-cta-button:hover {
          background-color: #1EBE5A;
          transform: scale(1.03);
          box-shadow: 0 10px 24px -6px rgba(37, 211, 102, 0.55);
          animation-play-state: paused;
        }
        @keyframes whatsapp-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.55);
          }
          70% {
            box-shadow: 0 0 0 16px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .whatsapp-cta-button {
            animation: none;
          }
        }
        @media (max-width: 380px) {
          .whatsapp-cta-button {
            font-size: 19px;
            padding: 18px 20px;
          }
        }
      `}</style>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MerciPage />
  </React.StrictMode>
);
