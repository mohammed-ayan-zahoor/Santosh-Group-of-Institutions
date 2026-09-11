import { buildMetadata } from "@/lib/metadata";
import { getPageContent } from "@/lib/content";

export async function generateMetadata() {
  const content = await getPageContent("student-life");
  return buildMetadata({
    title: content?.metaTitle ?? "Student Life & Regulations | Santosh Group of Institutions",
    description: content?.metaDescription ?? "NSS community service, sports, career guidance, counseling, and campus rules at Santosh Group of Institutions, Bangarpet.",
    canonical: "https://santoshdedcollege.com/student-life",
  });
}

export default function StudentLifeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
