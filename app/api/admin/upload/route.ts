import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "node:crypto";

export async function POST(request: Request) {
  try {
    // 1. Authenticate admin session
    const cookieStore = await cookies();
    const session = cookieStore.get("sgi_admin_session");
    if (session?.value !== "authenticated") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // 2. Read multipart form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided." },
        { status: 400 }
      );
    }

    // 3. Check Cloudinary credentials
    const cloudName =
      process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const uploadPreset =
      process.env.CLOUDINARY_UPLOAD_PRESET || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME and credentials in your .env file.",
        },
        { status: 500 }
      );
    }

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);

    const folder = "santosh_group";

    if (apiKey && apiSecret) {
      // Signed Upload
      const timestamp = Math.round(Date.now() / 1000);
      const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
      const signature = crypto.createHash("sha1").update(paramsToSign).digest("hex");

      cloudinaryFormData.append("api_key", apiKey);
      cloudinaryFormData.append("timestamp", String(timestamp));
      cloudinaryFormData.append("folder", folder);
      cloudinaryFormData.append("signature", signature);
    } else if (uploadPreset) {
      // Unsigned Upload
      cloudinaryFormData.append("upload_preset", uploadPreset);
      cloudinaryFormData.append("folder", folder);
    } else {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing Cloudinary credentials. Provide either (CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET) or CLOUDINARY_UPLOAD_PRESET in your .env file.",
        },
        { status: 500 }
      );
    }

    // 4. Send to Cloudinary REST API
    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: cloudinaryFormData,
      }
    );

    const data = await uploadRes.json();

    if (!uploadRes.ok || data.error) {
      return NextResponse.json(
        {
          success: false,
          error: data.error?.message || "Failed to upload image to Cloudinary.",
        },
        { status: uploadRes.status || 400 }
      );
    }

    return NextResponse.json({
      success: true,
      url: data.secure_url || data.url,
      publicId: data.public_id,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error during upload." },
      { status: 500 }
    );
  }
}
