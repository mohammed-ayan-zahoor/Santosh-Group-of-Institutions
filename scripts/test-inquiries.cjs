const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert");
const ts = require("typescript");

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

const { saveInquiry, getAllInquiries, deleteInquiry } = contentMod;

async function runTest() {
  console.log("Testing inquiry save, retrieve, and delete pipeline...");

  const testInquiry = {
    name: "Spam Inquiry Test",
    phone: "0123456789",
    email: "spambot@example.com",
    institution: "Central Office",
    message: "SEO rankings pitch message to be deleted.",
  };

  // 1. Save inquiry
  const res = await saveInquiry(testInquiry);
  assert(res.success, `saveInquiry failed: ${res.error}`);
  assert(res.id, "saveInquiry should return an ID");
  console.log(`✓ Inquiry saved with ID: ${res.id}`);

  // 2. Retrieve inquiries
  const beforeDelete = await getAllInquiries();
  const found = beforeDelete.find((inq) => inq._id === res.id || inq.id === res.id);
  assert(found, "Saved inquiry should be retrieved");
  console.log(`✓ Retrieved ${beforeDelete.length} inquiries, found saved test record.`);

  // 3. Delete inquiry
  const delRes = await deleteInquiry(res.id);
  assert(delRes.success, `deleteInquiry failed: ${delRes.error}`);
  console.log(`✓ Deleted inquiry with ID: ${res.id}`);

  // 4. Verify inquiry no longer exists
  const afterDelete = await getAllInquiries();
  const stillThere = afterDelete.find((inq) => inq._id === res.id || inq.id === res.id);
  assert(!stillThere, "Deleted inquiry should no longer exist in getAllInquiries result");
  console.log(`✓ Verified inquiry was removed. Current total: ${afterDelete.length}`);

  console.log("\nAll inquiry save, retrieve, and delete checks passed successfully!");
}

runTest().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
