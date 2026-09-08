const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert");

const CONTENT_DIR = path.join(__dirname, "../data/content");
const INSTITUTIONS_DIR = path.join(CONTENT_DIR, "institutions");

console.log("Running content schemas & editor mutation checks...");

// 1. Verify all content files parse cleanly
const mainFiles = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".json"));
const instFiles = fs.readdirSync(INSTITUTIONS_DIR).filter((f) => f.endsWith(".json"));

assert(mainFiles.length === 8, `Expected 8 main content files, found ${mainFiles.length}`);
assert(instFiles.length === 11, `Expected 11 institution files, found ${instFiles.length}`);

for (const file of mainFiles) {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
  const parsed = JSON.parse(raw);
  assert(parsed.slug, `File ${file} missing slug`);
  assert(parsed.metaTitle, `File ${file} missing metaTitle`);
}

for (const file of instFiles) {
  const raw = fs.readFileSync(path.join(INSTITUTIONS_DIR, file), "utf-8");
  const parsed = JSON.parse(raw);
  assert(parsed.slug, `Institution ${file} missing slug`);
  assert(parsed.name, `Institution ${file} missing name`);
}

console.log("✓ All 19 content JSON files are structurally valid.");

// 2. Test deep updater logic (simulating handleFieldChange)
function handleFieldChange(obj, keyPath, value) {
  const updated = JSON.parse(JSON.stringify(obj));
  let current = updated;
  for (let i = 0; i < keyPath.length - 1; i++) {
    current = current[keyPath[i]];
  }
  current[keyPath[keyPath.length - 1]] = value;
  return updated;
}

function handleArrayAdd(obj, keyPath, template) {
  const updated = JSON.parse(JSON.stringify(obj));
  let current = updated;
  for (let i = 0; i < keyPath.length; i++) {
    current = current[keyPath[i]];
  }
  if (Array.isArray(current)) {
    current.push(template);
  }
  return updated;
}

function handleArrayRemove(obj, keyPath, index) {
  const updated = JSON.parse(JSON.stringify(obj));
  let current = updated;
  for (let i = 0; i < keyPath.length; i++) {
    current = current[keyPath[i]];
  }
  if (Array.isArray(current)) {
    current.splice(index, 1);
  }
  return updated;
}

// Test on home.json
const homeData = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, "home.json"), "utf-8"));
const mod1 = handleFieldChange(homeData, ["hero", "eyebrow"], "UPDATED EYEBROW");
assert.strictEqual(mod1.hero.eyebrow, "UPDATED EYEBROW");

const mod2 = handleFieldChange(homeData, ["stats", 0, "value"], "99+");
assert.strictEqual(mod2.stats[0].value, "99+");

const initialStatsLen = homeData.stats.length;
const mod3 = handleArrayAdd(homeData, ["stats"], { value: "5000+", label: "Alumni Network" });
assert.strictEqual(mod3.stats.length, initialStatsLen + 1);
assert.strictEqual(mod3.stats[mod3.stats.length - 1].label, "Alumni Network");

const mod4 = handleArrayRemove(mod3, ["stats"], mod3.stats.length - 1);
assert.strictEqual(mod4.stats.length, initialStatsLen);

// Test on about.json (nested arrays of strings: chairmanMessage.text)
const aboutData = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, "about.json"), "utf-8"));
const initialAboutParas = aboutData.chairmanMessage.text.length;
const modAbout = handleArrayAdd(aboutData, ["chairmanMessage", "text"], "New paragraph added by editor.");
assert.strictEqual(modAbout.chairmanMessage.text.length, initialAboutParas + 1);
const modAboutRemoved = handleArrayRemove(modAbout, ["chairmanMessage", "text"], initialAboutParas);
assert.strictEqual(modAboutRemoved.chairmanMessage.text.length, initialAboutParas);

// Test on fathima-pu-college.json (keyFacts and streams)
const puData = JSON.parse(fs.readFileSync(path.join(INSTITUTIONS_DIR, "fathima-pu-college.json"), "utf-8"));
const modStreams = handleFieldChange(puData, ["streams", 0, "subjects"], "Physics, Chemistry, Math, AI");
assert.strictEqual(modStreams.streams[0].subjects, "Physics, Chemistry, Math, AI");

console.log("✓ Deep mutations, array additions, and removals verified across pages.");
console.log("\nAll content editor checks passed successfully!");
