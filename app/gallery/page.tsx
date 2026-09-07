"use client";

import React, { useState } from "react";
import Image from "next/image";
import DecorativePlusGrid from "@/components/DecorativePlusGrid";
import { Award, Calendar, Eye } from "lucide-react";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Campus", "Academics", "Sports & NSS"];

  const photos = [
    {
      title: "Main Campus Entrance & Institutional Grounds",
      category: "Campus",
      image: "/images/campus-main-entrance.jpg",
      caption: "Main entrance of Santosh Group of Educational Institutions in Bangarpet.",
    },
    {
      title: "Central Campus Courtyard & Quad",
      category: "Campus",
      image: "/images/campus-courtyard-panorama.jpg",
      caption: "Panoramic view of our central courtyard, mature campus trees, and student assembly area.",
    },
    {
      title: "Academic Corridors & Classroom Wings",
      category: "Campus",
      image: "/images/campus-academic-corridor.jpg",
      caption: "Multi-tiered academic corridors with open-air student walkways.",
    },
    {
      title: "Santosh English School Main Gate",
      category: "Campus",
      image: "/images/campus-school-entrance.jpg",
      caption: "Archway entrance to Santosh Nursery, Primary, and High School campuses.",
    },
    {
      title: "Academic Complex & Building Facade",
      category: "Campus",
      image: "/images/campus-building-facade.jpg",
      caption: "Contemporary academic building housing classrooms and departmental faculties.",
    },
    {
      title: "Dr. A.P.J. Abdul Kalam Commemoration",
      category: "Campus",
      image: "/images/dr-kalam.jpg",
      caption: "Values of inquiry and moral leadership guiding all student initiatives.",
    },
    {
      title: "Fathima PU & Degree College Main Block",
      category: "Campus",
      image: "/images/campus-building-fathima.jpg",
      caption: "Central campus building on Kolar Road, Bangarpet.",
    },
    {
      title: "Santosh D.Ed College Block",
      category: "Campus",
      image: "/images/campus-building-ded.jpg",
      caption: "Teacher education campus with spacious lecture halls.",
    },
    {
      title: "Faculty Discussion & Council",
      category: "Academics",
      image: "/images/faculty-meeting.jpg",
      caption: "Senior faculty members meeting with the Chairman and Secretary.",
    },
    {
      title: "Faculty and Student Cohort",
      category: "Academics",
      image: "/images/faculty-group.jpg",
      caption: "Educators and student representatives across Bangarpet institutions.",
    },
    {
      title: "Interactive Classroom Lectures",
      category: "Academics",
      image: "/images/classroom-students.jpg",
      caption: "Airy, student-friendly classrooms with high academic decorum.",
    },
    {
      title: "Multimedia Computer Laboratory",
      category: "Academics",
      image: "/images/bca-computer-lab.jpg",
      caption: "Students engaged in computer applications and programming practice.",
    },
    {
      title: "Well-Stocked Reference Library",
      category: "Academics",
      image: "/images/library-students.jpg",
      caption: "Fiction, non-fiction, reference volumes, and periodicals.",
    },
    {
      title: "D.Ed Teacher Trainees Preparation",
      category: "Academics",
      image: "/images/ded-teachers.jpg",
      caption: "Teacher trainees with learning kits and lesson planning books.",
    },
    {
      title: "NSS Community Camp at T. Gollahalli",
      category: "Sports & NSS",
      image: "/images/nss-camp-banner.jpg",
      caption: "5-day rural nation building camp organized by SGI students.",
    },
    {
      title: "Inter-Collegiate Volleyball Tournament",
      category: "Sports & NSS",
      image: "/images/sports-volleyball.jpg",
      caption: "Athletic meets and sports wins on our central campus ground.",
    },
    {
      title: "College Bus Fleet",
      category: "Campus",
      image: "/images/college-bus.jpg",
      caption: "Safe transportation network across Bangarpet and Kolar taluks.",
    },
  ];

  const filteredPhotos =
    selectedCategory === "All"
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      {/* 1. HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="border-b border-taupe pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="eyebrow block mb-2">ARCHIVAL & CAMPUS GALLERY</span>
            <h1 className="text-4xl sm:text-5xl font-serif text-charcoal leading-tight">
              Moments of Excellence & Service
            </h1>
            <p className="text-sm sm:text-base text-muted mt-3 max-w-2xl leading-relaxed">
              Archival moments from dignitary visits, academic achievements, classroom sessions, NSS community service, and sporting victories.
            </p>
          </div>
          <div className="hidden md:block">
            <DecorativePlusGrid variant="constellation" className="max-w-[220px]" />
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 pb-6 border-b border-taupe">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors rounded-[4px] border ${
                selectedCategory === cat
                  ? "bg-forest text-white border-forest"
                  : "bg-white text-muted border-taupe hover:text-charcoal hover:border-forest"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. PHOTO GRID (Thin taupe borders, 4px radius, unboxed captions) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo, idx) => (
            <div key={idx} className="group space-y-2.5">
              <div className="relative h-64 sm:h-72 border border-taupe rounded-[4px] overflow-hidden bg-charcoal/5">
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-white/90 border border-taupe px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold text-forest">
                  {photo.category}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg text-charcoal group-hover:text-forest transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed font-sans">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
