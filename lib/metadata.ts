// Shared utility: builds a Metadata object from a content JSON's metaTitle/metaDescription.
// Used by generateMetadata in every page/layout that reads from the CMS.
import { Metadata } from "next";

export function buildMetadata({
  title,
  description,
  canonical,
  ogImage,
}: {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
