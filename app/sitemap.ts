import { MetadataRoute } from "next";
import { statSync } from "fs";
import { join } from "path";
import { getAllInstitutions } from "@/lib/content";

const BASE_URL = "https://santoshdedcollege.com";

function fileMtime(relativePath: string): Date {
  try {
    return statSync(join(process.cwd(), relativePath)).mtime;
  } catch {
    return new Date();
  }
}

const STATIC_ROUTES: Array<{
  path: string;
  file: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "/", file: "data/content/home.json", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", file: "data/content/about.json", priority: 0.8, changeFrequency: "monthly" },
  { path: "/institutions", file: "data/content/home.json", priority: 0.9, changeFrequency: "monthly" },
  { path: "/academics", file: "data/content/academics.json", priority: 0.8, changeFrequency: "monthly" },
  { path: "/admissions", file: "data/content/admissions.json", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact", file: "data/content/contact.json", priority: 0.7, changeFrequency: "yearly" },
  { path: "/campus-life", file: "data/content/campus-life.json", priority: 0.7, changeFrequency: "monthly" },
  { path: "/gallery", file: "data/content/gallery.json", priority: 0.6, changeFrequency: "weekly" },
  { path: "/student-life", file: "data/content/student-life.json", priority: 0.7, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const institutions = await getAllInstitutions();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, file, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: fileMtime(file),
    changeFrequency,
    priority,
  }));

  const institutionEntries: MetadataRoute.Sitemap = institutions.map((inst) => ({
    url: `${BASE_URL}/institutions/${inst.slug}`,
    lastModified: fileMtime(`data/content/institutions/${inst.slug}.json`),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticEntries, ...institutionEntries];
}
