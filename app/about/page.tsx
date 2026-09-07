import React from "react";
import Image from "next/image";
import { getPageContent } from "@/lib/content";
import CrossGrid from "@/components/CrossGrid";
import { Quote, Sparkles } from "lucide-react";

export default async function AboutPage() {
  const content = await getPageContent("about");

  if (!content) {
    return <div className="p-12 text-center text-muted">Loading...</div>;
  }

  const { intro, visionAim, kalamBlock, chairmanMessage, secretaryMessage, qualityFaculty, spiritOfCollege } = content;

  return (
    <div className="space-y-24 lg:space-y-32 pb-24">
      {/* 1. HERO / INTRODUCTION (Unboxed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14">
        <div className="border-b border-taupe pb-12">
          <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted mb-3">
            {intro.eyebrow}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-charcoal leading-[1.08] tracking-tight">
                {intro.title}
              </h1>
            </div>
            <div className="lg:col-span-5 space-y-5 text-sm sm:text-base text-muted leading-relaxed font-sans">
              <p>{intro.paragraph1}</p>
              <p>{intro.paragraph2}</p>
              <div className="pt-2 italic font-serif text-charcoal text-base">
                "{intro.quote}"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DR. KALAM VALUES CALLOUT (Solid Forest Green Callout + Portrait, 0px radius) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-8 bg-forest text-white p-8 sm:p-12 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-white/70 font-semibold font-sans">
                  Guiding Philosophy & Inspiration
                </span>
                <Quote className="w-8 h-8 text-white/40" />
              </div>
              <p className="font-sans text-2xl sm:text-3xl text-white font-bold leading-relaxed">
                &ldquo;{kalamBlock.quote}&rdquo;
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/20 flex items-center justify-between">
              <div>
                <div className="font-sans text-lg text-white font-bold">
                  {kalamBlock.author}
                </div>
                <div className="text-xs text-white/80 font-sans">
                  {kalamBlock.designation}
                </div>
              </div>
              <CrossGrid
                variant="corner-step"
                cellSize={36}
                gap={9}
                strokeWidth={1.75}
                solidColor="#FFFFFF"
                ghostColor="rgba(255, 255, 255, 0.2)"
                anchorCorner="bottom-right"
              />
            </div>
          </div>

          <div className="lg:col-span-4 relative h-72 lg:h-auto border border-taupe overflow-hidden bg-charcoal/5">
            <Image
              src={kalamBlock.image}
              alt={kalamBlock.author}
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* 3. VISION & AIM (Unboxed, thin divider rules) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12 border-y border-taupe">
          <div className="space-y-3">
            <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
              FOUNDATIONAL PURPOSE
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-charcoal">Our Vision</h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed font-sans pt-1">
              {visionAim.vision}
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
              LEARNING OBJECTIVES
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-charcoal">Our Aim</h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed font-sans pt-1">
              {visionAim.aim}
            </p>
          </div>
        </div>
      </section>

      {/* 4. LEADERSHIP MESSAGES: CHAIRMAN & SECRETARY (Unboxed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Chairman's Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pb-16 border-b border-taupe">
          <div className="lg:col-span-4 space-y-3">
            <div className="relative h-80 border border-taupe overflow-hidden bg-charcoal/5">
              <Image
                src={chairmanMessage.image}
                alt={chairmanMessage.name}
                fill
                className="object-cover object-top"
              />
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-charcoal">
                {chairmanMessage.name}
              </h3>
              <p className="text-xs uppercase tracking-wider text-muted font-sans mt-0.5">
                {chairmanMessage.role}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
              FROM THE DESK OF THE CHAIRMAN
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-charcoal">
              A Center of Academic Excellence
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-muted leading-relaxed font-sans pt-2">
              {chairmanMessage.text.map((p: string, idx: number) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Secretary's Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-8 space-y-4 order-2 lg:order-1">
            <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
              FROM THE DESK OF THE SECRETARY
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-charcoal">
              Transforming Good to Better and Best
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-muted leading-relaxed font-sans pt-2">
              {secretaryMessage.text.map((p: string, idx: number) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-3 order-1 lg:order-2">
            <div className="relative h-80 border border-taupe overflow-hidden bg-charcoal/5">
              <Image
                src={secretaryMessage.image}
                alt={secretaryMessage.name}
                fill
                className="object-cover object-top"
              />
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-charcoal">
                {secretaryMessage.name}
              </h3>
              <p className="text-xs uppercase tracking-wider text-muted font-sans mt-0.5">
                {secretaryMessage.role}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. QUALITY FACULTY (Unboxed, two photos floating directly on cream) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-taupe pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
              {qualityFaculty.eyebrow}
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-charcoal">
              {qualityFaculty.title}
            </h2>
            <p className="text-sm text-muted leading-relaxed font-sans max-w-2xl">
              {qualityFaculty.description}
            </p>
          </div>
          <div className="font-serif italic text-forest text-sm shrink-0">
            "{qualityFaculty.quote}"
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="relative h-72 border border-taupe overflow-hidden">
            <Image
              src={qualityFaculty.meetingImage}
              alt="Faculty discussion meeting"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-72 border border-taupe overflow-hidden">
            <Image
              src={qualityFaculty.groupImage}
              alt="Faculty and student cohort"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 6. SPIRIT OF THE COLLEGE (Unboxed centered prayer pledge) */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-10 border-t border-taupe space-y-4">
        <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
          INSTITUTIONAL PLEDGE
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-charcoal">
          {spiritOfCollege.title}
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-charcoal/90 leading-relaxed max-w-2xl mx-auto">
          "{spiritOfCollege.prayer}"
        </p>
      </section>
    </div>
  );
}
