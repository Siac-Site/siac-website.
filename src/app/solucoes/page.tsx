import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SITE_DESCRIPTION, SITE_NAME, SOCIAL_IMAGE } from "@/lib/site";
import { SOLUTIONS } from "@/lib/solutions";

export const metadata: Metadata = {
  title: "Soluções para tecnologia crítica",
  description:
    "Conheça as soluções da SIAC para ERP crítico, resiliência cibernética e operação contínua de TI.",
  alternates: {
    canonical: "/solucoes",
  },
  openGraph: {
    url: "/solucoes",
    title: `Soluções para tecnologia crítica | ${SITE_NAME}`,
    description:
      "ERP crítico, resiliência cibernética e operação de TI com responsabilidade contínua sobre o ambiente.",
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `Soluções para tecnologia crítica | ${SITE_NAME}`,
    description:
      "ERP crítico, resiliência cibernética e operação de TI com responsabilidade contínua sobre o ambiente.",
    images: [SOCIAL_IMAGE.url],
  },
};

export default function SolutionsPage() {
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Soluções SIAC",
    description: SITE_DESCRIPTION,
    url: "https://www.siac.tech/solucoes",
    mainEntity: SOLUTIONS.map((solution) => ({
      "@type": "Service",
      name: solution.title,
      description: solution.description,
      url: `https://www.siac.tech/solucoes/${solution.slug}`,
      provider: {
        "@id": "https://www.siac.tech/#organization",
      },
    })),
  };

  return (
    <main className="min-h-screen bg-brand-ice text-brand-graphite dark:bg-brand-black dark:text-brand-ice">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Nav />

      <section className="border-b border-brand-graphite/10 px-sm pb-2xl pt-[152px] dark:border-white/10 md:px-lg md:pb-[88px] md:pt-[184px]">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-primary">
            SOLUÇÕES SIAC
          </p>
          <h1 className="mt-md max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Tecnologia crítica sob controle, da engenharia à operação.
          </h1>
          <p className="mt-lg max-w-2xl text-base leading-relaxed text-brand-graphite/70 dark:text-brand-ice/70 md:text-lg">
            Três frentes integradas para reduzir riscos, elevar a disponibilidade
            e dar previsibilidade à evolução tecnológica.
          </p>
        </div>
      </section>

      <section className="px-sm py-2xl md:px-lg md:py-[88px]">
        <div className="mx-auto max-w-[1200px] divide-y divide-brand-graphite/10 border-y border-brand-graphite/10 dark:divide-white/10 dark:border-white/10">
          {SOLUTIONS.map((solution) => (
            <article
              key={solution.slug}
              className="grid gap-lg py-xl md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:items-center md:py-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-card">
                <Image
                  src={solution.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 42vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="md:pl-lg">
                <p className="text-xs font-semibold text-brand-primary">
                  {solution.id}
                </p>
                <h2 className="mt-xs text-3xl font-bold md:text-4xl">
                  {solution.title}
                </h2>
                <p className="mt-md max-w-xl leading-relaxed text-brand-graphite/70 dark:text-brand-ice/70">
                  {solution.description}
                </p>
                <Link
                  href={`/solucoes/${solution.slug}`}
                  className="mt-lg inline-flex items-center gap-xs text-sm font-semibold text-brand-primary transition-colors ease-brand hover:text-brand-primary-dark"
                >
                  Conhecer a solução
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-graphite px-sm py-2xl text-brand-ice md:px-lg md:py-[88px]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-lg md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-ice/50">
              PRÓXIMO PASSO
            </p>
            <h2 className="mt-md max-w-2xl text-3xl font-bold md:text-5xl">
              Comece pelo risco que mais pressiona a operação.
            </h2>
          </div>
          <Link
            href="/#contato"
            className="inline-flex items-center gap-xs rounded-button bg-brand-primary px-lg py-sm text-sm font-semibold text-white transition-colors ease-brand hover:bg-brand-primary-dark"
          >
            Falar com um especialista
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
