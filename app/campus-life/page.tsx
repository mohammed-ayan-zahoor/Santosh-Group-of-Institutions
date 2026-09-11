import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getPageContent } from "@/lib/content";
import DecorativePlusGrid from "@/components/DecorativePlusGrid";
import { buildMetadata } from "@/lib/metadata";
import { ArrowRight } from "lucide-react";

export async function generateMetadata() {
  const content = await getPageContent("campus-life");
  return buildMetadata({
    title: content?.metaTitle ?? "Campus & Infrastructure | Santosh Group of Institutions",
    description: content?.metaDescription ?? "Labs, library, hostel, bus fleet, and sports grounds across Santosh Group campuses in Bangarpet and Bangalore.",
    canonical: "https://santoshdedcollege.com/campus-life",
  });
}

export default async function CampusLifePage() {
  const content = await getPageContent("campus-life");

  if (!content) {
    return <div className="p-12 text-center text-muted">Loading...</div>;
  }

  const { intro, facilities, gallery } = content;

  return (
    <div className="space-y-24 lg:space-y-32 pb-24">
      {/* 1. HERO (Unboxed) */}
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
            <DecorativePlusGrid variant="constellation" className="max-w-[210px]" />
          </div>
        </div>
      </section>

      {/* 2. THE 14 NUMBERED FACILITIES (Unboxed Editorial List, NO icon container circles) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-taupe pb-4">
          <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
            OFFICIAL INFRASTRUCTURE
          </div>
          <h2 className="text-3xl font-serif text-charcoal">
            14 Key Campus Amenities & Learning Spaces
          </h2>
        </div>

        {/* Numbered unboxed list with thin divider lines */}
        <div className="divide-y divide-taupe">
          {facilities.map((fac: any) => (
            <div
              key={fac.num}
              className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start group"
            >
              {/* Number */}
              <div className="md:col-span-2">
                <span className="font-serif text-3xl sm:text-4xl font-medium text-charcoal/30 group-hover:text-gold transition-colors font-mono">
                  {fac.num}
                </span>
              </div>

              {/* Title */}
              <div className="md:col-span-4">
                <h3 className="font-serif text-xl sm:text-2xl text-charcoal group-hover:text-forest transition-colors font-medium">
                  {fac.title}
                </h3>
              </div>

              {/* Description */}
              <div className="md:col-span-6">
                <p className="text-sm text-muted leading-relaxed font-sans max-w-2xl">
                  {fac.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CAMPUS PHOTO GALLERY STRIP (Sharp, unboxed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-taupe pb-4">
          <div>
            <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
              VISUAL TOUR
            </div>
            <h2 className="text-3xl font-serif text-charcoal">
              Campus Facilities in Pictures
            </h2>
          </div>
          <Link href="/gallery" className="link-underlined text-xs">
            View Historical Archive Photos →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gallery.map((item: any, idx: number) => (
            <div key={idx} className="space-y-2 group">
              <div className="relative h-64 border border-taupe overflow-hidden bg-charcoal/5">
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-xs text-muted font-sans pt-1">
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SAFE TRANSPORT & HOSTEL SUMMARY CALLOUT (Solid Green Anchor Block) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest text-white p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-serif text-white font-normal">
              Residential Hostels & Transport Network
            </h3>
            <p className="text-sm text-white/80 leading-relaxed font-sans">
              Separate hostels for boys and girls arranged by Santosh institutions with 24-hour water supply, hot water facilities, and reliable power backup. A dedicated fleet of well-maintained institution buses safely transports students from Bangarpet, KGF, Kolar, and surrounding towns daily.
            </p>
          </div>
          <div className="space-y-3 sm:text-right">
            <div className="text-xs text-gold uppercase tracking-wider font-semibold font-sans">
              Hostel & Transport Inquiries
            </div>
            <div className="text-lg font-serif">
              Central Office: 09448106902 / 09886152151
            </div>
            <Link
              href="/contact"
              className="btn-primary bg-gold text-charcoal hover:bg-gold/90 text-xs font-semibold inline-flex"
            >
              Contact Transport Office →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
