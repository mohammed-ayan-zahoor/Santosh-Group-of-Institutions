import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPageContent, getAllInstitutions } from "@/lib/content";
import CrossGrid from "@/components/CrossGrid";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

const BASE_URL = "https://santoshdedcollege.com";

export async function generateStaticParams() {
  const institutions = await getAllInstitutions();
  return institutions.map((inst) => ({
    slug: inst.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const inst = await getPageContent(slug);
  if (!inst) return {};
  const title = inst.metaTitle ?? `${inst.name} | ${inst.location} Campus | Santosh Group`;
  const description = inst.metaDescription ?? `${inst.name} in ${inst.location}. ${inst.tagline ?? ""} ${inst.description ?? ""}`.slice(0, 160).trim();
  return buildMetadata({
    title,
    description,
    canonical: `${BASE_URL}/institutions/${slug}`,
    ogImage: inst.image ?? "/images/campus-main-entrance.jpg",
  });
}

export default async function InstitutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const inst = await getPageContent(slug);

  if (!inst) {
    notFound();
  }

  const isCollege = inst.template === "college";

  return (
    <div className="space-y-20 lg:space-y-28 pb-24">
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Institutions", item: `${BASE_URL}/institutions` },
          { "@type": "ListItem", position: 3, name: inst.name, item: `${BASE_URL}/institutions/${slug}` },
        ],
      }} />
      <JsonLd schema={{
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: inst.name,
        description: inst.description,
        url: `${BASE_URL}/institutions/${slug}`,
        ...(inst.image && { image: inst.image.startsWith("http") ? inst.image : `${BASE_URL}${inst.image}` }),
        parentOrganization: { "@type": "EducationalOrganization", name: "Santosh Group of Institutions", url: BASE_URL },
        address: {
          "@type": "PostalAddress",
          addressLocality: inst.location,
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
        ...(inst.phone && { telephone: inst.phone }),
        ...(inst.email && { email: inst.email }),
      }} />
      {/* 1. HERO SECTION — Completely unboxed, floats directly on #FAF6EE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/institutions"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-charcoal transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Institutions</span>
          </Link>
        </div>

        {/* Top Split: Two-tier typography (Bold School Name + Neutral Sans Copy) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-10">
          {/* Left: Metadata label (plain small-caps, NO pill/border/bg) + School Name */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
              {inst.location} Campus • {inst.level}
              {inst.board && ` • ${inst.board}`}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-charcoal tracking-tight leading-[1.08]">
              {inst.name}
            </h1>
            {inst.tagline && (
              <p className="text-base sm:text-lg text-muted font-sans pt-1">
                {inst.tagline}
              </p>
            )}
          </div>

          {/* Right: Description paragraph + CTA */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-sm sm:text-base text-muted leading-relaxed font-sans">
              {inst.description}
            </p>
            <div className="flex items-center gap-4">
              <Link href="/admissions" className="btn-primary">
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="link-underlined text-xs inline-flex items-center gap-1"
              >
                <span>Campus Inquiries</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Crisp Photo — Sharp 0px corners, no outer container box */}
        <div className="relative w-full h-80 sm:h-[460px] lg:h-[520px] overflow-hidden border border-taupe bg-charcoal/5">
          <Image
            src={inst.image || "/images/hero-students.jpg"}
            alt={inst.name}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* 2. TEMPLATE A: UNBOXED LEARNING FOCUS & CURRICULUM SPECIFICS (Schools) */}
      {!isCollege && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Section Heading on Left */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
                LEARNING FOCUS
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-charcoal">
                Curriculum & Student Development
              </h2>
              <p className="text-sm text-muted leading-relaxed font-sans">
                Foundational schooling at SGI prioritizes conceptual inquiry, language development, and disciplined personal character in a supportive setting.
              </p>
              <div className="pt-4 hidden lg:block overflow-hidden">
                <CrossGrid
                  variant="crosshair"
                  className="max-w-[180px] h-auto"
                />
              </div>
            </div>

            {/* UNBOXED Editorial List on Right (No card borders, no icon containers, varied specifics) */}
            <div className="lg:col-span-8 divide-y divide-taupe border-y border-taupe">
              {inst.features?.map((feat: any, idx: number) => (
                <div key={idx} className="py-6 sm:py-8 space-y-2">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-medium">
                      {feat.title}
                    </h3>
                    <span className="text-xs font-mono text-muted/60 shrink-0">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed font-sans max-w-2xl">
                    {feat.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. TEMPLATE B: SPECIALIZED COLLEGES (Degree, PU, D.Ed) */}
      {isCollege && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* A. FATHIMA PU COLLEGE */}
          {inst.slug === "fathima-pu-college" && (
            <div className="space-y-16">
              {/* Split: Key Facts + Solid Green Pledge Anchor */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
                {/* Left: Unboxed Facts list */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
                    DISTINGUISHING ADVANTAGES
                  </div>
                  <h2 className="text-3xl font-serif text-charcoal">
                    Key Academic Facts
                  </h2>
                  <div className="divide-y divide-taupe border-y border-taupe">
                    {inst.keyFacts?.map((fact: string, idx: number) => (
                      <div key={idx} className="py-3.5 text-sm text-muted font-sans flex items-start gap-3">
                        <span className="text-xs font-mono text-muted/70 pt-0.5">0{idx + 1}</span>
                        <span>{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Solid Green Anchor Block (Sharp 0px corners, exactly per EdmunHigh guide) */}
                <div className="lg:col-span-6 bg-forest text-white p-8 sm:p-10 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="text-xs uppercase tracking-widest text-white/70 font-semibold font-sans">
                      COLLEGE COMMITMENT
                    </div>
                    <h3 className="font-sans text-2xl sm:text-3xl text-white font-bold">
                      If you choose to come to Fathima
                    </h3>
                    <ul className="space-y-2.5 text-sm text-white/85 font-sans">
                      {inst.pledge?.weWill.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-white">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/20">
                    <div className="text-xs uppercase tracking-widest text-gold font-semibold mb-2 font-sans">
                      In return you will:
                    </div>
                    <ul className="space-y-1.5 text-xs text-white/80 font-sans">
                      {inst.pledge?.inReturnYouWill.map((item: string, idx: number) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* PU Stream Table — Unboxed thin rules */}
              <div className="space-y-6 pt-4">
                <div className="border-b border-taupe pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
                      ACADEMIC STREAMS
                    </div>
                    <h2 className="text-3xl font-serif text-charcoal">
                      Course Combinations Offered
                    </h2>
                  </div>
                  <span className="text-xs text-muted font-sans">
                    Karnataka State PU Board
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
                  {inst.streams?.map((st: any, idx: number) => (
                    <div key={idx} className="space-y-1.5 border-t border-taupe pt-4">
                      <div className="text-xs font-mono text-muted">Stream 0{idx + 1}</div>
                      <h3 className="font-serif text-xl text-charcoal font-medium">{st.stream}</h3>
                      <p className="text-xs text-muted font-sans leading-relaxed">{st.subjects}</p>
                    </div>
                  ))}
                </div>

                <div className="py-4 border-t border-taupe text-xs text-muted font-sans">
                  <strong className="text-charcoal">Languages Offered:</strong> {inst.languages?.join(", ")}
                </div>
              </div>
            </div>
          )}

          {/* B. SANTOSH DEGREE COLLEGE */}
          {inst.slug === "santosh-degree-college" && (
            <div className="space-y-12">
              <div className="border-b border-taupe pb-4">
                <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
                  BANGALORE UNIVERSITY AFFILIATED
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif text-charcoal">
                  Undergraduate Degree Curricula
                </h2>
              </div>

              {/* Unboxed 2-Column Program Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
                {inst.programs?.map((prog: any, idx: number) => (
                  <div key={idx} className="space-y-3 border-t border-taupe pt-6">
                    <div className="text-xs font-mono text-forest font-semibold uppercase tracking-wider">
                      Degree 0{idx + 1}
                    </div>
                    <h3 className="font-serif text-2xl text-charcoal font-medium">
                      {prog.degree}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed font-sans">
                      {prog.overview}
                    </p>

                    {prog.electives && (
                      <div className="pt-2">
                        <span className="text-xs font-semibold text-charcoal block mb-1">
                          Electives:
                        </span>
                        <p className="text-xs text-muted font-sans">
                          {prog.electives.join(" • ")}
                        </p>
                      </div>
                    )}

                    {prog.prospects && (
                      <div className="pt-2">
                        <span className="text-xs font-semibold text-charcoal block mb-1">
                          Career Prospects:
                        </span>
                        <p className="text-xs text-muted font-sans">
                          {prog.prospects.join(" • ")}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="py-6 border-y border-taupe grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-muted font-sans">
                <div>
                  <strong className="text-charcoal block mb-1">Eligibility:</strong>
                  <span>{inst.eligibility}</span>
                </div>
                <div>
                  <strong className="text-charcoal block mb-1">Duration:</strong>
                  <span>{inst.duration}</span>
                </div>
              </div>
            </div>
          )}

          {/* C. SANTOSH D.ED COLLEGE */}
          {inst.slug === "santosh-ded-college" && (
            <div className="space-y-14">
              {/* Split: Objectives + Solid Green Distinction Highlight */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
                <div className="lg:col-span-7 space-y-6">
                  <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
                    COURSE OBJECTIVES
                  </div>
                  <h2 className="text-3xl font-serif text-charcoal">
                    Shaping India's Classrooms
                  </h2>
                  <div className="divide-y divide-taupe border-y border-taupe">
                    {inst.objectives?.map((obj: string, idx: number) => (
                      <div key={idx} className="py-3.5 text-sm text-muted font-sans flex items-start gap-3">
                        <span className="text-xs font-mono text-muted/70 pt-0.5">0{idx + 1}</span>
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-forest text-white p-8 sm:p-10 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="text-xs uppercase tracking-widest text-white/70 font-semibold font-sans">
                      EXCELLENCE RECORD
                    </div>
                    <h3 className="font-sans text-2xl sm:text-3xl text-white font-bold">
                      18 Distinctions & Kolar District Topper
                    </h3>
                    <p className="text-sm text-white/80 font-sans leading-relaxed">
                      Santosh D.Ed College achieved 18 distinctions in a single academic cycle with the highest percentage marks across Kolar District.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-white/20 text-xs text-white/90 font-mono">
                    Direct Contact: {inst.email}
                  </div>
                </div>
              </div>

              {/* Syllabus Structure */}
              <div className="space-y-6 pt-4">
                <div className="border-b border-taupe pb-4">
                  <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
                    SYLLABUS & INTERNSHIP
                  </div>
                  <h2 className="text-3xl font-serif text-charcoal">
                    Course Structure
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl text-charcoal font-medium">
                      Year I — Foundation Subjects
                    </h3>
                    <ul className="space-y-2 text-xs text-muted font-sans divide-y divide-taupe/40">
                      {inst.structure?.year1.map((sub: string, i: number) => (
                        <li key={i} className="pt-2 first:pt-0">{sub}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-serif text-xl text-charcoal font-medium">
                      Year II — Professional & Specialisations
                    </h3>
                    <ul className="space-y-2 text-xs text-muted font-sans divide-y divide-taupe/40">
                      {inst.structure?.year2.map((sub: string, i: number) => (
                        <li key={i} className="pt-2 first:pt-0">{sub}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="py-6 border-y border-taupe grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-muted font-sans">
                  <div>
                    <strong className="text-charcoal block mb-1">Eligibility:</strong>
                    <span>{inst.eligibility}</span>
                  </div>
                  <div>
                    <strong className="text-charcoal block mb-1">Duration:</strong>
                    <span>{inst.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 4. UNBOXED FOOTER STRIP — Simple, clean line-divided contact action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-taupe pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider font-semibold text-muted font-sans">
              ADMISSIONS & CONTACT
            </div>
            <div className="text-lg font-serif text-charcoal">
              Admissions Office: {inst.phone}
            </div>
            <p className="text-xs text-muted font-sans">
              {inst.campus || inst.location} • Mon–Sat: 9:00 AM – 5:00 PM
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/admissions" className="btn-primary">
              <span>Apply for Admission</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="link-underlined text-xs">
              Contact Office →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
