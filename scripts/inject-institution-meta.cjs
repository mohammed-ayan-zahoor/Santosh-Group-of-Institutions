#!/usr/bin/env node
// Injects metaTitle + metaDescription into each institution JSON if not already present.
// Keyword-optimised for location + program + institution name searches.

const fs = require("fs");
const path = require("path");

const INST_DIR = path.join(__dirname, "../data/content/institutions");

const META = {
  "fathima-pu-college": {
    metaTitle: "Fathima PU College Bangarpet | Science, Commerce, Arts PUC",
    metaDescription: "Pre-University (PUC) Science, Commerce and Arts at Fathima PU College, Bangarpet. Karnataka State PU Board affiliated. Admissions open.",
  },
  "santosh-degree-college": {
    metaTitle: "Santosh Degree College Bangarpet | BBM, BCA, B.Com, BA",
    metaDescription: "Bangalore University affiliated undergraduate degrees: BBM, BCA, B.Com, BA at Santosh Degree College, Bangarpet, Kolar District, Karnataka.",
  },
  "santosh-ded-college": {
    metaTitle: "Santosh D.Ed College | Teacher Training | Kolar District",
    metaDescription: "NCTE approved D.Ed (TCH) 2-year teacher training at Santosh D.Ed College, Bangarpet. 18 distinctions — Kolar District topper.",
  },
  "santosh-high-school-bangarpet": {
    metaTitle: "Santosh High School Bangarpet | SSLC School Kolar",
    metaDescription: "Government-aided high school (SSLC) at Santosh High School, Bangarpet, Kolar District. Part of Santosh Group of Institutions founded 1977.",
  },
  "santosh-high-school-bangalore": {
    metaTitle: "Santosh High School Bangalore | SSLC School",
    metaDescription: "High school education (SSLC) at Santosh High School, Bangalore campus. Part of Santosh Group of Institutions — 11 campuses across Karnataka.",
  },
  "santosh-higher-primary-school-bangarpet": {
    metaTitle: "Santosh Higher Primary School Bangarpet | Classes 6–8",
    metaDescription: "Higher primary education (Classes 6–8) at Santosh Higher Primary School, Bangarpet. Santosh Group of Institutions, Kolar District, Karnataka.",
  },
  "santosh-higher-primary-school-bangalore": {
    metaTitle: "Santosh Higher Primary School Bangalore | Classes 6–8",
    metaDescription: "Higher primary education (Classes 6–8) at Santosh Higher Primary School, Bangalore. Part of Santosh Group of Institutions.",
  },
  "santosh-primary-school-bangarpet": {
    metaTitle: "Santosh Primary School Bangarpet | LKG to Class 5",
    metaDescription: "Primary education from LKG to Class 5 at Santosh Primary School, Bangarpet, Kolar District. Santosh Group of Institutions — est. 1977.",
  },
  "santosh-primary-school-bangalore": {
    metaTitle: "Santosh Primary School Bangalore | LKG to Class 5",
    metaDescription: "Primary education from LKG to Class 5 at Santosh Primary School, Bangalore campus. Part of Santosh Group of Institutions.",
  },
  "santosh-nursery-school-bangarpet": {
    metaTitle: "Santosh Nursery School Bangarpet | Pre-Primary Education",
    metaDescription: "Nurturing pre-primary education at Santosh Nursery School, Bangarpet. Playgroup to UKG. Santosh Group of Institutions, Kolar District.",
  },
  "santosh-nursery-school-bangalore": {
    metaTitle: "Santosh Nursery School Bangalore | Pre-Primary Education",
    metaDescription: "Pre-primary education (Playgroup to UKG) at Santosh Nursery School, Bangalore. Part of Santosh Group of Institutions.",
  },
};

let count = 0;
for (const [slug, meta] of Object.entries(META)) {
  const filePath = path.join(INST_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`SKIP (not found): ${slug}.json`);
    continue;
  }
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (data.metaTitle && data.metaDescription) {
    console.log(`SKIP (already has meta): ${slug}`);
    continue;
  }
  // Insert after slug field for readability
  const updated = { slug: data.slug, ...meta, ...data };
  delete updated.slug; // avoid dup
  const final = { slug: data.slug, ...meta, ...Object.fromEntries(Object.entries(data).filter(([k]) => k !== "slug")) };
  fs.writeFileSync(filePath, JSON.stringify(final, null, 2));
  console.log(`UPDATED: ${slug}`);
  count++;
}

console.log(`\nDone. ${count} files updated.`);
