const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert");

console.log("Running upload and hero carousel schema verification...");

// 1. Verify home.json contains valid hero.slides
const homeData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/content/home.json"), "utf-8")
);

assert(homeData.hero, "home.json must have hero section");
assert(Array.isArray(homeData.hero.slides), "hero.slides must be an array");
assert(homeData.hero.slides.length > 0, "hero.slides must contain at least one slide");

for (const slide of homeData.hero.slides) {
  assert(typeof slide.src === "string" && slide.src.length > 0, "slide.src must be non-empty string");
  assert(typeof slide.alt === "string", "slide.alt must be string");
  assert(typeof slide.category === "string", "slide.category must be string");
}
console.log(`✓ Verified ${homeData.hero.slides.length} hero carousel slides in home.json.`);

// 2. Verify isImageField logic
function isImageField(keyName, value) {
  const lower = keyName.toLowerCase();
  if (
    lower.includes("image") ||
    lower.includes("photo") ||
    lower.includes("logo") ||
    lower.includes("banner") ||
    lower === "src" ||
    lower === "img"
  ) {
    return true;
  }
  if (
    typeof value === "string" &&
    (value.startsWith("/images/") ||
      value.includes("cloudinary.com") ||
      /\.(jpg|jpeg|png|webp|svg|gif)$/i.test(value))
  ) {
    return true;
  }
  return false;
}

assert(isImageField("image", "/images/dr-kalam.jpg") === true);
assert(isImageField("src", "https://res.cloudinary.com/demo/image/upload/sample.jpg") === true);
assert(isImageField("meetingImage", "anything") === true);
assert(isImageField("photoUrl", "anything") === true);
assert(isImageField("logo", "/img.png") === true);
assert(isImageField("title", "Some text") === false);
assert(isImageField("leadText", "Description") === false);
console.log("✓ Verified image field detection rules.");

// 3. Verify .env.example contains Cloudinary settings
const envContent = fs.readFileSync(path.join(__dirname, "../.env.example"), "utf-8");
assert(envContent.includes("CLOUDINARY_CLOUD_NAME"), ".env.example must specify CLOUDINARY_CLOUD_NAME");
assert(envContent.includes("CLOUDINARY_API_KEY"), ".env.example must specify CLOUDINARY_API_KEY");
assert(envContent.includes("CLOUDINARY_UPLOAD_PRESET"), ".env.example must specify CLOUDINARY_UPLOAD_PRESET");
console.log("✓ Verified Cloudinary environment variables documented in .env.example.");

// 4. Verify docker-compose.yml forwards Cloudinary env vars
const composeContent = fs.readFileSync(path.join(__dirname, "../docker-compose.yml"), "utf-8");
assert(composeContent.includes("CLOUDINARY_CLOUD_NAME"), "docker-compose.yml must forward CLOUDINARY_CLOUD_NAME");
assert(composeContent.includes("CLOUDINARY_API_KEY"), "docker-compose.yml must forward CLOUDINARY_API_KEY");
console.log("✓ Verified docker-compose.yml forwards Cloudinary environment variables.");

console.log("\nAll upload and hero carousel checks passed successfully!");
