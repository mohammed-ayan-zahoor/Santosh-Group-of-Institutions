"use client";

import React, { useState } from "react";
import DecorativePlusGrid from "@/components/DecorativePlusGrid";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdmissionsPage() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    institution: "Santosh Degree College",
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
        setErrorMsg(data.error || "Failed to submit inquiry.");
      }
    } catch (err: any) {
      setErrorMsg("An error occurred while submitting. Please call our office directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      step: "01",
      title: "Obtain Application Form",
      desc: "Application forms can be obtained from the college office soon after the announcement of SSLC / PUC results, or initiated via our online inquiry form.",
    },
    {
      step: "02",
      title: "Submit Documents & Forms",
      desc: "Duly filled-in application forms along with attested copies of marks cards and transfer certificates are submitted to the college office.",
    },
    {
      step: "03",
      title: "Merit Selection Announcement",
      desc: "Selection of eligible candidates is conducted purely on merit and admission rules of the PU Board / Bangalore University and displayed on the notice board.",
    },
    {
      step: "04",
      title: "Principal Verification & Enrollment",
      desc: "Selected candidates meet the Principal along with parents/guardians with original marks cards, TC, conduct certificates, and photographs for formal admission.",
    },
  ];

  const documents = [
    "Original & Attested copies of SSLC / 10th Standard Marks Card",
    "Original & Attested copies of PUC / 12th Standard Marks Card (for Degree & D.Ed admissions)",
    "Original Transfer Certificate (TC) issued by the respective school or college last attended",
    "Migration Certificate for candidates coming from outside Karnataka State",
    "Conduct & Character Certificate issued by the Head of the Institution last attended",
    "Four recent stamp-sized colour photographs",
  ];

  const examSchedule = [
    {
      name: "I Quarterly Examination",
      date: "Sep. 1st week",
      time: "90 min",
      maxMarks: "50",
    },
    {
      name: "Mid-Term Examination",
      date: "Dec. 1st week",
      time: "3 hours",
      maxMarks: "100",
    },
    {
      name: "II Quarterly (for I PUC)",
      date: "Feb. 1st week",
      time: "90 min",
      maxMarks: "50",
    },
    {
      name: "Preparatory for II PUC / Degree",
      date: "Feb. 2nd / 3rd week",
      time: "3 hours",
      maxMarks: "100",
    },
    {
      name: "Annual Examination (Board / Univ)",
      date: "Feb. last week / Mar. 3rd week",
      time: "3 hours",
      maxMarks: "100",
    },
  ];

  return (
    <div className="space-y-24 lg:space-y-32 pb-24">
      {/* 1. HERO (Unboxed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14">
        <div className="border-b border-taupe pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted mb-2">
              ADMISSIONS PORTAL
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-charcoal leading-tight tracking-tight font-medium">
              Admissions Criteria & Procedure
            </h1>
            <p className="text-sm sm:text-base text-muted mt-3 max-w-2xl leading-relaxed font-sans">
              Transparent, merit-guided admissions from Pre-Primary foundation schooling through Bangalore University degrees and NCTE teacher training.
            </p>
          </div>
          <div className="hidden md:block">
            <DecorativePlusGrid variant="horizontal-strip" className="max-w-[300px]" />
          </div>
        </div>
      </section>

      {/* 2. ADMISSION PROCEDURE (Unboxed 4-Column Flow, thin top rules) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-taupe pb-4">
          <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
            ENROLLMENT PROCESS
          </div>
          <h2 className="text-3xl font-serif text-charcoal">
            Step-by-Step Admission Procedure
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.step} className="space-y-3 border-t border-taupe pt-6">
              <span className="font-serif text-3xl sm:text-4xl font-medium text-forest font-mono">
                {step.step}
              </span>
              <h3 className="font-serif text-xl text-charcoal font-medium">{step.title}</h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DOCUMENTS CHECKLIST & INQUIRY FORM (Unboxed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Documents Checklist (Unboxed) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="border-b border-taupe pb-4">
              <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
                DOCUMENT VERIFICATION
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-charcoal">
                Required Documents Checklist
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans">
              Candidates are required to bring original documents along with three sets of attested copies at the time of the final admission interview with the Principal:
            </p>

            <div className="divide-y divide-taupe border-y border-taupe">
              {documents.map((doc, idx) => (
                <div key={idx} className="py-3.5 flex items-start gap-3 text-xs sm:text-sm text-charcoal font-sans">
                  <span className="text-xs font-mono text-muted/70 pt-0.5">0{idx + 1}</span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted font-sans italic pt-1">
              * Candidates from outside Karnataka must obtain a valid migration certificate prior to enrollment.
            </p>
          </div>

          {/* Right: Online Admission Inquiry Form */}
          <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-taupe lg:pl-12 space-y-6">
            <div>
              <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
                CONNECT WITH US
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-charcoal">
                Submit an Admission Inquiry
              </h3>
              <p className="text-xs text-muted mt-1 font-sans">
                Fill out the form below. Our admissions coordinator will reach out with prospectus details and seat availability.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-forest text-white space-y-3 text-center">
                <CheckCircle2 className="w-10 h-10 text-gold mx-auto" />
                <h4 className="font-serif text-xl">Inquiry Submitted Successfully</h4>
                <p className="text-xs text-white/80 font-sans">
                  Thank you, {formState.name}. Our admissions office will contact you at {formState.phone} shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({
                      name: "",
                      phone: "",
                      email: "",
                      institution: "Santosh Degree College",
                      message: "",
                    });
                  }}
                  className="text-xs underline text-gold pt-2 block mx-auto"
                >
                  Submit another inquiry
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
                    Student / Parent Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full text-sm p-3 bg-white border border-taupe rounded-[4px] focus:outline-none focus:border-forest"
                    placeholder="e.g. Ramesh Kumar"
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
                      placeholder="e.g. parent@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1 font-sans">
                    Institution of Interest *
                  </label>
                  <select
                    value={formState.institution}
                    onChange={(e) => setFormState({ ...formState, institution: e.target.value })}
                    className="w-full text-sm p-3 bg-white border border-taupe rounded-[4px] focus:outline-none focus:border-forest"
                  >
                    <option value="Santosh Degree College">Santosh Degree College (BBM, BCA, B.Com, BA)</option>
                    <option value="Santosh D.Ed College">Santosh D.Ed (T.C.H) Teacher Training</option>
                    <option value="Fathima PU College">Fathima PU College (Science, Commerce, Arts)</option>
                    <option value="Santosh High School Bangarpet">Santosh High School (Bangarpet)</option>
                    <option value="Santosh Primary/Nursery Bangarpet">Santosh Primary/Nursery (Bangarpet)</option>
                    <option value="Bangalore Campuses">Bangalore Campuses (Nursery to High School)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1 font-sans">
                    Message / Inquiry Details
                  </label>
                  <textarea
                    rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full text-sm p-3 bg-white border border-taupe rounded-[4px] focus:outline-none focus:border-forest"
                    placeholder="Provide details on previous qualification or questions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center py-3 text-sm font-medium"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry to Admissions Office"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 4. ACADEMIC EXAMINATION SCHEDULE TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-taupe pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
              ANNUAL CALENDAR
            </div>
            <h2 className="text-3xl font-serif text-charcoal">
              Academic Examination Schedule
            </h2>
          </div>
          <span className="text-xs text-muted font-sans">
            Prescribed by Board Regulations
          </span>
        </div>

        {/* Clean, unboxed table with thin borders */}
        <div className="overflow-x-auto border-y border-taupe">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-taupe text-[11px] uppercase tracking-[0.12em] font-semibold text-muted font-sans">
                <th className="py-4 pr-6">Name of the Exam</th>
                <th className="py-4 px-6">Scheduled Date</th>
                <th className="py-4 px-6">Duration</th>
                <th className="py-4 pl-6">Max Marks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-taupe text-xs sm:text-sm text-muted font-sans">
              {examSchedule.map((exam, idx) => (
                <tr key={idx} className="hover:bg-tint/20 transition-colors">
                  <td className="py-4 pr-6 font-serif text-charcoal font-medium text-base">
                    {exam.name}
                  </td>
                  <td className="py-4 px-6">{exam.date}</td>
                  <td className="py-4 px-6">{exam.time}</td>
                  <td className="py-4 pl-6 font-mono font-medium text-forest">
                    {exam.maxMarks}
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
