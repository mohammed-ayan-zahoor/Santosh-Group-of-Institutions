"use client";

import React, { useState } from "react";
import DecorativePlusGrid from "@/components/DecorativePlusGrid";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    institution: "Central Office",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || "Failed to submit message.");
      }
    } catch (err: any) {
      setErrorMsg("An error occurred. Please call our central office directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const institutionsList = [
    { name: "Santosh Nursery School", location: "Bangarpet", level: "Pre-Primary", phone: "09448106902" },
    { name: "Santosh Primary School", location: "Bangarpet", level: "Primary", phone: "09448106902" },
    { name: "Santosh Higher Primary School", location: "Bangarpet", level: "Middle School", phone: "09448106902" },
    { name: "Santosh High School", location: "Bangarpet", level: "Secondary (SSLC)", phone: "09448106902" },
    { name: "Fathima PU College", location: "Bangarpet", level: "Pre-University (Arts, Comm, Sci)", phone: "09448106902" },
    { name: "Santosh Degree College", location: "Bangarpet", level: "Undergraduate (BBM, BCA, B.Com, BA)", phone: "09448106902" },
    { name: "Santosh D.Ed (T.C.H) College", location: "Bangarpet", level: "Teacher Training Diploma", phone: "09886152151" },
    { name: "Santosh Nursery School", location: "Bangalore", level: "Pre-Primary", phone: "09886152151" },
    { name: "Santosh Primary School", location: "Bangalore", level: "Primary", phone: "09886152151" },
    { name: "Santosh Higher Primary School", location: "Bangalore", level: "Middle School", phone: "09886152151" },
    { name: "Santosh High School", location: "Bangalore", level: "Secondary (SSLC)", phone: "09886152151" },
  ];

  return (
    <div className="space-y-24 lg:space-y-32 pb-24">
      {/* 1. HERO (Unboxed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14">
        <div className="border-b border-taupe pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted mb-2">
              GET IN TOUCH
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-charcoal leading-tight tracking-tight font-medium">
              Contact Santosh Group
            </h1>
            <p className="text-sm sm:text-base text-muted mt-3 max-w-2xl leading-relaxed font-sans">
              Reach out to our central administrative office on Kolar Road, Bangarpet or view direct contact lines for all 11 institutions.
            </p>
          </div>
          <div className="hidden md:block">
            <DecorativePlusGrid variant="crosshair" className="max-w-[180px]" />
          </div>
        </div>
      </section>

      {/* 2. CENTRAL OFFICE & INQUIRY FORM (Unboxed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Office Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
                HEADQUARTERS
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-charcoal font-medium">
                Central Administrative Office
              </h2>

              <div className="space-y-4 text-sm text-muted font-sans border-t border-taupe pt-4">
                <div>
                  <strong className="text-charcoal block mb-1">Campus Address:</strong>
                  <span>
                    No. 1169, Kolar Road (Near Canara Bank), Bangarpet – 563 114, Kolar District, Karnataka
                  </span>
                </div>

                <div>
                  <strong className="text-charcoal block mb-1">Telephone Contacts:</strong>
                  <div className="space-y-1">
                    <a href="tel:09448106902" className="block text-charcoal font-medium hover:text-gold">
                      09448106902
                    </a>
                    <a href="tel:09886152151" className="block text-charcoal hover:text-gold">
                      09886152151
                    </a>
                  </div>
                </div>

                <div>
                  <strong className="text-charcoal block mb-1">Official Emails:</strong>
                  <a
                    href="mailto:santoshgroupofinstitutions@gmail.com"
                    className="hover:underline text-forest block break-all font-mono text-xs"
                  >
                    santoshgroupofinstitutions@gmail.com
                  </a>
                  <span className="text-xs text-muted block mt-1 font-mono">
                    D.Ed: santoshdedcollege@gmail.com
                  </span>
                </div>

                <div>
                  <strong className="text-charcoal block mb-1">Working Hours:</strong>
                  <span>Monday – Saturday: 9:00 AM – 5:00 PM (Closed on Sundays)</span>
                </div>
              </div>
            </div>

            {/* Directions note */}
            <div className="border-t border-taupe pt-6 space-y-2">
              <h3 className="font-serif text-lg text-charcoal font-medium">
                Campus Location & Accessibility
              </h3>
              <p className="text-xs text-muted leading-relaxed font-sans">
                Located on Kolar Road right near Canara Bank in Bangarpet town. Connected by frequent bus routes and railway trains from KGF, Kolar, and Bangalore.
              </p>
              <a
                href="https://maps.google.com/?q=Bangarpet+Kolar+Road"
                target="_blank"
                rel="noreferrer"
                className="link-underlined text-xs inline-block pt-1"
              >
                View on Google Maps ↗
              </a>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-taupe lg:pl-12 space-y-6">
            <div>
              <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
                ONLINE MESSAGE
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-charcoal">
                Send a Message to the Administration
              </h2>
              <p className="text-xs text-muted mt-1 font-sans">
                Have a question regarding admissions, hostels, or transport? Leave a message below.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-forest text-white space-y-3 text-center">
                <CheckCircle2 className="w-12 h-12 text-gold mx-auto" />
                <h4 className="font-serif text-2xl">Message Received</h4>
                <p className="text-sm text-white/80 font-sans">
                  Thank you, {formState.name}. We have logged your inquiry and our office will follow up with you at {formState.phone}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs underline text-gold pt-2 block mx-auto"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1 font-sans">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full text-sm p-3 bg-white border border-taupe rounded-[4px] focus:outline-none focus:border-forest"
                    placeholder="e.g. Anand Gowda"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1 font-sans">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full text-sm p-3 bg-white border border-taupe rounded-[4px] focus:outline-none focus:border-forest"
                      placeholder="e.g. 09448106902"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1 font-sans">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full text-sm p-3 bg-white border border-taupe rounded-[4px] focus:outline-none focus:border-forest"
                      placeholder="e.g. anand@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1 font-sans">
                    Campus Target
                  </label>
                  <select
                    value={formState.institution}
                    onChange={(e) => setFormState({ ...formState, institution: e.target.value })}
                    className="w-full text-sm p-3 bg-white border border-taupe rounded-[4px] focus:outline-none focus:border-forest"
                  >
                    <option value="Central Office">Central Office (General Inquiries)</option>
                    <option value="Santosh Degree College">Santosh Degree College (Bangarpet)</option>
                    <option value="Santosh D.Ed College">Santosh D.Ed College (Bangarpet)</option>
                    <option value="Fathima PU College">Fathima PU College (Bangarpet)</option>
                    <option value="Santosh Schools Bangarpet">Santosh Schools (Bangarpet)</option>
                    <option value="Santosh Schools Bangalore">Santosh Schools (Bangalore)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1 font-sans">
                    Message / Question *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full text-sm p-3 bg-white border border-taupe rounded-[4px] focus:outline-none focus:border-forest"
                    placeholder="How can our administration assist you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center py-3 text-sm font-medium"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. COMPLETE DIRECTORY TABLE OF ALL 11 INSTITUTIONS (Unboxed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-taupe pb-4">
          <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
            DIRECTORY
          </div>
          <h2 className="text-3xl font-serif text-charcoal">
            All 11 Institutions
          </h2>
        </div>

        <div className="overflow-x-auto border-y border-taupe">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="border-b border-taupe text-[11px] uppercase tracking-[0.12em] font-semibold text-muted">
                <th className="py-4 pr-4">#</th>
                <th className="py-4 px-4">Institution Name</th>
                <th className="py-4 px-4">Campus</th>
                <th className="py-4 px-4">Level</th>
                <th className="py-4 pl-4">Telephone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-taupe text-xs sm:text-sm text-muted">
              {institutionsList.map((item, idx) => (
                <tr key={idx} className="hover:bg-tint/20 transition-colors">
                  <td className="py-4 pr-4 font-mono text-xs">{idx + 1}</td>
                  <td className="py-4 px-4 font-serif text-charcoal font-medium text-base">
                    {item.name}
                  </td>
                  <td className="py-4 px-4 font-medium text-forest">
                    {item.location}
                  </td>
                  <td className="py-4 px-4">{item.level}</td>
                  <td className="py-4 pl-4 font-mono font-medium text-charcoal">
                    {item.phone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
