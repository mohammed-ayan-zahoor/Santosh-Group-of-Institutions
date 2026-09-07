import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-taupe pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-taupe">
          {/* Col 1: Identity & Heritage */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/sgi-logo.png"
                alt="Santosh Group of Institutions"
                width={48}
                height={48}
                className="w-12 h-12 object-contain shrink-0"
              />
              <div>
                <span className="block font-serif text-lg font-medium text-charcoal leading-none">
                  Santosh Group
                </span>
                <span className="block text-[11px] font-sans tracking-wider uppercase text-muted mt-0.5">
                  Of Institutions
                </span>
              </div>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Founded in 1977 by Dr. Al Haji Abdul Sattar. Delivering quality education across 11 institutions from Pre-Primary exploration to Graduation.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-medium text-forest">
              <ShieldCheck className="w-4 h-4 text-forest" />
              <span>34+ Years of Educational Trust</span>
            </div>
          </div>

          {/* Col 2: Bangarpet Institutions */}
          <div>
            <h3 className="eyebrow mb-4 text-charcoal">Bangarpet Campuses</h3>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <Link href="/institutions/santosh-nursery-school-bangarpet" className="hover:text-charcoal hover:underline">
                  Santosh Nursery School
                </Link>
              </li>
              <li>
                <Link href="/institutions/santosh-primary-school-bangarpet" className="hover:text-charcoal hover:underline">
                  Santosh Primary School
                </Link>
              </li>
              <li>
                <Link href="/institutions/santosh-higher-primary-school-bangarpet" className="hover:text-charcoal hover:underline">
                  Santosh Higher Primary School
                </Link>
              </li>
              <li>
                <Link href="/institutions/santosh-high-school-bangarpet" className="hover:text-charcoal hover:underline">
                  Santosh High School
                </Link>
              </li>
              <li>
                <Link href="/institutions/fathima-pu-college" className="text-charcoal font-medium hover:text-gold hover:underline">
                  Fathima PU College (Arts/Comm/Sci) →
                </Link>
              </li>
              <li>
                <Link href="/institutions/santosh-degree-college" className="text-charcoal font-medium hover:text-gold hover:underline">
                  Santosh Degree College (BBM/BCA/BCom/BA) →
                </Link>
              </li>
              <li>
                <Link href="/institutions/santosh-ded-college" className="text-charcoal font-medium hover:text-gold hover:underline">
                  Santosh D.Ed (T.C.H) College →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Bangalore Institutions & Quick Links */}
          <div>
            <h3 className="eyebrow mb-4 text-charcoal">Bangalore Campuses</h3>
            <ul className="space-y-2 text-xs text-muted mb-6">
              <li>
                <Link href="/institutions/santosh-nursery-school-bangalore" className="hover:text-charcoal hover:underline">
                  Santosh Nursery School, Bangalore
                </Link>
              </li>
              <li>
                <Link href="/institutions/santosh-primary-school-bangalore" className="hover:text-charcoal hover:underline">
                  Santosh Primary School, Bangalore
                </Link>
              </li>
              <li>
                <Link href="/institutions/santosh-higher-primary-school-bangalore" className="hover:text-charcoal hover:underline">
                  Santosh Higher Primary School, Bangalore
                </Link>
              </li>
              <li>
                <Link href="/institutions/santosh-high-school-bangalore" className="hover:text-charcoal hover:underline">
                  Santosh High School, Bangalore
                </Link>
              </li>
            </ul>

            <h3 className="eyebrow mb-2 text-charcoal">Key Resources</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted">
              <Link href="/admissions" className="hover:text-charcoal hover:underline">Admissions</Link>
              <Link href="/academics" className="hover:text-charcoal hover:underline">Programs</Link>
              <Link href="/student-life" className="hover:text-charcoal hover:underline">Rules</Link>
              <Link href="/gallery" className="hover:text-charcoal hover:underline">Gallery</Link>
              <Link href="/contact" className="hover:text-charcoal hover:underline">Contact</Link>
            </div>
          </div>

          {/* Col 4: Central Office & Contact */}
          <div>
            <h3 className="eyebrow mb-4 text-charcoal">Central Office</h3>
            <div className="space-y-3 text-xs text-muted">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <span>No. 1169, Kolar Road (Near Canara Bank), Bangarpet – 563 114, Kolar Dist.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-forest shrink-0" />
                <div className="space-y-0.5">
                  <a href="tel:09448106902" className="block hover:text-charcoal font-medium text-charcoal">
                    09448106902
                  </a>
                  <a href="tel:09886152151" className="block hover:text-charcoal">
                    09886152151
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-forest shrink-0" />
                <a
                  href="mailto:santoshgroupofinstitutions@gmail.com"
                  className="hover:text-charcoal break-all"
                >
                  santoshgroupofinstitutions@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-taupe">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-forest hover:text-gold"
              >
                <span>Staff CMS Portal</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} Santosh Group of Institutions. All rights reserved.</p>
          <p className="font-serif italic text-charcoal">"Let's Imagine A New World"</p>
        </div>
      </div>
    </footer>
  );
}
