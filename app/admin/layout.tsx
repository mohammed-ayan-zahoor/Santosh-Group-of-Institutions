"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileEdit, MessageSquare, ExternalLink, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, render children without admin navigation bar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Top Admin Bar */}
      <header className="bg-forest text-white border-b border-taupe px-4 sm:px-6 py-3 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-serif text-lg font-medium text-white">
              SGI Admin CMS
            </Link>
            <span className="text-xs bg-white/20 text-white/90 px-2 py-0.5 rounded-sm">
              Content & Inquiries
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/admin"
              className={`hover:text-gold transition-colors ${
                pathname === "/admin" ? "text-gold font-semibold" : "text-white/80"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/inquiries"
              className={`hover:text-gold transition-colors ${
                pathname === "/admin/inquiries" ? "text-gold font-semibold" : "text-white/80"
              }`}
            >
              Inquiries Inbox
            </Link>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-white/70 hover:text-white"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 text-red-300 hover:text-red-100 ml-2"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {children}
      </div>
    </div>
  );
}
