"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Phone,
  Mail,
  ArrowLeft,
  CheckCircle,
  RotateCcw,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      if (data.success && Array.isArray(data.inquiries)) {
        setInquiries(data.inquiries);
      } else {
        setFeedbackMsg({ type: "error", text: data.error || "Failed to load inquiries." });
      }
    } catch (err: any) {
      setFeedbackMsg({ type: "error", text: "Network error loading inquiries." });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setFeedbackMsg(null);
    fetchInquiries();
  };

  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete the inquiry from "${name}"?`);
    if (!confirmed) return;

    setDeletingId(id);
    setFeedbackMsg(null);

    try {
      const res = await fetch(`/api/admin/inquiries?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setInquiries((prev) => prev.filter((inq) => inq._id !== id));
        setFeedbackMsg({ type: "success", text: `Inquiry from "${name}" was deleted.` });
        setTimeout(() => setFeedbackMsg(null), 4000);
      } else {
        setFeedbackMsg({ type: "error", text: data.error || "Failed to delete inquiry." });
      }
    } catch (err: any) {
      setFeedbackMsg({ type: "error", text: "Network error deleting inquiry: " + err.message });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="border-b border-taupe pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-charcoal transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-serif text-charcoal">
              Admissions & Contact Inquiries
            </h1>
            <span className="text-xs bg-forest text-white px-2.5 py-0.5 rounded-full font-sans">
              {inquiries.length} Total
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 text-xs text-forest hover:text-forest-dark border border-taupe px-3 py-1.5 bg-white rounded-[4px] transition-colors cursor-pointer select-none"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
            <span>{refreshing ? "Refreshing..." : "Refresh Inbox"}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {feedbackMsg && (
        <div
          className={`p-4 border flex items-center gap-2 text-xs ${
            feedbackMsg.type === "success"
              ? "bg-forest text-white border-forest"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {feedbackMsg.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {loading ? (
        <div className="border border-taupe p-12 bg-white text-center space-y-2 text-muted">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-forest" />
          <p className="text-xs">Loading inquiries...</p>
        </div>
      ) : inquiries.length === 0 ? (
        <div className="border border-taupe p-12 bg-white text-center space-y-3">
          <MessageSquare className="w-10 h-10 text-muted mx-auto" />
          <h3 className="font-serif text-xl text-charcoal">No Inquiries Yet</h3>
          <p className="text-xs text-muted max-w-sm mx-auto">
            Inquiries submitted by prospective parents and students via the public contact and admission forms will appear here in real time.
          </p>
          <div className="pt-2">
            <Link href="/admissions" target="_blank" className="link-underlined text-xs">
              Test Admission Form on Public Site →
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="overflow-x-auto border border-taupe bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-tint/70 border-b border-taupe text-xs uppercase tracking-wider font-semibold text-charcoal font-sans">
                  <th className="p-4">Date</th>
                  <th className="p-4">Parent / Student</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Institution Interest</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-taupe text-xs sm:text-sm text-muted">
                {inquiries.map((inq: any, idx: number) => {
                  const dateStr = inq.createdAt
                    ? new Date(inq.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Recent";

                  const isDeleting = deletingId === inq._id;

                  return (
                    <tr key={inq._id || idx} className="hover:bg-tint/20 transition-colors">
                      <td className="p-4 text-xs font-mono text-muted whitespace-nowrap">
                        {dateStr}
                      </td>
                      <td className="p-4 font-serif text-charcoal font-medium">
                        {inq.name}
                      </td>
                      <td className="p-4 space-y-1">
                        <a
                          href={`tel:${inq.phone}`}
                          className="flex items-center gap-1.5 font-medium text-forest hover:underline whitespace-nowrap"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{inq.phone}</span>
                        </a>
                        {inq.email && (
                          <a
                            href={`mailto:${inq.email}`}
                            className="flex items-center gap-1.5 text-xs text-muted hover:underline"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>{inq.email}</span>
                          </a>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="text-xs bg-tint px-2 py-0.5 border border-taupe text-charcoal font-medium">
                          {inq.institution}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-muted max-w-xs leading-relaxed">
                        {inq.message || <span className="italic text-muted/60">No message provided</span>}
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 text-xs text-forest bg-forest/10 px-2 py-0.5 rounded font-medium">
                          <CheckCircle className="w-3 h-3" />
                          <span>{inq.status || "New"}</span>
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(inq._id, inq.name)}
                          disabled={isDeleting}
                          title="Delete inquiry"
                          className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 px-2.5 py-1.5 border border-red-200 rounded transition-colors cursor-pointer"
                        >
                          {isDeleting ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-red-600" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
