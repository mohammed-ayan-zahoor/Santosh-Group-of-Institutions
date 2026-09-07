import React from "react";
import Link from "next/link";
import { getAllInquiries } from "@/lib/content";
import {
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Building,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

export default async function AdminInquiriesPage() {
  const inquiries = await getAllInquiries();

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
      </div>

      {inquiries.length === 0 ? (
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
                      <td className="p-4 text-xs text-muted max-w-xs">
                        {inq.message || <span className="italic text-muted/60">No message provided</span>}
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 text-xs text-forest bg-forest/10 px-2 py-0.5 rounded font-medium">
                          <CheckCircle className="w-3 h-3" />
                          <span>{inq.status || "New"}</span>
                        </span>
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
