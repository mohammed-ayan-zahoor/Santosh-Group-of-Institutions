import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getPageContent, getAllInstitutions } from "@/lib/content";
import CrossGrid from "@/components/CrossGrid";
import HeroCarousel from "@/components/HeroCarousel";
import { buildMetadata } from "@/lib/metadata";
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Users,
  HeartHandshake,
  Calendar,
  MapPin,
  ChevronRight,
} from "lucide-react";

export async function generateMetadata() {
  const content = await getPageContent("home");
  return buildMetadata({
    title: content?.metaTitle ?? "Santosh Group of Institutions | Est. 1977 | Bangarpet & Bangalore",
    description: content?.metaDescription ?? "11 institutions from Pre-Primary to Graduation in Bangarpet & Bangalore.",
    canonical: "https://santoshdedcollege.com",
    ogImage: "/images/campus-main-entrance.jpg",
  });
}

export default async function HomePage() {
  const content = await getPageContent("home");
  const allInstitutions = await getAllInstitutions();
  const previewInstitutions = allInstitutions.slice(0, 4);

  if (!content) {
    return <div className="p-12 text-center text-muted">Loading content...</div>;
  }

  const { hero, stats, aboutCallout, programsPreview, floatingTooltip, whySgi, highlights } = content;

  return (
    <div className="space-y-24 lg:space-y-32 pb-24">
      {/* 1. HERO SECTION — Completely unboxed floating layout matching EdmunHigh reference */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14">
        {/* Top Headline + Lead Row (No card wrapper, floats directly on cream background) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-10 sm:mb-12">
          {/* Left: Normal Sans Headline */}
          <div className="lg:col-span-7">
            <span className="eyebrow block mb-3">{hero.eyebrow}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-charcoal leading-[1.06]">
              {hero.tagline.includes("New World") ? (
                <>
                  Let&apos;s Imagine A <span className="font-extrabold text-charcoal">New World</span>
                </>
              ) : (
                hero.tagline
              )}
            </h1>
          </div>

          {/* Right: Lead text + CTA button pair */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-sm sm:text-base text-muted leading-relaxed font-sans">
              {hero.leadText}
            </p>
            <div className="flex items-center gap-3">
              <Link href={hero.primaryCta.url} className="btn-primary">
                <span>{hero.primaryCta.text}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={hero.secondaryCta.url}
                className="w-11 h-11 rounded-full border border-charcoal flex items-center justify-center text-charcoal hover:bg-tint transition-colors shrink-0"
                aria-label="View Admissions"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* High-Resolution Hero Campus Carousel — Static typography, cinematic photo carousel */}
        <HeroCarousel slides={hero.slides} />
      </section>

      {/* 2. STAT STRIP — Unboxed, horizontal border rules */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 py-8 border-y border-taupe">
          {stats.map((stat: any, idx: number) => (
            <div key={idx} className="space-y-1">
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted font-sans uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ASYMMETRIC EDITORIAL SECTION (Navy Header Block + Student Photos + Architectural Motif) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Column 1 (Left, 4 cols): Navy Header Card + Walking Students Photo */}
          <div className="md:col-span-4 flex flex-col justify-between gap-6">
            <div className="bg-charcoal text-white p-7 sm:p-9 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest text-white/70 font-semibold font-sans block mb-3">
                {aboutCallout.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white leading-tight">
                {aboutCallout.title}
              </h2>
            </div>
            <div className="relative h-56 sm:h-64 border border-taupe overflow-hidden bg-charcoal/5">
              <Image
                src="/images/students-walking.jpg"
                alt="Students walking together on campus"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Column 2 (Center, 4 cols): Tall Portrait Photo */}
          <div className="md:col-span-4 relative min-h-[420px] md:min-h-[500px] border border-taupe overflow-hidden bg-charcoal/5">
            <Image
              src="/images/student-portrait.jpg"
              alt="Santosh student holding books"
              fill
              className="object-cover object-top"
            />
          </div>

          {/* Column 3 (Right, 4 cols): Architectural Motif on top + Editorial Copy & CTA below */}
          <div className="md:col-span-4 flex flex-col justify-between py-1">
            {/* Architectural Broken-Line Motif (occupying ~50% vertical space) */}
            <div className="flex justify-start pt-1">
              <CrossGrid
                variant="staircase"
                className="w-full max-w-[240px] h-auto"
              />
            </div>

            {/* Editorial Copy + Learn More Link */}
            <div className="space-y-5 pt-8 md:pt-0">
              <p className="text-sm text-muted leading-relaxed font-sans max-w-sm">
                {aboutCallout.description}
              </p>
              <div>
                <Link
                  href={aboutCallout.learnMoreUrl}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal hover:underline underline-offset-4"
                >
                  <span>Learn More</span>
                  <span className="text-base leading-none">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom rule divider */}
        <div className="pt-6 mt-10 border-t border-taupe flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs text-muted">
            34+ years of academic distinction across 11 institutions.
          </p>
          <Link href="/about" className="link-underlined text-xs shrink-0">
            Read Chairman & Secretary Messages →
          </Link>
        </div>
      </section>

      {/* 4. 3-COLUMN FEATURE BAND (Exact EdmunHigh feature band in soft #EFF4F8 tint) */}
      <section className="w-full bg-tint py-16 sm:py-20 border-y border-taupe">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {whySgi.features.map((feat: any, idx: number) => {
              const icons = [
                <GraduationCap key="1" className="w-5 h-5 text-charcoal" />,
                <Users key="2" className="w-5 h-5 text-charcoal" />,
                <HeartHandshake key="3" className="w-5 h-5 text-charcoal" />,
              ];
              return (
                <div key={idx} className="space-y-4">
                  <div className="icon-circle">
                    {icons[idx % icons.length]}
                  </div>
                  <h3 className="text-xl font-sans font-bold text-charcoal">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. PROGRAMS SECTION (Plain Text List with Active Dash + Photo with Overlapping Navy Card) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Unboxed plain text rows */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="eyebrow block mb-2">{programsPreview.eyebrow}</span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-charcoal">
                {programsPreview.title}
              </h2>
            </div>

            <div className="divide-y divide-taupe pt-2">
              {programsPreview.items.map((item: any, idx: number) => {
                const isFirst = idx === 0;
                return (
                  <div
                    key={item.id}
                    className="py-3.5 transition-all group"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <Link
                        href={item.url}
                        className={`text-base sm:text-lg font-sans transition-colors ${
                          isFirst
                            ? "text-charcoal font-bold"
                            : "text-muted hover:text-charcoal"
                        }`}
                      >
                        {isFirst && <span className="mr-2 text-charcoal">—</span>}
                        {item.name}
                      </Link>
                      <span className="text-[11px] font-sans uppercase tracking-wider text-muted shrink-0">
                        {item.level}
                      </span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed mt-1 line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link href="/academics" className="link-underlined text-sm inline-flex items-center gap-1.5">
                <span>View Full Academic Streams & Electives</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: Group Study Photo with Overlapping Midnight Navy Card (#14283D) */}
          <div className="lg:col-span-6">
            <div className="relative border border-taupe bg-charcoal/5 h-80 sm:h-[440px] mb-8">
              <Image
                src="/images/students-group-study.jpg"
                alt="Students collaborating at study table"
                fill
                className="object-cover"
              />
              {/* Overlapping Navy Card matching reference */}
              <div className="floating-tooltip">
                <div className="text-[10px] uppercase tracking-widest font-semibold text-white/70 mb-1">
                  Excellence Record
                </div>
                <div className="font-sans text-base font-bold leading-snug text-white">
                  {floatingTooltip.title}
                </div>
                <div className="text-[11px] text-white/85 mt-1 font-sans">
                  {floatingTooltip.subtitle}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WIDE COMMUNITY BANNER — Sharp 0px corners with circular play button */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-64 sm:h-80 lg:h-96 border border-taupe overflow-hidden group">
          <Image
            src="/images/students-laptop.jpg"
            alt="Students working on technical projects"
            fill
            className="object-cover object-center"
          />
          {/* Centered Circular Play Button matching EdmunHigh reference */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white text-charcoal flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform cursor-pointer">
              <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[14px] border-l-charcoal ml-1" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. INSTITUTIONS DIRECTORY PREVIEW (Stacked Full-Width Bands) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-taupe">
          <div>
            <span className="eyebrow block mb-2">OUR CAMPUSES</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-charcoal">
              Institutions Across Bangarpet & Bangalore
            </h2>
          </div>
          <Link href="/institutions" className="btn-primary text-xs py-2 px-4 shrink-0 font-semibold">
            <span>View All 11 Institutions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Stacked Full-Width Bands */}
        <div className="divide-y divide-taupe">
          {previewInstitutions.map((inst: any) => (
            <div
              key={inst.slug}
              className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center group"
            >
              {/* Image thumbnail (~4px radius per guide) */}
              <div className="md:col-span-4 relative h-48 sm:h-52 border border-taupe rounded-[4px] overflow-hidden bg-charcoal/5">
                <Image
                  src={inst.image || "/images/campus-building-fathima.jpg"}
                  alt={inst.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Information */}
              <div className="md:col-span-8 space-y-2.5">
                <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
                  {inst.location} Campus • {inst.level}
                </div>
                <h3 className="text-2xl sm:text-3xl font-sans font-bold text-charcoal group-hover:opacity-80 transition-opacity">
                  <Link href={`/institutions/${inst.slug}`}>{inst.name}</Link>
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {inst.tagline ? `${inst.tagline}. ` : ""}
                  {inst.description}
                </p>
                <div className="pt-1">
                  <Link
                    href={`/institutions/${inst.slug}`}
                    className="link-underlined text-xs inline-flex items-center gap-1.5"
                  >
                    <span>Explore Programs & Facilities</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. HIGHLIGHTS & DIGNITARY VISITS (Unboxed list with thin horizontal rules + plus grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="eyebrow block">DISTINGUISHED MOMENTS</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-charcoal">
              Guests @ SGI & Milestones
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Archival visits by the Honorable State Education Minister, DIET Principal, and district administrative officers commending SGI&apos;s academic leadership.
            </p>
            <div className="pt-4 overflow-hidden">
              <CrossGrid
                variant="corner-step"
                className="max-w-[210px] h-auto"
              />
            </div>
          </div>

          <div className="lg:col-span-8 divide-y divide-taupe border-y border-taupe">
            {highlights.map((item: any, idx: number) => (
              <div key={idx} className="py-6 flex flex-col sm:flex-row gap-6 items-start group">
                <div className="relative w-full sm:w-44 h-28 border border-taupe rounded-[4px] overflow-hidden shrink-0 bg-charcoal/5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-1.5 flex-grow">
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-charcoal" />
                      {item.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-charcoal" />
                      {item.location}
                    </span>
                  </div>
                  <h3 className="text-lg font-sans font-bold text-charcoal group-hover:opacity-80 transition-opacity">
                    <Link href={item.url}>{item.title}</Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="self-end sm:self-center shrink-0">
                  <Link
                    href={item.url}
                    className="link-underlined text-xs inline-flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
