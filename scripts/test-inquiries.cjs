const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert");
const ts = require("typescript");

// Transpile lib/mongodb.ts and lib/content.ts to test in node
function loadTsModule(relPath, customReq = require) {
  const source = fs.readFileSync(path.join(__dirname, relPath), "utf-8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  const mod = { exports: {} };
  const fn = new Function("require", "exports", "module", transpiled);
  fn(customReq, mod.exports, mod);
  return mod.exports;
}

const mongoMod = loadTsModule("../lib/mongodb.ts");
const contentMod = loadTsModule("../lib/content.ts", (id) => {
  if (id === "./mongodb") return mongoMod;
  return require(id);
});

const { saveInquiry, getAllInquiries } = contentMod;

async function runTest() {
  console.log("Testing inquiry save and retrieval pipeline...");

  const testInquiry = {
    name: "Ayan Test Parent",
    phone: "09988776655",
    email: "testparent@example.com",
    institution: "Fathima PU College",
    message: "Interested in PCMC course details and admission fee structure.",
  };

  // 1. Save inquiry
  const res = await saveInquiry(testInquiry);
  assert(res.success, `saveInquiry failed: ${res.error}`);
  assert(res.id, "saveInquiry should return an ID");
  console.log(`✓ Inquiry saved successfully with ID: ${res.id}`);

  // 2. Retrieve inquiries
  const inquiries = await getAllInquiries();
  assert(Array.isArray(inquiries), "getAllInquiries must return an array");
  assert(inquiries.length > 0, "Inquiries list should not be empty");

  const found = inquiries.find((inq) => inq.name === testInquiry.name && inq.phone === testInquiry.phone);
  assert(found, "Saved test inquiry should be present in getAllInquiries result");
  assert.strictEqual(found.institution, testInquiry.institution);
  assert.strictEqual(found.message, testInquiry.message);
  console.log(`✓ Retrieved ${inquiries.length} total inquiries, verified test inquiry in list.`);

  // 3. Clean up test record from data/inquiries.json
  const inqPath = path.join(__dirname, "../data/inquiries.json");
  if (fs.existsSync(inqPath)) {
    const list = JSON.parse(fs.readFileSync(inqPath, "utf-8"));
    const filtered = list.filter((i) => i.id !== res.id && i._id !== res.id && i.name !== testInquiry.name);
    fs.writeFileSync(inqPath, JSON.stringify(filtered, null, 2), "utf-8");
    console.log("✓ Cleaned up test record from local inquiries.json.");
  }

  console.log("\nAll inquiry tests passed successfully!");
}

runTest().catch((err) => {
  console.error("Inquiry test failed:", err);
  process.exit(1);
});
