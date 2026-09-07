"use client";

import React, { useState } from "react";
import Image from "next/image";
import DecorativePlusGrid from "@/components/DecorativePlusGrid";
import { ChevronDown, CheckCircle2 } from "lucide-react";

export default function StudentLifePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const rules = [
    {
      category: "Attendance & Punctuality Policy",
      items: [
        "Students must be in time to the college. Late comers are liable to disciplinary action to maintain institutional decorum.",
        "A minimum of 75% attendance is compulsory. Students who do not have required attendance will strictly not be allowed/permitted to appear for final examinations.",
        "Leave notes signed by parents/guardians must be produced whenever a student fails to attend classes. Leave will be granted only on genuine grounds.",
        "A student taking 3 days of leave or more without prior permission will not be allowed to attend classes unless their parents meet the Principal in person.",
        "Monthly tests will be conducted to monitor academic level and comprehension. Attendance for monthly tests is compulsory."
      ]
    },
    {
      category: "Campus Conduct & Mobile Phone Policy",
      items: [
        "Students are strictly informed NOT to use their mobile phones on the college campus.",
        "Irregular attendance, disobedience to lecturers, or neglect of assignments are sufficient reasons for temporary or permanent dismissal of the student.",
        "Any damage done to college property (laboratories, furniture, buses, library books) will be charged individually to the responsible student.",
        "The college is not responsible for valuable items lost by students on campus.",
        "Any sort of canvassing for securing seats or marks will disqualify and reject the candidate immediately."
      ]
    },
    {
      category: "Prescribed Uniform & Identity Cards",
      items: [
        "Uniform is compulsory for all students and will be issued by the Institution upon payment of prescribed fees.",
        "Official Identity Cards are issued to every candidate and must be worn visibly at all times during college hours and transport.",
        "Lesson plan books, drawing books, practical record books, and observational records for training will be supplied directly by the Institute."
      ]
    },
    {
      category: "Discipline & Parental Collaboration",
      items: [
        "Parents are advised to meet the person in-charge to know their son / daughter's progress in the college every month without fail.",
        "Leave is granted only in suitable reason and emergency situations.",
        "Students should not give room for any misconduct or complaint. If received, the candidate will be dismissed from the Institute on prior notification."
      ]
    }
  ];

  return (
    <div className="space-y-24 lg:space-y-32 pb-24">
      {/* 1. HERO (Unboxed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14">
        <div className="border-b border-taupe pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted mb-2">
              STUDENT LIFE AT SGI
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-charcoal leading-tight tracking-tight font-medium">
              Community Service, Sports & Integrity
            </h1>
            <p className="text-sm sm:text-base text-muted mt-3 max-w-2xl leading-relaxed font-sans">
              Fostering civic empathy through the National Service Scheme (NSS), athletic sportsmanship, targeted placement guidance, and disciplined self-governance.
            </p>
          </div>
          <div className="hidden md:block">
            <DecorativePlusGrid variant="corner-step" className="max-w-[200px]" />
          </div>
        </div>
      </section>

      {/* 2. NSS PROGRAMME & 5-DAY RURAL CAMP AT T. GOLLAHALLI (Unboxed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
              NATION BUILDING
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-charcoal">
              National Service Scheme (NSS)
            </h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed font-sans">
              NSS is a government-sponsored activity conducted in our colleges with a view to involve students in Nation Building Activities. A dedicated coordinator oversees the proper implementation of NSS activities at Santosh.
            </p>
            <div className="border-t border-taupe pt-4 space-y-1.5">
              <h3 className="font-serif text-xl text-charcoal font-medium">
                5-Day Rural Service Camp at T. Gollahalli
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans">
                Community Service is an important aspect of NSS. Students use their talent and time to serve weaker communities, organizing health awareness, environmental literacy, and social upliftment across local villages.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative h-72 border border-taupe overflow-hidden">
              <Image
                src="/images/nss-camp-banner.jpg"
                alt="NSS Camp inauguration"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-72 border border-taupe overflow-hidden">
              <Image
                src="/images/sports-volleyball.jpg"
                alt="Volleyball and sports tournament"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAREER GUIDANCE & PLACEMENT + STUDENT COUNSELLING (Unboxed, thin rules) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 border-t border-taupe pt-10">
          {/* Career Guidance */}
          <div className="space-y-3">
            <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
              INDUSTRY COORDINATION
            </div>
            <h3 className="text-2xl font-serif text-charcoal font-medium">
              Career Guidance & Placement
            </h3>
            <p className="text-sm text-muted leading-relaxed font-sans">
              The Training and Placement function is carried out by a dedicated committee of Staff/Faculty Co-ordinators and Student Co-ordinators taken from every department.
            </p>
            <p className="text-sm text-muted leading-relaxed font-sans">
              Our goal is to bring about academic excellence and progressive co-academic policies, streamline student aspirations, and attract corporate employers to conduct campus recruitment throughout the year.
            </p>
          </div>

          {/* Student Counselling */}
          <div className="space-y-3">
            <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
              EMOTIONAL WELL-BEING
            </div>
            <h3 className="text-2xl font-serif text-charcoal font-medium">
              Student Counselling Cell
            </h3>
            <p className="text-sm text-muted leading-relaxed font-sans">
              A separate cell is established consisting of a qualified counsellor for counselling students to help improve their personalities and adjust to new psychological and academic environments.
            </p>
            <p className="text-sm text-muted leading-relaxed font-sans">
              The cell provides constructive coping techniques for stress, performance anxiety, and time management during critical learning and examination cycles.
            </p>
          </div>
        </div>
      </section>

      {/* 4. RULES & REGULATIONS (Unboxed Accordion) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
        <div className="space-y-2 border-b border-taupe pb-4">
          <div className="text-[11px] font-sans uppercase tracking-[0.14em] text-muted">
            DISCIPLINARY CODE
          </div>
          <h2 className="text-3xl font-serif text-charcoal">
            Rules & Regulations for Students
          </h2>
          <p className="text-sm text-muted font-sans">
            The college requires students to conduct themselves in a disciplined manner and maintain institutional decorum at all times.
          </p>
        </div>

        <div className="divide-y divide-taupe border-y border-taupe">
          {rules.map((rule, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left py-5 flex items-center justify-between gap-4 transition-colors focus:outline-none"
                >
                  <span className="font-serif text-lg sm:text-xl text-charcoal font-medium">
                    {rule.category}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-forest transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="pb-6 pt-1 space-y-2.5">
                    <ul className="space-y-2 text-xs sm:text-sm text-muted font-sans leading-relaxed">
                      {rule.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-forest shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
