import { NextResponse } from "next/server";
import { saveInquiry } from "@/lib/content";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, institution, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and Phone are required." },
        { status: 400 }
      );
    }

    const result = await saveInquiry({
      name,
      phone,
      email: email || "",
      institution: institution || "General",
      message: message || "",
    });

    if (result.success) {
      return NextResponse.json({ success: true, id: result.id });
    } else {
      return NextResponse.json(
        { success: false, error: result.error || "Failed to save inquiry." },
        { status: 500 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
