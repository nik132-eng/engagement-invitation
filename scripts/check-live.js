/* npm run check                           read-only smoke test of the live site
   npm run check -- https://other-domain   test another address
   ADMIN_KEY='your live key' npm run check also proves the admin key works and the Blob store is connected
   Only harmless requests are sent (plain GETs, and requests that must be refused). It never saves an RSVP.
   The key is read from your shell only, never from .env.local (that one is for local runs). */
const DEFAULT_URL = "https://nikunj-ayushi-engagement-invitation.vercel.app";
const base = (process.argv[2] || process.env.SITE_URL || DEFAULT_URL).replace(/\/$/, "");
const key = process.env.ADMIN_KEY || "";

let fails = 0, warns = 0;
const pass = (m) => console.log("  PASS  " + m);
const fail = (m) => { fails++; console.log("  FAIL  " + m); };
const warn = (m) => { warns++; console.log("  WARN  " + m); };
const check = (cond, okMsg, badMsg, soft) => (cond ? pass(okMsg) : (soft ? warn : fail)(badMsg));
const req = (p, opts) => fetch(base + p, Object.assign({ redirect: "manual" }, opts));
const json = async (r) => { try { return await r.json(); } catch (e) { return {}; } };

(async () => {
  console.log("Checking " + base + "\n");

  console.log("Page");
  const home = await req("/");
  const html = await home.text();
  check(home.status === 200 && /Nikunj/.test(html), "home page loads (200)", "home page returned " + home.status);
  check(!/REPLACE-WITH-YOUR-DOMAIN/.test(html), "share-preview tags have no placeholder left", "index.html still contains REPLACE-WITH-YOUR-DOMAIN");
  check(html.includes(base + "/assets/og-image.png"), "share preview points at this domain", "og:image does not point at " + base + " (fine if you use a custom domain, update index.html)", true);
  const og = await req("/assets/og-image.png");
  check(og.status === 200 && /image\/png/.test(og.headers.get("content-type") || ""), "share-preview image loads", "og-image.png returned " + og.status);
  const places = await req("/assets/places.json");
  check(places.status === 200 && /json/.test(places.headers.get("content-type") || ""), "city list for the guest's place name loads", "assets/places.json returned " + places.status);
  const robots = await req("/robots.txt"), sitemap = await req("/sitemap.xml");
  check(robots.status === 200 && /Sitemap:/.test(await robots.text()), "robots.txt works", "robots.txt returned " + robots.status);
  check(sitemap.status === 200 && /<loc>/.test(await sitemap.text()), "sitemap.xml works", "sitemap.xml returned " + sitemap.status);

  console.log("\nSecurity headers");
  const h = (n) => home.headers.get(n) || "";
  const csp = h("content-security-policy");
  const scriptSrc = (csp.match(/script-src([^;]*)/) || [, ""])[1];
  check(csp && !/'unsafe-inline'|'unsafe-eval'/.test(scriptSrc), "Content-Security-Policy blocks inline scripts", "Content-Security-Policy missing or allows inline scripts");
  check(/frame-ancestors 'none'/.test(csp) && /DENY/i.test(h("x-frame-options")), "cannot be framed by other sites", "framing protection missing");
  check(/max-age=\d{7,}/.test(h("strict-transport-security")), "HTTPS-only (HSTS)", "Strict-Transport-Security missing");
  check(/nosniff/i.test(h("x-content-type-options")), "nosniff", "X-Content-Type-Options missing");
  check(!!h("referrer-policy") && !!h("permissions-policy"), "Referrer-Policy and Permissions-Policy set", "Referrer-Policy or Permissions-Policy missing");

  console.log("\nPrivate files");
  for (const p of ["/.env.local", "/.env.blob", "/.git/config", "/api/_lib"]) {
    const r = await req(p);
    check(r.status === 404, p + " is not served (404)", p + " returned " + r.status + " (should be 404)");
  }
  const sc = await req("/scripts/dev-server.js");
  check(sc.status === 404, "/scripts is not served", "/scripts/dev-server.js is public (harmless, but .vercelignore did not hide it)", true);

  console.log("\nRSVP endpoint (only requests that must be refused)");
  const getR = await req("/api/rsvp");
  check(getR.status === 405, "GET is refused (405)", "GET /api/rsvp returned " + getR.status);
  const foreign = await req("/api/rsvp", { method: "POST", headers: { origin: "https://evil.example", "content-type": "application/json" }, body: '{"name":"x","t":5000}' });
  check(foreign.status === 403, "request from another website is refused (403)", "foreign-origin POST returned " + foreign.status);
  const notJson = await req("/api/rsvp", { method: "POST", headers: { origin: base, "content-type": "text/plain" }, body: "name=x" });
  check(notJson.status === 415, "non-JSON body is refused (415)", "text/plain POST returned " + notJson.status);

  console.log("\nAdmin endpoint");
  const noKey = await req("/api/admin");
  const nk = await json(noKey);
  if (noKey.status === 401) pass("refuses requests without the key (401)");
  else if (noKey.status === 503) warn("ADMIN_KEY problem on Vercel: " + nk.error + ". Fix the environment variable and redeploy.");
  else fail("GET /api/admin without a key returned " + noKey.status);
  check(/no-store/.test(noKey.headers.get("cache-control") || ""), "admin responses are never cached", "admin response is cacheable");

  if (!key) {
    console.log("  SKIP  admin key test (run: ADMIN_KEY='your live key' npm run check)");
  } else {
    const r = await req("/api/admin", { headers: { "x-admin-key": key } });
    const d = await json(r);
    if (r.status === 200 && d.ok) {
      pass("admin key works; " + d.totals.replies + " reply(ies), " + d.totals.attending + " attending, " + d.totals.totalGuests + " guests");
      check(d.storage === "private", "RSVPs are stored in a private Blob store", "Blob store is '" + d.storage + "'. A private store keeps guests' names unreadable by URL", d.storage === "empty store" || d.storage === "public");
    } else if (r.status === 503 && /Blob/.test(d.error || "")) fail("admin key works but no Blob store is connected: Vercel -> Storage -> connect it to this project, then redeploy");
    else if (r.status === 503) fail("Vercel says: " + d.error);
    else if (r.status === 401) fail("that ADMIN_KEY does not match the one set on Vercel");
    else if (r.status === 429) warn("too many wrong keys earlier: wait 15 minutes");
    else fail("admin returned " + r.status);
  }

  console.log("\n" + (fails ? fails + " FAILED" : "All checks passed") + (warns ? ", " + warns + " warning(s)" : "") + ".");
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error("Could not reach " + base + ": " + e.message); process.exit(1); });
