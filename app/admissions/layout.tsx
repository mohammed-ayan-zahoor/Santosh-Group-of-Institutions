import { buildMetadata } from "@/lib/metadata";
import { getPageContent } from "@/lib/content";
import JsonLd from "@/components/JsonLd";

export async function generateMetadata() {
  const content = await getPageContent("admissions");
  return buildMetadata({
    title: content?.metaTitle ?? "Admissions 2025–26 | Santosh Group of Institutions",
    description: content?.metaDescription ?? "Apply to Santosh schools, Fathima PU College, Santosh Degree College (BBM/BCA/B.Com/BA) or D.Ed. Admissions open for 2025–26.",
    canonical: "https://santoshdedcollege.com/admissions",
    ogImage: "/images/campus-assembly.jpg",
  });
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What programs does Santosh Group of Institutions offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Santosh Group offers programs from Nursery to Graduation: Nursery & Primary School, Higher Primary School, High School (SSLC), Pre-University (PUC) in Science, Commerce, and Arts at Fathima PU College, Undergraduate degrees (BBM, BCA, B.Com, BA) at Santosh Degree College, and D.Ed (Teacher Training) at Santosh D.Ed College.",
      },
    },
    {
      "@type": "Question",
      name: "How do I apply for admission to Santosh Group of Institutions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Contact the Admissions Office at No. 1169, Kolar Road, Bangarpet 563114. Call 09448106902 or email santoshgroupofinstitutions@gmail.com. Admissions are open annually for all programs.",
      },
    },
    {
      "@type": "Question",
      name: "Is Santosh Degree College affiliated to Bangalore University?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Santosh Degree College is affiliated to Bangalore University and offers BBM, BCA, B.Com, and BA programs.",
      },
    },
    {
      "@type": "Question",
      name: "Is Fathima PU College affiliated to the Karnataka State PU Board?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Fathima PU College, Bangarpet is affiliated to the Karnataka State Pre-University Board and offers Science, Commerce, and Arts streams.",
      },
    },
    {
      "@type": "Question",
      name: "Is Santosh D.Ed College approved by NCTE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Santosh D.Ed (T.C.H) College is approved by NCTE (National Council for Teacher Education) and offers a 2-year Diploma in Education program.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Santosh Group of Institutions located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The central office is at No. 1169, Kolar Road, Bangarpet – 563 114, Kolar District, Karnataka. Santosh Group has 11 campuses spread across Bangarpet and Bangalore.",
      },
    },
  ],
};

export default function AdmissionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={faqSchema} />
      {children}
    </>
  );
}

