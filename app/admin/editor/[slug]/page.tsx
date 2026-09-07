"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Code2,
  FileText,
  RotateCcw,
} from "lucide-react";

export default function ContentEditorPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [contentObj, setContentObj] = useState<any>(null);
  const [rawJson, setRawJson] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"fields" | "json">("fields");

  // Load content for this slug
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/content?slug=${slug}`);
        const data = await res.json();
        if (data.success && data.content) {
          setContentObj(data.content);
          setRawJson(JSON.stringify(data.content, null, 2));
        } else {
          setErrorMsg(data.error || "Failed to load page content.");
        }
      } catch (e: any) {
        setErrorMsg("Error fetching content.");
      } finally {
        setLoading(false);
      }
    }
    if (slug) load();
  }, [slug]);

  // Synchronize when JSON textarea is edited
  const handleRawJsonChange = (val: string) => {
    setRawJson(val);
    try {
      const parsed = JSON.parse(val);
      setContentObj(parsed);
      setErrorMsg("");
    } catch (e) {
      // Invalid JSON typing in progress, allow user to keep typing
    }
  };

  // Synchronize field change to JSON
  const handleFieldChange = (keyPath: string[], value: any) => {
    if (!contentObj) return;
    const updated = JSON.parse(JSON.stringify(contentObj));
    let current = updated;
    for (let i = 0; i < keyPath.length - 1; i++) {
      current = current[keyPath[i]];
    }
    current[keyPath[keyPath.length - 1]] = value;
    setContentObj(updated);
    setRawJson(JSON.stringify(updated, null, 2));
  };

  // Format JSON helper
  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(rawJson);
      setRawJson(JSON.stringify(parsed, null, 2));
      setContentObj(parsed);
      setErrorMsg("");
    } catch (e: any) {
      setErrorMsg(`JSON Syntax Error: ${e.message}`);
    }
  };

  // Save to API (Persists to MongoDB + writes to JSON file)
  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    setErrorMsg("");

    let payload: any;
    try {
      payload = JSON.parse(rawJson);
    } catch (e: any) {
      setErrorMsg(`Cannot save: Invalid JSON format (${e.message})`);
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, content: payload }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 5000);
      } else {
        setErrorMsg(data.error || "Failed to persist content.");
      }
    } catch (e: any) {
      setErrorMsg("Network error saving content.");
    } finally {
      setSaving(false);
    }
  };

  const previewUrl =
    slug === "home"
      ? "/"
      : ["about", "academics", "campus-life", "student-life", "admissions", "gallery", "contact"].includes(slug)
      ? `/${slug}`
      : `/institutions/${slug}`;

  if (loading) {
    return <div className="p-12 text-center text-muted">Loading page editor...</div>;
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-taupe pb-6">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-charcoal transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-serif text-charcoal capitalize">
              Editing: {slug.replace(/-/g, " ")}
            </h1>
            <span className="text-xs font-mono bg-tint/80 border border-taupe px-2 py-0.5 text-charcoal">
              {slug}.json
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={previewUrl}
            target="_blank"
            className="text-xs text-muted hover:text-charcoal border border-taupe px-3 py-2 bg-white inline-flex items-center gap-1.5 rounded-[4px]"
          >
            <span>Preview Page</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-2"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? "Saving Changes..." : "Save & Sync to MongoDB"}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {saveSuccess && (
        <div className="p-4 bg-forest text-white border border-forest flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
            <span>Content successfully saved to MongoDB and written back to data/content/{slug}.json!</span>
          </div>
          <Link
            href={previewUrl}
            target="_blank"
            className="text-xs text-gold underline hover:text-white"
          >
            View Live Site →
          </Link>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 flex items-center gap-2 text-xs">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Mode Tabs */}
      <div className="flex items-center gap-2 border-b border-taupe">
        <button
          onClick={() => setActiveTab("fields")}
          className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors ${
            activeTab === "fields"
              ? "border-forest text-forest font-bold"
              : "border-transparent text-muted hover:text-charcoal"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>Quick Form Fields</span>
          </span>
        </button>
        <button
          onClick={() => setActiveTab("json")}
          className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors ${
            activeTab === "json"
              ? "border-forest text-forest font-bold"
              : "border-transparent text-muted hover:text-charcoal"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5" />
            <span>Full JSON Schema Editor</span>
          </span>
        </button>
      </div>

      {/* 1. QUICK FORM FIELDS TAB */}
      {activeTab === "fields" && contentObj && (
        <div className="border border-taupe p-6 sm:p-8 bg-white space-y-6">
          <div className="text-xs text-muted">
            Edit the most common page parameters below, or switch to the <strong>Full JSON Schema Editor</strong> to modify complex lists and structures.
          </div>

          {/* Meta Title & Description */}
          <div className="grid grid-cols-1 gap-4 pt-2">
            {contentObj.metaTitle !== undefined && (
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1">
                  Meta Title (SEO & Browser Tab)
                </label>
                <input
                  type="text"
                  value={contentObj.metaTitle || ""}
                  onChange={(e) => handleFieldChange(["metaTitle"], e.target.value)}
                  className="w-full text-sm p-2.5 bg-cream border border-taupe rounded-[4px]"
                />
              </div>
            )}

            {contentObj.metaDescription !== undefined && (
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1">
                  Meta Description
                </label>
                <input
                  type="text"
                  value={contentObj.metaDescription || ""}
                  onChange={(e) => handleFieldChange(["metaDescription"], e.target.value)}
                  className="w-full text-sm p-2.5 bg-cream border border-taupe rounded-[4px]"
                />
              </div>
            )}
          </div>

          {/* Hero / Intro Fields */}
          {contentObj.hero && (
            <div className="border-t border-taupe pt-6 space-y-4">
              <h3 className="font-serif text-lg text-charcoal">Hero Section</h3>
              {contentObj.hero.tagline !== undefined && (
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1">
                    Hero Tagline
                  </label>
                  <input
                    type="text"
                    value={contentObj.hero.tagline || ""}
                    onChange={(e) => handleFieldChange(["hero", "tagline"], e.target.value)}
                    className="w-full text-sm p-2.5 bg-cream border border-taupe rounded-[4px]"
                  />
                </div>
              )}
              {contentObj.hero.leadText !== undefined && (
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1">
                    Hero Lead Text
                  </label>
                  <textarea
                    rows={3}
                    value={contentObj.hero.leadText || ""}
                    onChange={(e) => handleFieldChange(["hero", "leadText"], e.target.value)}
                    className="w-full text-sm p-2.5 bg-cream border border-taupe rounded-[4px]"
                  />
                </div>
              )}
            </div>
          )}

          {/* Intro Fields */}
          {contentObj.intro && (
            <div className="border-t border-taupe pt-6 space-y-4">
              <h3 className="font-serif text-lg text-charcoal">Introduction</h3>
              {contentObj.intro.title !== undefined && (
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1">
                    Heading Title
                  </label>
                  <input
                    type="text"
                    value={contentObj.intro.title || ""}
                    onChange={(e) => handleFieldChange(["intro", "title"], e.target.value)}
                    className="w-full text-sm p-2.5 bg-cream border border-taupe rounded-[4px]"
                  />
                </div>
              )}
              {contentObj.intro.lead !== undefined && (
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1">
                    Lead Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={contentObj.intro.lead || ""}
                    onChange={(e) => handleFieldChange(["intro", "lead"], e.target.value)}
                    className="w-full text-sm p-2.5 bg-cream border border-taupe rounded-[4px]"
                  />
                </div>
              )}
            </div>
          )}

          {/* Institution Specific Fields */}
          {contentObj.tagline !== undefined && (
            <div className="border-t border-taupe pt-6 space-y-4">
              <h3 className="font-serif text-lg text-charcoal">Institution Highlights</h3>
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1">
                  Motto / Tagline
                </label>
                <input
                  type="text"
                  value={contentObj.tagline || ""}
                  onChange={(e) => handleFieldChange(["tagline"], e.target.value)}
                  className="w-full text-sm p-2.5 bg-cream border border-taupe rounded-[4px]"
                />
              </div>
              {contentObj.description !== undefined && (
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={contentObj.description || ""}
                    onChange={(e) => handleFieldChange(["description"], e.target.value)}
                    className="w-full text-sm p-2.5 bg-cream border border-taupe rounded-[4px]"
                  />
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contentObj.phone !== undefined && (
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={contentObj.phone || ""}
                      onChange={(e) => handleFieldChange(["phone"], e.target.value)}
                      className="w-full text-sm p-2.5 bg-cream border border-taupe rounded-[4px]"
                    />
                  </div>
                )}
                {contentObj.email !== undefined && (
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1">
                      Email Address
                    </label>
                    <input
                      type="text"
                      value={contentObj.email || ""}
                      onChange={(e) => handleFieldChange(["email"], e.target.value)}
                      className="w-full text-sm p-2.5 bg-cream border border-taupe rounded-[4px]"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. FULL JSON SCHEMA EDITOR TAB */}
      {activeTab === "json" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>Directly edit the full structured JSON for this page:</span>
            <button
              onClick={handleFormatJson}
              className="link-underlined text-xs inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Format & Validate JSON</span>
            </button>
          </div>

          <textarea
            value={rawJson}
            onChange={(e) => handleRawJsonChange(e.target.value)}
            rows={24}
            className="w-full p-4 font-mono text-xs bg-charcoal text-tint border border-taupe rounded-[4px] focus:outline-none focus:ring-1 focus:ring-forest leading-relaxed"
            spellCheck={false}
          />
        </div>
      )}

      {/* Bottom Save Bar */}
      <div className="flex items-center justify-between border-t border-taupe pt-6">
        <span className="text-xs text-muted">
          All modifications are saved to MongoDB and mirrored in <code className="text-charcoal font-semibold">{slug}.json</code>.
        </span>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary text-xs py-2 px-6 inline-flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save & Publish Changes"}</span>
        </button>
      </div>
    </div>
  );
}
