"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Invalid password.");
      }
    } catch (err: any) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        <Image
          src="/images/sgi-logo.png"
          alt="Santosh Group of Institutions"
          width={64}
          height={64}
          className="w-16 h-16 mx-auto object-contain shrink-0"
          priority
        />
        <h1 className="text-3xl font-serif text-charcoal">
          SGI Content Management
        </h1>
        <p className="text-xs text-muted">
          Staff portal to manage website contents, institutions, and inquiries.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white border border-taupe p-8 space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1">
                Admin Access Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full text-sm p-3 bg-cream border border-taupe rounded-[4px] focus:outline-none focus:border-forest"
                />
                <Lock className="w-4 h-4 text-muted absolute right-3 top-3.5" />
              </div>
            </div>

            <div className="p-3 bg-tint/60 border border-taupe text-[11px] text-muted space-y-1">
              <span className="font-semibold text-charcoal block">Default Password:</span>
              <span><code className="bg-white px-1 py-0.5 border border-taupe">santosh1977</code> (configurable via ADMIN_PASSWORD env)</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-2.5 text-xs font-semibold"
            >
              <span>{loading ? "Verifying..." : "Login to CMS Dashboard"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-4 border-t border-taupe text-center">
            <Link href="/" className="text-xs text-muted hover:text-charcoal underline">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
