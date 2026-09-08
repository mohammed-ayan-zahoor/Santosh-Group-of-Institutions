import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Redirect unauthenticated users trying to access /admin pages (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = request.cookies.get("sgi_admin_session");

    if (session?.value !== "authenticated") {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Protect sensitive admin API endpoints
  if (pathname.startsWith("/api/admin") && pathname !== "/api/admin/auth") {
    const session = request.cookies.get("sgi_admin_session");

    if (session?.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
