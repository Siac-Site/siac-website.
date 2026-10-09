"use client";

import { useEffect, useState } from "react";

const PHONE = "552740421758";
const MESSAGE = "Olá, vim pelo site da SIAC e gostaria de mais informações";
const WHATSAPP_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

// WhatsApp's own green is a deliberate exception to the brand palette — it's
// the recognized identity color of the WhatsApp icon itself, not a SIAC accent.
const WHATSAPP_GREEN = "#25D366";

export function WhatsAppButton() {
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contato");
    if (!contact) return;
    const observer = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      aria-hidden={contactVisible}
      tabIndex={contactVisible ? -1 : undefined}
      className={`group fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-pill shadow-level-2 transition-all ease-brand hover:scale-110 md:bottom-6 md:right-6 ${
        contactVisible ? "pointer-events-none scale-90 opacity-0" : "opacity-100"
      }`}
    >
      {/* Soft expanding ring — subtle attention cue, not a hard blink */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-pill animate-whatsapp-pulse"
        style={{ backgroundColor: WHATSAPP_GREEN }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-pill"
        style={{ backgroundColor: WHATSAPP_GREEN }}
      />
      <svg viewBox="0 0 24 24" fill="white" className="relative h-7 w-7">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.77.46 3.45 1.32 4.94L2 22l5.28-1.39a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91S17.5 2 12.04 2Zm0 18.09h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.13-.17.25-.65.81-.79.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.12.16 1.75 2.67 4.24 3.74.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28Z" />
      </svg>
    </a>
  );
}
