const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert");
const ts = require("typescript");
const { NextRequest, NextResponse } = require("next/server");

// Transpile middleware.ts to CommonJS in-memory
const source = fs.readFileSync(path.join(__dirname, "../middleware.ts"), "utf-8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

// Load module in a sandbox/eval context
const mod = { exports: {} };
const fn = new Function("require", "exports", "module", transpiled);
fn(require, mod.exports, mod);
const { middleware, config } = mod.exports;

assert(typeof middleware === "function", "middleware must export a function");
assert(Array.isArray(config?.matcher), "config.matcher must be an array");

// Helper to create NextRequest with mock cookies and URL
function createReq(urlStr, cookies = {}) {
  const req = new NextRequest(new URL(urlStr, "http://localhost:8945"));
  for (const [k, v] of Object.entries(cookies)) {
    req.cookies.set(k, v);
  }
  return req;
}

console.log("Running middleware logic verification...");

// 1. Unauthenticated /admin -> Redirect to /admin/login
const res1 = middleware(createReq("http://localhost:8945/admin"));
assert(res1 && res1.status >= 300 && res1.status < 400, "Unauthenticated /admin must redirect");
assert(res1.headers.get("location")?.includes("/admin/login"), "Redirect must point to /admin/login");
console.log("✓ Test 1: Unauthenticated /admin redirects to /admin/login");

// 2. Unauthenticated child page /admin/inquiries -> Redirect to /admin/login
const res2 = middleware(createReq("http://localhost:8945/admin/inquiries"));
assert(res2 && res2.status >= 300 && res2.status < 400, "Unauthenticated /admin/inquiries must redirect");
assert(res2.headers.get("location")?.includes("/admin/login"), "Redirect must point to /admin/login");
console.log("✓ Test 2: Unauthenticated /admin/inquiries redirects to /admin/login");

// 3. Unauthenticated /admin/login -> Allowed (falls through to next())
const res3 = middleware(createReq("http://localhost:8945/admin/login"));
// NextResponse.next() returns a response without redirect status
assert(!res3 || res3.status === 200, "Unauthenticated /admin/login must be accessible");
assert(!res3.headers.get("location"), "/admin/login must not redirect");
console.log("✓ Test 3: Unauthenticated /admin/login is allowed");

// 4. Authenticated /admin -> Allowed
const res4 = middleware(createReq("http://localhost:8945/admin", { sgi_admin_session: "authenticated" }));
assert(!res4 || res4.status === 200, "Authenticated /admin must be accessible");
assert(!res4.headers.get("location"), "Authenticated /admin must not redirect");
console.log("✓ Test 4: Authenticated /admin is allowed");

// 5. Unauthenticated /api/admin/content -> 401 Unauthorized
const res5 = middleware(createReq("http://localhost:8945/api/admin/content"));
assert(res5 && res5.status === 401, "Unauthenticated /api/admin/content must return 401");
console.log("✓ Test 5: Unauthenticated /api/admin/content returns 401");

// 6. Login API /api/admin/auth -> Allowed without auth cookie
const res6 = middleware(createReq("http://localhost:8945/api/admin/auth"));
assert(!res6 || res6.status === 200, "Auth API endpoint must be accessible without cookie");
console.log("✓ Test 6: Auth API /api/admin/auth is accessible");

console.log("\nAll 6 middleware checks passed successfully!");
