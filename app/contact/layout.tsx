import { buildMetadata } from "@/lib/metadata";
import { getPageContent } from "@/lib/content";

export async function generateMetadata() {
  const content = await getPageContent("contact");
  return buildMetadata({
    title: content?.metaTitle ?? "Contact Us | Santosh Group Bangarpet | +91 94481 06902",
    description: content?.metaDescription ?? "Contact Santosh Group of Institutions. Address: No. 1169, Kolar Road, Bangarpet 563114. Phone: 09448106902. Email: santoshgroupofinstitutions@gmail.com",
    canonical: "https://santoshdedcollege.com/contact",
  });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
