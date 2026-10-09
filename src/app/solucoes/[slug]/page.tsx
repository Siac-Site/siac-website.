import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SITE_NAME, SITE_URL, SOCIAL_IMAGE } from "@/lib/site";
import { getSolution, SOLUTIONS } from "@/lib/solutions";

interface SolutionPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return SOLUTIONS.map((solution) => ({ slug: solution.slug }));
}

export function generateMetadata({ params }: SolutionPageProps): Metadata {
  const solution = getSolution(params.slug);

  if (!solution) return {};

  const path = `/solucoes/${solution.slug}`;

  return {
    title: solution.title,
    description: solution.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url: path,
      title: `${solution.title} | ${SITE_NAME}`,
      description: solution.description,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${solution.title} | ${SITE_NAME}`,
      description: solution.description,
      images: [SOCIAL_IMAGE.url],
    },
  };
}

export default function SolutionPage({ params }: SolutionPageProps) {
  const solution = getSolution(params.slug);

  if (!solution) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.title,
    description: solution.description,
    url: `${SITE_URL}/solucoes/${solution.slug}`,
    areaServed: {
      "@type": "Country",
      name: "Brasil",
    },
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  return (
    <main className="min-h-screen bg-brand-ice text-brand-graphite dark:bg-brand-black dark:text-brand-ice">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Nav />

      <section className="relative flex min-h-[680px] items-end overflow-hidden bg-brand-black px-sm pb-2xl pt-[152px] text-white md:min-h-[720px] md:px-lg md:pb-[88px]">
        <Image
          src={solution.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <Link
            href="/solucoes"
            className="inline-flex items-center gap-xs text-sm font-medium text-white/70 transition-colors ease-brand hover:text-white"
          >
            <ArrowLeft size={16} />
            Todas as soluções
          </Link>
          <p className="mt-xl text-xs font-semibold tracking-[0.2em] text-white/60">
            SOLUÇÃO {solution.id}
          </p>
          <h1 className="mt-sm max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
            {solution.title}
          </h1>
          <p className="mt-lg max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            {solution.description}
          </p>
        </div>
      </section>

      <section className="px-sm py-2xl md:px-lg md:py-[96px]">
        <div className="mx-auto grid max-w-[1200px] gap-2xl md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-primary">
              CONTEXTO DE NEGÓCIO
            </p>
            <h2 className="mt-md text-3xl font-bold leading-tight md:text-5xl">
              Continuidade exige responsabilidade definida.
            </h2>
            <p className="mt-lg max-w-xl text-base leading-relaxed text-brand-graphite/70 dark:text-brand-ice/70 md:text-lg">
              {solution.context}
            </p>
          </div>

          <div className="border-t border-brand-graphite/15 pt-lg dark:border-white/15 md:border-l md:border-t-0 md:pl-2xl md:pt-0">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-graphite/50 dark:text-brand-ice/50">
              O QUE A SIAC ASSUME
            </p>
            <ul className="mt-lg divide-y divide-brand-graphite/10 border-y border-brand-graphite/10 dark:divide-white/10 dark:border-white/10">
              {solution.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-sm py-md text-base md:text-lg"
                >
                  <Check
                    size={20}
                    className="mt-0.5 shrink-0 text-brand-primary"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-xl border-l-2 border-brand-primary pl-md">
              <p className="text-xs font-semibold tracking-[0.2em] text-brand-primary">
                RESULTADO
              </p>
              <p className="mt-xs text-lg font-semibold leading-relaxed">
                {solution.outcome}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-graphite px-sm py-2xl text-brand-ice md:px-lg md:py-[88px]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-lg md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-ice/50">
              DIAGNÓSTICO
            </p>
            <h2 className="mt-md max-w-2xl text-3xl font-bold md:text-5xl">
              Entenda o risco antes de definir a solução.
            </h2>
          </div>
          <Link
            href={`/#contato`}
            className="inline-flex items-center gap-xs rounded-button bg-brand-primary px-lg py-sm text-sm font-semibold text-white transition-colors ease-brand hover:bg-brand-primary-dark"
          >
            Falar sobre {solution.title}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
