import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "santosh1977";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set("sgi_admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: "Invalid password. Please enter the correct admin password." },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("sgi_admin_session");
  const isAuthenticated = session?.value === "authenticated";

  return NextResponse.json({ authenticated: isAuthenticated });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("sgi_admin_session");
  return NextResponse.json({ success: true });
}
