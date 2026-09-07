import React from "react";
import Link from "next/link";
import { getAllInstitutions, getAllInquiries } from "@/lib/content";
import {
  FileEdit,
  Building,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Database,
  ExternalLink,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const institutions = await getAllInstitutions();
  const inquiries = await getAllInquiries();

  const mainPages = [
    { slug: "home", name: "Home Page", file: "data/content/home.json", url: "/" },
    { slug: "about", name: "About Us", file: "data/content/about.json", url: "/about" },
    { slug: "academics", name: "Academics Hub", file: "data/content/academics.json", url: "/academics" },
    { slug: "campus-life", name: "Campus & Infrastructure", file: "data/content/campus-life.json", url: "/campus-life" },
    { slug: "student-life", name: "Student Life & Rules", file: "data/content/student-life.json", url: "/student-life" },
    { slug: "admissions", name: "Admissions & Procedure", file: "data/content/admissions.json", url: "/admissions" },
    { slug: "gallery", name: "Campus Gallery", file: "data/content/gallery.json", url: "/gallery" },
    { slug: "contact", name: "Contact & Directory", file: "data/content/contact.json", url: "/contact" },
  ];

  const hasMongo = !!process.env.MONGODB_URI;

  return (
    <div className="space-y-10">
      {/* Dashboard Header */}
      <div className="border-b border-taupe pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="eyebrow block mb-1">CONTENT MANAGEMENT SYSTEM</span>
          <h1 className="text-3xl font-serif text-charcoal">
            SGI Content Dashboard
          </h1>
          <p className="text-xs text-muted mt-1">
            Manage site content synchronized across MongoDB and individual page JSON files.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-taupe text-xs rounded-sm">
            <Database className="w-3.5 h-3.5 text-forest" />
            <span className="text-charcoal font-medium">
              {hasMongo ? "MongoDB Active" : "Local JSON Engine Active"}
            </span>
          </div>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="border border-taupe p-6 bg-white space-y-1">
          <div className="text-xs uppercase tracking-wider font-semibold text-muted">
            Total Pages Managed
          </div>
          <div className="font-serif text-3xl font-medium text-charcoal">
            {mainPages.length + institutions.length} Pages
          </div>
          <p className="text-xs text-muted">8 Main + 11 Institutions</p>
        </div>

        <div className="border border-taupe p-6 bg-white space-y-1">
          <div className="text-xs uppercase tracking-wider font-semibold text-muted">
            Student / Parent Inquiries
          </div>
          <div className="font-serif text-3xl font-medium text-forest">
            {inquiries.length} Inquiries
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs text-gold underline block hover:text-charcoal"
          >
            Review Inquiries Inbox →
          </Link>
        </div>

        <div className="border border-taupe p-6 bg-tint/60 space-y-1">
          <div className="text-xs uppercase tracking-wider font-semibold text-muted">
            Dual-Layer Storage
          </div>
          <div className="text-sm font-medium text-charcoal pt-1">
            MongoDB Collection + Per-Page JSON
          </div>
          <p className="text-xs text-muted">
            Writes persist to database and update <code className="text-[11px]">data/content/*.json</code>.
          </p>
        </div>
      </div>

      {/* SECTION 1: CORE WEBSITE PAGES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-taupe pb-3">
          <h2 className="text-xl font-serif text-charcoal">
            Core Website Pages (8)
          </h2>
          <span className="text-xs text-muted">Direct JSON Schema Edit</span>
        </div>

        <div className="border border-taupe divide-y divide-taupe bg-white">
          {mainPages.map((page) => (
            <div
              key={page.slug}
              className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-tint/20 transition-colors"
            >
              <div className="space-y-0.5">
                <div className="font-serif text-lg text-charcoal font-medium">
                  {page.name}
                </div>
                <div className="text-xs text-muted font-mono">
                  {page.file}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href={page.url}
                  target="_blank"
                  className="text-xs text-muted hover:text-charcoal inline-flex items-center gap-1"
                >
                  <span>Preview</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <Link
                  href={`/admin/editor/${page.slug}`}
                  className="btn-primary text-xs py-1.5 px-3.5 inline-flex items-center gap-1.5"
                >
                  <FileEdit className="w-3 h-3" />
                  <span>Edit Content</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: 11 INSTITUTIONS PAGES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-taupe pb-3">
          <h2 className="text-xl font-serif text-charcoal">
            Dedicated Institution Pages (11)
          </h2>
          <span className="text-xs text-muted">Bangarpet & Bangalore Campuses</span>
        </div>

        <div className="border border-taupe divide-y divide-taupe bg-white">
          {institutions.map((inst) => (
            <div
              key={inst.slug}
              className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-tint/20 transition-colors"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-forest bg-tint px-2 py-0.5 border border-taupe">
                    {inst.location}
                  </span>
                  <span className="font-serif text-lg text-charcoal font-medium">
                    {inst.name}
                  </span>
                </div>
                <div className="text-xs text-muted font-mono">
                  data/content/institutions/{inst.slug}.json
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href={`/institutions/${inst.slug}`}
                  target="_blank"
                  className="text-xs text-muted hover:text-charcoal inline-flex items-center gap-1"
                >
                  <span>Preview</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <Link
                  href={`/admin/editor/${inst.slug}`}
                  className="btn-primary text-xs py-1.5 px-3.5 inline-flex items-center gap-1.5"
                >
                  <FileEdit className="w-3 h-3" />
                  <span>Edit Institution</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
