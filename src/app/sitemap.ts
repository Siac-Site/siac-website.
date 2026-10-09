import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SOLUTIONS } from "@/lib/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/solucoes`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...SOLUTIONS.map((solution) => ({
      url: `${SITE_URL}/solucoes/${solution.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/politica-de-privacidade`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
