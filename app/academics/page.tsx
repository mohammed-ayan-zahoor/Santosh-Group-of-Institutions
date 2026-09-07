import React from "react";
import Link from "next/link";
import { getPageContent } from "@/lib/content";
import DecorativePlusGrid from "@/components/DecorativePlusGrid";
import { ArrowRight, Award } from "lucide-react";

export default async function AcademicsPage() {
  const content = await getPageContent("academics");

  if (!content) {
    return <div className="p-12 text-center text-muted">Loading...</div>;
  }

  const { intro, degrees, teacherEducation, pucStreams } = content;

  return (
    <div className="space-y-24 lg:space-y-32 pb-24">
      {/* 1. ACADEMICS HERO (Unboxed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14">
        <div className="border-b border-taupe pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted mb-2">
              {intro.eyebrow}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-charcoal leading-tight tracking-tight font-medium">
              {intro.title}
            </h1>
            <p className="text-sm sm:text-base text-muted mt-3 max-w-2xl leading-relaxed font-sans">
              {intro.lead}
            </p>
          </div>
          <div className="hidden md:block">
            <DecorativePlusGrid variant="crosshair" className="max-w-[180px]" />
          </div>
        </div>
      </section>

      {/* 2. DEGREE PROGRAMS (Unboxed 2-Column Layout, thin rules) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-taupe">
          <div>
            <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
              UNIVERSITY AFFILIATED
            </div>
            <h2 className="text-3xl font-serif text-charcoal">
              Undergraduate Degrees (Santosh Degree College)
            </h2>
          </div>
          <span className="text-xs text-muted font-sans">
            Bangalore University • 3 Years (6 Semesters)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {degrees.map((deg: any) => (
            <div
              key={deg.code}
              className="space-y-4 border-t border-taupe pt-6 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="text-xs font-mono text-forest font-semibold uppercase tracking-wider">
                  Degree • {deg.code}
                </div>
                <h3 className="text-2xl font-serif text-charcoal font-medium">{deg.name}</h3>
                <p className="text-sm text-muted leading-relaxed font-sans">
                  {deg.overview}
                </p>

                {deg.electives && (
                  <div className="pt-1">
                    <span className="text-xs font-semibold text-charcoal block mb-1">
                      Electives:
                    </span>
                    <p className="text-xs text-muted font-sans">
                      {deg.electives.join(" • ")}
                    </p>
                  </div>
                )}

                {deg.careers && (
                  <div className="pt-1">
                    <span className="text-xs font-semibold text-charcoal block mb-1">
                      Career Pathways:
                    </span>
                    <p className="text-xs text-muted font-sans">
                      {deg.careers.join(" • ")}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-taupe/60 flex items-center justify-between">
                <span className="text-xs text-muted font-sans">{deg.duration}</span>
                <Link
                  href={deg.url}
                  className="link-underlined text-xs inline-flex items-center gap-1"
                >
                  <span>Syllabus & Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TEACHER TRAINING DIPLOMA (Solid Green Block per guide) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest text-white p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-semibold font-sans">
              <Award className="w-4 h-4" />
              <span>18 Distinctions & District Topper</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white leading-tight font-normal">
              {teacherEducation.title}
            </h2>
            <p className="text-sm text-white/80 leading-relaxed font-sans">
              Recognized by NCTE & Permitted by Govt of Karnataka. 2-year professional training program including 3 months full-time school internship, training candidates to shape the destiny of India in classrooms.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-white/85 font-sans">
              {teacherEducation.objectives.map((obj: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-gold">✓</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/20 pt-6 lg:pt-0 lg:pl-8 space-y-4">
            <div className="text-xs text-white/70 font-sans">Official Inquiries</div>
            <div className="text-sm font-mono text-gold break-all">
              {teacherEducation.email}
            </div>
            <Link
              href={teacherEducation.url}
              className="btn-primary bg-gold text-charcoal hover:bg-gold/90 text-xs font-semibold block text-center"
            >
              Explore D.Ed Syllabus →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. PRE-UNIVERSITY STREAMS (Unboxed grid with thin rules) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-taupe pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
              PRE-UNIVERSITY EDUCATION
            </div>
            <h2 className="text-3xl font-serif text-charcoal">
              {pucStreams.title}
            </h2>
          </div>
          <span className="text-xs text-muted font-sans">
            {pucStreams.board}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pucStreams.streams.map((st: any, idx: number) => (
            <div key={idx} className="space-y-1.5 border-t border-taupe pt-4">
              <div className="text-xs font-mono text-muted">Combination 0{idx + 1}</div>
              <h4 className="font-serif text-xl text-charcoal font-medium">{st.name}</h4>
              <p className="text-xs text-muted font-sans leading-relaxed">{st.subjects}</p>
            </div>
          ))}
        </div>

        <div className="py-6 border-t border-taupe flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-muted font-sans space-y-0.5">
            <span className="text-charcoal font-semibold block">
              Languages Offered: {pucStreams.languages.join(", ")}
            </span>
            <span>Comprehensive tutoring, lab sessions, and 90%+ pass record.</span>
          </div>
          <Link href={pucStreams.url} className="btn-primary text-xs py-2 px-4 shrink-0">
            <span>Fathima PU College Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 5. SCHOOL CURRICULUM OVERVIEW (Unboxed, thin divider rule) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-taupe pt-10 space-y-4">
          <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
            FOUNDATIONAL TO SECONDARY
          </div>
          <h2 className="text-3xl font-serif text-charcoal">
            Schooling Across Bangarpet & Bangalore
          </h2>
          <p className="text-sm text-muted leading-relaxed font-sans max-w-3xl">
            From playful sensory exploration in Nursery to rigorous SSLC State Board preparation in High School, our schools emphasize communicative English, science observation, digital literacy, outdoor games, and moral character.
          </p>
          <div className="pt-2">
            <Link href="/institutions" className="link-underlined text-xs">
              View All 8 School Campuses →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
