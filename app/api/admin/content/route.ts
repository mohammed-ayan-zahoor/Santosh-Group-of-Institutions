import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getPageContent, savePageContent } from "@/lib/content";

async function isAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("sgi_admin_session");
  return session?.value === "authenticated";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug required" }, { status: 400 });
  }

  const content = await getPageContent(slug);
  if (!content) {
    return NextResponse.json({ error: "Page content not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, content });
}

export async function POST(request: Request) {
  const authenticated = await isAuth();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug, content } = await request.json();

    if (!slug || !content) {
      return NextResponse.json(
        { error: "Slug and content are required." },
        { status: 400 }
      );
    }

    const res = await savePageContent(slug, content);

    if (!res.success) {
      return NextResponse.json(
        { error: res.error || "Failed to update content." },
        { status: 500 }
      );
    }

    // Revalidate paths so the public site reflects the change immediately
    if (slug === "home") {
      revalidatePath("/");
    } else if (
      [
        "about",
        "academics",
        "campus-life",
        "student-life",
        "admissions",
        "gallery",
        "contact",
      ].includes(slug)
    ) {
      revalidatePath(`/${slug}`);
    } else {
      revalidatePath(`/institutions/${slug}`);
      revalidatePath("/institutions");
    }

    return NextResponse.json({ success: true, message: `Content updated for ${slug}` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
