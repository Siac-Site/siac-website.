"use client";

import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

const SERVICES = [
  { label: "ERP Crítico", href: "/solucoes/erp-critico" },
  {
    label: "Resiliência Cibernética",
    href: "/solucoes/resiliencia-cibernetica",
  },
  { label: "Operação de TI", href: "/solucoes/operacao-de-ti" },
];

const COMPANY = [
  { label: "Quem Somos", href: "#manifesto" },
  { label: "Casos de Sucesso", href: "#casos-de-sucesso" },
  { label: "Parceiros", href: "#parceiros" },
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
];

export function Footer() {
  // Same issue as the Nav: these are bare "#id" anchors that only resolve
  // while already on the homepage — prefix with "/" elsewhere so they
  // navigate back instead of silently doing nothing.
  const pathname = usePathname();
  const isHome = pathname === "/";
  const toHref = (href: string) =>
    href.startsWith("#") && !isHome ? `/${href}` : href;

  return (
    <footer className="bg-brand-black py-2xl text-brand-ice">
      <div className="mx-auto max-w-[1200px] px-sm md:px-lg">
        <div className="grid gap-2xl md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Logo + tagline */}
          <div>
            <Image
              src="/brand/logo/siac-logo-light.png"
              alt="SIAC"
              width={148}
              height={45}
              className="h-8 w-auto"
            />
            <p className="mt-md max-w-[240px] text-sm text-brand-ice/60">
              Soluções integradas para ambientes críticos.
            </p>
          </div>

          {/* Serviços */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-ice/40">
              SERVIÇOS
            </p>
            <ul className="mt-md flex flex-col gap-sm">
              {SERVICES.map((item) => (
                <li key={item.label}>
                  <a
                    href={toHref(item.href)}
                    className="text-sm text-brand-ice/70 transition-colors ease-brand hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-ice/40">
              EMPRESA
            </p>
            <ul className="mt-md flex flex-col gap-sm">
              {COMPANY.map((item) => (
                <li key={item.label}>
                  <a
                    href={toHref(item.href)}
                    className="text-sm text-brand-ice/70 transition-colors ease-brand hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-ice/40">
              CONTATO
            </p>
            <ul className="mt-md flex flex-col gap-sm text-sm text-brand-ice/70">
              <li className="flex items-start gap-xs">
                <MapPin size={16} className="shrink-0 text-brand-ice/60" />
                <span>
                  Av. Rosendo Serapião de Souza Filho, 595 – Ed. Mata da
                  Praia, Salas 101 e 102 – Mata da Praia, Vitória/ES – CEP
                  29065-020
                </span>
              </li>
              <li className="flex items-center gap-xs">
                <Mail size={16} className="shrink-0 text-brand-ice/60" />
                <a
                  href="mailto:comercial@siactecnologia.com.br"
                  className="transition-colors ease-brand hover:text-white"
                >
                  comercial@siactecnologia.com.br
                </a>
              </li>
              <li className="flex items-center gap-xs">
                <Phone size={16} className="shrink-0 text-brand-ice/60" />
                <a
                  href="tel:+552740421758"
                  className="transition-colors ease-brand hover:text-white"
                >
                  (27) 4042-1758
                </a>
              </li>
              <li>
                <span className="inline-flex items-center rounded-pill border border-brand-ice/20 px-md py-xs text-xs font-semibold text-brand-ice/80">
                  Suporte 24/7
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-2xl border-t border-white/10 pt-lg text-center text-xs text-brand-ice/40">
          © {new Date().getFullYear()} SIAC Engenharia Digital. Todos os
          direitos reservados.
        </div>
      </div>
    </footer>
  );
}
