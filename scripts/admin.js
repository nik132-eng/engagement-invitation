/* npm run admin  ->  prints the RSVPs collected by the local dev server (npm run dev).
   Reads ADMIN_KEY from .env.local, so the key never has to be typed or pasted into a URL.
   Another address:  ADMIN_URL=https://your-domain npm run admin   (ADMIN_KEY must be set in your shell then) */
const fs = require("fs"), path = require("path"), http = require("http"), https = require("https");

const envFile = path.resolve(__dirname, "..", ".env.local");
try {
  for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (m && !line.trim().startsWith("#") && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, "$2");
  }
} catch (e) { /* no .env.local: fall back to the shell environment */ }

const key = process.env.ADMIN_KEY;
if (!key) { console.error("ADMIN_KEY is not set. Copy .env.example to .env.local and set it."); process.exit(1); }

const base = (process.env.ADMIN_URL || "http://localhost:" + (process.env.PORT || 3000)).replace(/\/$/, "");
const client = base.startsWith("https") ? https : http;

client.get(base + "/api/admin", { headers: { "x-admin-key": key } }, (res) => {
  let body = "";
  res.on("data", (c) => (body += c));
  res.on("end", () => {
    let data;
    try { data = JSON.parse(body); } catch (e) { console.error("Unexpected response (" + res.statusCode + "):", body.slice(0, 200)); process.exit(1); }
    if (!data.ok) { console.error("Admin says (" + res.statusCode + "): " + data.error); process.exit(1); }
    console.log("\nTotals:", JSON.stringify(data.totals, null, 2));
    if (!data.rsvps.length) return console.log("\nNo RSVPs yet.");
    console.log("\nRSVPs:");
    for (const r of data.rsvps) {
      console.log("- " + r.at.slice(0, 16).replace("T", " ") + "  " + r.name + "  " + (r.attending === "yes" ? "coming x" + r.guests : "not coming") + (r.message ? '  "' + r.message + '"' : ""));
    }
  });
}).on("error", (e) => { console.error("Could not reach " + base + " (is `npm run dev` running?): " + e.message); process.exit(1); });
