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
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Layers,
} from "lucide-react";

function formatLabel(key: string): string {
  if (key === "slug" || key === "_id") return key;
  if (key.toLowerCase() === "cta") return "Call To Action";
  if (key.toLowerCase() === "url") return "URL / Link";
  if (key.toLowerCase() === "seo") return "SEO";
  if (key.toLowerCase() === "sgi") return "SGI";
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim();
}

function isLongText(key: string, val: any): boolean {
  if (typeof val !== "string") return false;
  if (val.length > 70 || val.includes("\n")) return true;
  const lower = key.toLowerCase();
  return (
    lower.includes("desc") ||
    lower.includes("lead") ||
    lower.includes("text") ||
    lower.includes("paragraph") ||
    lower.includes("quote") ||
    lower.includes("prayer") ||
    lower.includes("vision") ||
    lower.includes("aim") ||
    lower.includes("bio") ||
    lower.includes("message") ||
    lower.includes("address") ||
    lower.includes("caption") ||
    lower.includes("subject")
  );
}

// Generate an empty template for an array item based on existing items
function createItemTemplate(sampleItem: any): any {
  if (typeof sampleItem === "string") return "";
  if (typeof sampleItem === "number") return 0;
  if (typeof sampleItem === "boolean") return false;
  if (sampleItem && typeof sampleItem === "object" && !Array.isArray(sampleItem)) {
    const template: Record<string, any> = {};
    for (const [k, v] of Object.entries(sampleItem)) {
      template[k] = createItemTemplate(v);
    }
    return template;
  }
  return "";
}

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
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

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
  const handleFieldChange = (keyPath: (string | number)[], value: any) => {
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

  // Add item to array
  const handleArrayAdd = (keyPath: (string | number)[], template: any) => {
    if (!contentObj) return;
    const updated = JSON.parse(JSON.stringify(contentObj));
    let current = updated;
    for (let i = 0; i < keyPath.length; i++) {
      current = current[keyPath[i]];
    }
    if (Array.isArray(current)) {
      current.push(template);
    }
    setContentObj(updated);
    setRawJson(JSON.stringify(updated, null, 2));
  };

  // Remove item from array
  const handleArrayRemove = (keyPath: (string | number)[], index: number) => {
    if (!contentObj) return;
    const updated = JSON.parse(JSON.stringify(contentObj));
    let current = updated;
    for (let i = 0; i < keyPath.length; i++) {
      current = current[keyPath[i]];
    }
    if (Array.isArray(current)) {
      current.splice(index, 1);
    }
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

  const toggleCollapse = (sectionKey: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
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

  // Recursive Renderer for any value
  const renderValue = (
    keyName: string,
    value: any,
    path: (string | number)[],
    depth: number = 0
  ): React.ReactNode => {
    // 1. Null or undefined
    if (value === null || value === undefined) {
      return (
        <input
          type="text"
          value=""
          placeholder="None"
          onChange={(e) => handleFieldChange(path, e.target.value)}
          className="w-full text-sm p-2.5 bg-cream border border-taupe rounded-[4px] focus:outline-none focus:border-forest"
        />
      );
    }

    // 2. Boolean
    if (typeof value === "boolean") {
      return (
        <label className="inline-flex items-center gap-2 cursor-pointer mt-1">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleFieldChange(path, e.target.checked)}
            className="w-4 h-4 text-forest rounded border-taupe focus:ring-forest"
          />
          <span className="text-xs text-charcoal font-medium">
            {value ? "Enabled" : "Disabled"}
          </span>
        </label>
      );
    }

    // 3. Number
    if (typeof value === "number") {
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => handleFieldChange(path, Number(e.target.value))}
          className="w-full text-sm p-2.5 bg-cream border border-taupe rounded-[4px] focus:outline-none focus:border-forest"
        />
      );
    }

    // 4. String
    if (typeof value === "string") {
      if (isLongText(keyName, value)) {
        return (
          <textarea
            rows={Math.min(8, Math.max(3, Math.ceil(value.length / 80)))}
            value={value}
            onChange={(e) => handleFieldChange(path, e.target.value)}
            className="w-full text-sm p-2.5 bg-cream border border-taupe rounded-[4px] focus:outline-none focus:border-forest leading-relaxed font-sans"
          />
        );
      }
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => handleFieldChange(path, e.target.value)}
          className="w-full text-sm p-2.5 bg-cream border border-taupe rounded-[4px] focus:outline-none focus:border-forest font-sans"
        />
      );
    }

    // 5. Array
    if (Array.isArray(value)) {
      const isPrimitiveArray =
        value.length === 0 || typeof value[0] !== "object" || value[0] === null;

      const template =
        value.length > 0
          ? createItemTemplate(value[0])
          : typeof value[0] === "string"
          ? ""
          : { title: "", description: "" };

      return (
        <div className="space-y-3 pt-1">
          {value.length === 0 ? (
            <div className="p-3 bg-cream/60 border border-taupe text-xs text-muted italic">
              No items yet. Click below to add one.
            </div>
          ) : (
            <div className="space-y-2.5">
              {value.map((item: any, idx: number) => {
                const itemPath = [...path, idx];
                if (isPrimitiveArray) {
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="flex-1">
                        {typeof item === "string" && isLongText(keyName, item) ? (
                          <textarea
                            rows={2}
                            value={item}
                            onChange={(e) => handleFieldChange(itemPath, e.target.value)}
                            className="w-full text-sm p-2 bg-cream border border-taupe rounded-[4px] focus:outline-none focus:border-forest"
                          />
                        ) : (
                          <input
                            type={typeof item === "number" ? "number" : "text"}
                            value={item ?? ""}
                            onChange={(e) =>
                              handleFieldChange(
                                itemPath,
                                typeof item === "number" ? Number(e.target.value) : e.target.value
                              )
                            }
                            className="w-full text-sm p-2 bg-cream border border-taupe rounded-[4px] focus:outline-none focus:border-forest"
                          />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleArrayRemove(path, idx)}
                        title="Delete item"
                        className="p-2 text-muted hover:text-red-600 hover:bg-red-50 border border-taupe rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                }

                // Array of Objects (Cards)
                const itemLabel =
                  item.title ||
                  item.name ||
                  item.stream ||
                  item.label ||
                  item.category ||
                  item.value ||
                  `Item #${idx + 1}`;

                return (
                  <div
                    key={idx}
                    className="p-4 bg-cream/40 border border-taupe rounded-[4px] space-y-4"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-taupe/60">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-forest">
                          #{idx + 1}
                        </span>
                        <span className="text-sm font-medium text-charcoal">
                          {String(itemLabel)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleArrayRemove(path, idx)}
                        className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 px-2 py-1 border border-red-200 rounded transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(item).map(([subK, subV]) => (
                        <div
                          key={subK}
                          className={
                            isLongText(subK, subV) || Array.isArray(subV) || (typeof subV === "object" && subV !== null)
                              ? "sm:col-span-2 space-y-1"
                              : "space-y-1"
                          }
                        >
                          <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal/80">
                            {formatLabel(subK)}
                          </label>
                          {renderValue(subK, subV, [...itemPath, subK], depth + 1)}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <button
            type="button"
            onClick={() => handleArrayAdd(path, template)}
            className="inline-flex items-center gap-1.5 text-xs text-forest hover:text-forest-dark border border-dashed border-forest/50 hover:border-forest px-3 py-1.5 rounded-[4px] bg-forest/5 hover:bg-forest/10 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to {formatLabel(keyName)}</span>
          </button>
        </div>
      );
    }

    // 6. Object
    if (typeof value === "object") {
      return (
        <div className="p-4 sm:p-5 bg-white border border-taupe rounded-[4px] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(value).map(([subK, subV]) => (
              <div
                key={subK}
                className={
                  isLongText(subK, subV) || Array.isArray(subV) || (typeof subV === "object" && subV !== null)
                    ? "sm:col-span-2 space-y-1.5"
                    : "space-y-1.5"
                }
              >
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal">
                  {formatLabel(subK)}
                </label>
                {renderValue(subK, subV, [...path, subK], depth + 1)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  // Group top-level keys
  const topKeys = contentObj ? Object.keys(contentObj).filter((k) => k !== "_id" && k !== "slug") : [];
  const seoKeys = ["metaTitle", "metaDescription"];
  const generalKeys = ["name", "tagline", "location", "campus", "level", "board", "description", "phone", "email"].filter(
    (k) => topKeys.includes(k)
  );
  const sectionKeys = topKeys.filter((k) => !seoKeys.includes(k) && !generalKeys.includes(k));

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
            <span>All Content Form Fields</span>
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
            <span>Raw JSON Schema</span>
          </span>
        </button>
      </div>

      {/* 1. DYNAMIC FORM FIELDS TAB */}
      {activeTab === "fields" && contentObj && (
        <div className="space-y-8">
          {/* SECTION A: Page Meta & SEO */}
          {(contentObj.metaTitle !== undefined || contentObj.metaDescription !== undefined) && (
            <div className="border border-taupe bg-white p-6 rounded-[4px] space-y-4">
              <div className="flex items-center justify-between border-b border-taupe/60 pb-3">
                <div className="space-y-0.5">
                  <h2 className="font-serif text-lg text-charcoal font-medium">
                    Page Metadata & SEO
                  </h2>
                  <p className="text-xs text-muted">
                    Browser tab title and search engine summary for this page.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-1">
                {contentObj.metaTitle !== undefined && (
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={contentObj.metaTitle || ""}
                      onChange={(e) => handleFieldChange(["metaTitle"], e.target.value)}
                      className="w-full text-sm p-2.5 bg-cream border border-taupe rounded-[4px] focus:outline-none focus:border-forest"
                    />
                  </div>
                )}
                {contentObj.metaDescription !== undefined && (
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1">
                      Meta Description
                    </label>
                    <textarea
                      rows={3}
                      value={contentObj.metaDescription || ""}
                      onChange={(e) => handleFieldChange(["metaDescription"], e.target.value)}
                      className="w-full text-sm p-2.5 bg-cream border border-taupe rounded-[4px] focus:outline-none focus:border-forest"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION B: Top-Level General Info (if present) */}
          {generalKeys.length > 0 && (
            <div className="border border-taupe bg-white p-6 rounded-[4px] space-y-4">
              <div className="border-b border-taupe/60 pb-3">
                <h2 className="font-serif text-lg text-charcoal font-medium">
                  General Information
                </h2>
                <p className="text-xs text-muted">
                  Basic identifying details, contact phone, and institution descriptors.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {generalKeys.map((key) => (
                  <div
                    key={key}
                    className={isLongText(key, contentObj[key]) ? "sm:col-span-2 space-y-1" : "space-y-1"}
                  >
                    <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal">
                      {formatLabel(key)}
                    </label>
                    {renderValue(key, contentObj[key], [key])}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION C: Dynamic Page Sections & Lists */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-taupe pb-2">
              <h2 className="text-xl font-serif text-charcoal flex items-center gap-2">
                <Layers className="w-4 h-4 text-forest" />
                <span>Page Content Sections ({sectionKeys.length})</span>
              </h2>
              <span className="text-xs text-muted">
                All sections, cards, and repeated lists
              </span>
            </div>

            {sectionKeys.map((sectionKey) => {
              const secVal = contentObj[sectionKey];
              const isCollapsed = collapsedSections[sectionKey];
              const isArray = Array.isArray(secVal);
              const isObject = typeof secVal === "object" && secVal !== null && !isArray;

              return (
                <div
                  key={sectionKey}
                  className="border border-taupe bg-white rounded-[4px] overflow-hidden transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                >
                  {/* Section Header with Collapse Toggle */}
                  <div
                    onClick={() => toggleCollapse(sectionKey)}
                    className="p-4 sm:px-6 bg-tint/40 hover:bg-tint/70 border-b border-taupe cursor-pointer flex items-center justify-between select-none"
                  >
                    <div className="flex items-center gap-3">
                      {isCollapsed ? (
                        <ChevronRight className="w-4 h-4 text-muted" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted" />
                      )}
                      <div>
                        <h3 className="font-serif text-base sm:text-lg font-medium text-charcoal">
                          {formatLabel(sectionKey)}
                        </h3>
                        <span className="text-[11px] text-muted font-mono">
                          {isArray ? `${secVal.length} items (List)` : isObject ? "Structured Section" : typeof secVal}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs text-muted hover:text-charcoal underline">
                      {isCollapsed ? "Expand" : "Collapse"}
                    </span>
                  </div>

                  {/* Section Body */}
                  {!isCollapsed && (
                    <div className="p-4 sm:p-6 space-y-4">
                      {renderValue(sectionKey, secVal, [sectionKey])}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. FULL RAW JSON SCHEMA EDITOR TAB */}
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
            rows={26}
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
