import { NextResponse } from "next/server";
import { getAllInquiries, deleteInquiry } from "@/lib/content";

export async function GET() {
  try {
    const inquiries = await getAllInquiries();
    return NextResponse.json({ success: true, inquiries });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await request.json();
        id = body.id;
      } catch {}
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Inquiry ID is required for deletion." },
        { status: 400 }
      );
    }

    const result = await deleteInquiry(id);
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: result.error || "Failed to delete inquiry." },
        { status: 500 }
      );
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
