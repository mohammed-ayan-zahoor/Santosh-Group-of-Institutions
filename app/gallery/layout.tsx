import { buildMetadata } from "@/lib/metadata";
import { getPageContent } from "@/lib/content";

export async function generateMetadata() {
  const content = await getPageContent("gallery");
  return buildMetadata({
    title: content?.metaTitle ?? "Campus Gallery | Santosh Group of Institutions",
    description: content?.metaDescription ?? "Photo gallery: dignitary visits, NSS camps, academic events, campus infrastructure, and student life at Santosh Group campuses.",
    canonical: "https://santoshdedcollege.com/gallery",
    ogImage: "/images/santosh-award-ceremony.jpg",
  });
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
