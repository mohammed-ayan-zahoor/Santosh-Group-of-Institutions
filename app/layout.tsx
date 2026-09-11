import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const BASE_URL = "https://santoshdedcollege.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Santosh Group of Institutions | Est. 1977 | Bangarpet & Bangalore",
    template: "%s | Santosh Group of Institutions",
  },
  description:
    "11 institutions from Pre-Primary to Graduation in Bangarpet & Bangalore. Founded by Dr. Al Haji Abdul Sattar. Affiliated to Bangalore University, Karnataka State PU Board & NCTE.",
  robots: {
    index: true,
    follow: true,
    // ponytail: opt-in hints for Google Image Search and full snippet rendering.
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    siteName: "Santosh Group of Institutions",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/campus-main-entrance.jpg",
        width: 1200,
        height: 630,
        alt: "Santosh Group of Institutions — Main Campus Entrance, Bangarpet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Santosh Group of Institutions",
  alternateName: ["Santosh Group", "SGI", "Santosh Educational Trust"],
  url: BASE_URL,
  logo: `${BASE_URL}/images/sgi-logo.png`,
  image: `${BASE_URL}/images/campus-main-entrance.jpg`,
  foundingDate: "1977",
  founder: {
    "@type": "Person",
    name: "Dr. Al Haji Abdul Sattar",
    honorificPrefix: "Dr.",
    honorificSuffix: "M.A.",
    jobTitle: "Chairman",
    worksFor: { "@type": "EducationalOrganization", name: "Santosh Group of Institutions" },
  },
  employee: {
    "@type": "Person",
    name: "A. Adil Pasha",
    honorificSuffix: "B.Sc., B.E.",
    jobTitle: "Secretary",
    worksFor: { "@type": "EducationalOrganization", name: "Santosh Group of Institutions" },
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 1169, Kolar Road",
    addressLocality: "Bangarpet",
    postalCode: "563114",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  telephone: ["+919448106902", "+919886152151"],
  email: "santoshgroupofinstitutions@gmail.com",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    "value": "300+"
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Academic Programs — Pre-Primary to Graduation",
    itemListElement: [
      { "@type": "Course", name: "Pre-Primary & Primary School" },
      { "@type": "Course", name: "High School (SSLC)" },
      { "@type": "Course", name: "Pre-University (PUC) — Science, Commerce, Arts" },
      { "@type": "Course", name: "BBM — Bachelor of Business Management" },
      { "@type": "Course", name: "BCA — Bachelor of Computer Applications" },
      { "@type": "Course", name: "B.Com — Bachelor of Commerce" },
      { "@type": "Course", name: "BA — Bachelor of Arts" },
      { "@type": "Course", name: "D.Ed — Diploma in Education (TCH)" },
    ],
  },
  sameAs: [`${BASE_URL}`],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream text-charcoal antialiased font-sans">
        <JsonLd schema={orgSchema} />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
