import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllInstitutions } from "@/lib/content";
import { ArrowRight } from "lucide-react";
import CrossGrid from "@/components/CrossGrid";

export default async function InstitutionsDirectoryPage() {
  const allInstitutions = await getAllInstitutions();

  const bangarpetList = allInstitutions.filter((i) => i.location === "Bangarpet");
  const bangaloreList = allInstitutions.filter((i) => i.location === "Bangalore");

  return (
    <div className="space-y-20 lg:space-y-28 pb-24">
      {/* Directory Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14">
        <div className="border-b border-taupe pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted mb-2">
              CAMPUS DIRECTORY
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif text-charcoal leading-tight">
              Our 11 Institutions
            </h1>
            <p className="text-sm sm:text-base text-muted mt-3 max-w-2xl leading-relaxed font-sans">
              Serving diverse learning needs from early childhood to post-graduate career preparation across seven campuses in Bangarpet and four in Bangalore.
            </p>
          </div>
          <div className="hidden md:block overflow-hidden">
            <CrossGrid
              variant="horizontal-strip"
              className="max-w-[320px] h-auto"
            />
          </div>
        </div>
      </section>

      {/* SECTION 1: BANGARPET CAMPUSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-taupe pb-3 flex items-baseline justify-between">
          <h2 className="text-2xl sm:text-3xl font-serif text-charcoal">
            Bangarpet Campuses (7 Institutions)
          </h2>
          <span className="text-xs text-muted font-sans hidden sm:inline">
            Central Kolar Road Campus
          </span>
        </div>

        <div className="divide-y divide-taupe">
          {bangarpetList.map((inst: any) => (
            <div
              key={inst.slug}
              className="py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center group"
            >
              {/* Photo */}
              <div className="md:col-span-4 relative h-52 sm:h-56 border border-taupe overflow-hidden bg-charcoal/5">
                <Image
                  src={inst.image || "/images/hero-students.jpg"}
                  alt={inst.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Details (No pill badges, clean two-tier text) */}
              <div className="md:col-span-8 space-y-3">
                <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
                  {inst.location} • {inst.level}
                  {inst.board && ` • ${inst.board}`}
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif text-charcoal group-hover:text-forest transition-colors font-medium">
                  <Link href={`/institutions/${inst.slug}`}>{inst.name}</Link>
                </h3>

                <p className="text-sm text-muted leading-relaxed font-sans max-w-2xl">
                  {inst.tagline ? `${inst.tagline}. ` : ""}
                  {inst.description}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-muted font-sans">
                    Office: {inst.phone}
                  </span>
                  <Link
                    href={`/institutions/${inst.slug}`}
                    className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-2"
                  >
                    <span>View Institution Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: BANGALORE CAMPUSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-taupe pb-3 flex items-baseline justify-between">
          <h2 className="text-2xl sm:text-3xl font-serif text-charcoal">
            Bangalore Campuses (4 Institutions)
          </h2>
          <span className="text-xs text-muted font-sans hidden sm:inline">
            Urban Branches
          </span>
        </div>

        <div className="divide-y divide-taupe">
          {bangaloreList.map((inst: any) => (
            <div
              key={inst.slug}
              className="py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center group"
            >
              {/* Photo */}
              <div className="md:col-span-4 relative h-52 sm:h-56 border border-taupe overflow-hidden bg-charcoal/5">
                <Image
                  src={inst.image || "/images/classroom-students.jpg"}
                  alt={inst.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Details */}
              <div className="md:col-span-8 space-y-3">
                <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
                  Bangalore Branch • {inst.level}
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif text-charcoal group-hover:text-forest transition-colors font-medium">
                  <Link href={`/institutions/${inst.slug}`}>{inst.name}</Link>
                </h3>

                <p className="text-sm text-muted leading-relaxed font-sans max-w-2xl">
                  {inst.tagline ? `${inst.tagline}. ` : ""}
                  {inst.description}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-muted font-sans">
                    Office: {inst.phone}
                  </span>
                  <Link
                    href={`/institutions/${inst.slug}`}
                    className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-2"
                  >
                    <span>View Institution Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
