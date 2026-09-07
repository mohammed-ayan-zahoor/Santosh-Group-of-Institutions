import fs from "fs";
import path from "path";
import { getDatabase } from "./mongodb";

const CONTENT_DIR = path.join(process.cwd(), "data", "content");
const INSTITUTIONS_DIR = path.join(CONTENT_DIR, "institutions");

function getFilePathForSlug(slug: string): string {
  const institutionPath = path.join(INSTITUTIONS_DIR, `${slug}.json`);
  if (fs.existsSync(institutionPath)) {
    return institutionPath;
  }
  return path.join(CONTENT_DIR, `${slug}.json`);
}

/**
 * Get content for a page by slug (e.g. "home", "about", "fathima-pu-college")
 * Checks MongoDB first; falls back seamlessly to data/content/*.json
 */
export async function getPageContent<T = any>(slug: string): Promise<T | null> {
  const filePath = getFilePathForSlug(slug);

  // Read local JSON file as base source of truth / fallback
  let fileContent: T | null = null;
  if (fs.existsSync(filePath)) {
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      fileContent = JSON.parse(raw);
    } catch (e) {
      console.error(`Error reading JSON for ${slug}:`, e);
    }
  }

  // Check MongoDB if available
  const db = await getDatabase();
  if (db) {
    try {
      const doc = await db.collection("pages").findOne({ slug });
      if (doc && doc.content) {
        return doc.content as T;
      }
      // If found in JSON but not in MongoDB, seed MongoDB
      if (fileContent) {
        await db.collection("pages").updateOne(
          { slug },
          { $set: { slug, content: fileContent, updatedAt: new Date() } },
          { upsert: true }
        );
      }
    } catch (e) {
      console.warn(`MongoDB query error for slug ${slug}, using local JSON:`, e);
    }
  }

  return fileContent;
}

/**
 * Save updated page content.
 * Updates MongoDB and writes back to the corresponding JSON file.
 */
export async function savePageContent(slug: string, content: any): Promise<{ success: boolean; error?: string }> {
  const filePath = getFilePathForSlug(slug);

  try {
    // 1. Write to local JSON file
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf-8");

    // 2. Update MongoDB if connected
    const db = await getDatabase();
    if (db) {
      await db.collection("pages").updateOne(
        { slug },
        { $set: { slug, content, updatedAt: new Date() } },
        { upsert: true }
      );
    }

    return { success: true };
  } catch (err: any) {
    console.error(`Failed to save content for ${slug}:`, err);
    return { success: false, error: err.message };
  }
}

/**
 * Get all 11 institutions list for directory and bands
 */
export async function getAllInstitutions(): Promise<any[]> {
  const files = fs.readdirSync(INSTITUTIONS_DIR).filter((f) => f.endsWith(".json"));
  const list: any[] = [];

  for (const file of files) {
    const slug = file.replace(".json", "");
    const data = await getPageContent(slug);
    if (data) {
      list.push(data);
    }
  }

  // Order: Bangarpet schools first, Bangarpet colleges, Bangalore schools
  return list.sort((a, b) => {
    const orderScore = (inst: any) => {
      let score = 0;
      if (inst.location === "Bangarpet") score += 0;
      else score += 100;

      if (inst.slug.includes("nursery")) score += 1;
      else if (inst.slug.includes("primary") && !inst.slug.includes("higher")) score += 2;
      else if (inst.slug.includes("higher-primary")) score += 3;
      else if (inst.slug.includes("high-school")) score += 4;
      else if (inst.slug.includes("pu-college")) score += 5;
      else if (inst.slug.includes("degree")) score += 6;
      else if (inst.slug.includes("ded")) score += 7;
      return score;
    };
    return orderScore(a) - orderScore(b);
  });
}

/**
 * Save an admission or general contact inquiry
 */
export async function saveInquiry(inquiry: {
  name: string;
  phone: string;
  email?: string;
  institution?: string;
  message: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const record = {
    ...inquiry,
    createdAt: new Date().toISOString(),
    status: "New",
  };

  const db = await getDatabase();
  if (db) {
    try {
      const res = await db.collection("inquiries").insertOne(record);
      return { success: true, id: res.insertedId.toString() };
    } catch (e: any) {
      console.warn("MongoDB failed to insert inquiry, writing to local file:", e);
    }
  }

  // Fallback to local data/inquiries.json
  try {
    const inqPath = path.join(process.cwd(), "data", "inquiries.json");
    let list: any[] = [];
    if (fs.existsSync(inqPath)) {
      list = JSON.parse(fs.readFileSync(inqPath, "utf-8"));
    }
    const id = "inq_" + Date.now();
    list.unshift({ ...record, _id: id });
    fs.writeFileSync(inqPath, JSON.stringify(list, null, 2), "utf-8");
    return { success: true, id };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Get all submitted inquiries
 */
export async function getAllInquiries(): Promise<any[]> {
  const db = await getDatabase();
  if (db) {
    try {
      const list = await db.collection("inquiries").find({}).sort({ createdAt: -1 }).toArray();
      return list.map((item) => ({ ...item, _id: item._id.toString() }));
    } catch (e) {
      console.warn("MongoDB failed reading inquiries, checking local fallback:", e);
    }
  }

  const inqPath = path.join(process.cwd(), "data", "inquiries.json");
  if (fs.existsSync(inqPath)) {
    try {
      return JSON.parse(fs.readFileSync(inqPath, "utf-8"));
    } catch (e) {
      return [];
    }
  }
  return [];
}
