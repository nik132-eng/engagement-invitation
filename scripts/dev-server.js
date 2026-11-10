/* Local stand-in for Vercel:  npm run dev   ->  http://localhost:3000
   - serves this folder with the same security headers as vercel.json
   - runs the api/*.js functions (RSVP, admin, sitemap, robots) and the vercel.json rewrites
   - reads .env.local (git-ignored) for ADMIN_KEY and friends
   - saves RSVPs to .local-data/rsvp.jsonl instead of Vercel Blob (so /api/admin works offline)
   Options: PORT=4000 npm run dev      HOST=0.0.0.0 npm run dev   (to open it from your phone on the same Wi-Fi) */
const http = require("http"), fs = require("fs"), path = require("path"), url = require("url");

const ROOT = path.resolve(__dirname, "..");
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "127.0.0.1";

function loadEnv(file) {
  let text;
  try { text = fs.readFileSync(file, "utf8"); } catch (e) { return; }
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!m || line.trim().startsWith("#")) continue;
    const value = m[2].replace(/^(['"])(.*)\1$/, "$2");
    if (!(m[1] in process.env)) process.env[m[1]] = value;
  }
}
loadEnv(path.join(ROOT, ".env.local"));
loadEnv(path.join(ROOT, ".env"));
process.env.LOCAL_DEV = "1"; /* switches api/_lib.js to the local RSVP file */

const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, "vercel.json"), "utf8"));
const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".ico": "image/x-icon", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".mp3": "audio/mpeg"
};
/* never served, same as on Vercel where only the site files are public */
const hidden = (p) => p.split("/").some((s) => s.startsWith(".")) || /^\/(node_modules|scripts)(\/|$)/.test(p) || /^\/package(-lock)?\.json$/.test(p);

function headersFor(p) {
  const out = {};
  for (const h of cfg.headers || []) {
    if (new RegExp("^" + h.source.replace(/\(\.\*\)/g, ".*") + "$").test(p)) for (const x of h.headers) out[x.key] = x.value;
  }
  /* upgrade-insecure-requests would turn http://localhost files into https ones, so skip it here */
  if (out["Content-Security-Policy"]) out["Content-Security-Policy"] = out["Content-Security-Policy"].replace(/;?\s*upgrade-insecure-requests/, "");
  return out;
}

http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(url.parse(req.url).pathname || "/"); } catch (e) { res.statusCode = 400; return res.end("bad request"); }
  const query = url.parse(req.url, true).query;

  let p = pathname;
  for (const r of cfg.rewrites || []) if (r.source === p) p = r.destination;
  for (const [k, v] of Object.entries(headersFor(pathname))) res.setHeader(k, v);

  /* ---- API functions ---- */
  if (p.startsWith("/api/")) {
    const file = path.join(ROOT, p + ".js");
    if (p.includes("..") || path.basename(p).startsWith("_") || !fs.existsSync(file)) { res.statusCode = 404; return res.end("not found"); }
    res.status = (c) => { res.statusCode = c; return res; };
    res.json = (o) => { res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify(o)); return res; };
    res.send = (s) => { res.end(s); return res; };
    req.query = query;
    const chunks = []; let size = 0;
    req.on("data", (c) => { size += c.length; if (size > 65536) req.destroy(); else chunks.push(c); });
    req.on("end", async () => {
      const raw = Buffer.concat(chunks).toString();
      req.body = /json/i.test(req.headers["content-type"] || "") ? (() => { try { return JSON.parse(raw); } catch (e) { return undefined; } })() : raw;
      try { await require(file)(req, res); } catch (e) { console.error(e); res.statusCode = 500; res.end("server error"); }
    });
    return;
  }

  /* ---- static files ---- */
  const target = path.join(ROOT, p === "/" ? "index.html" : p);
  if (!target.startsWith(ROOT + path.sep) || hidden(p) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) {
    res.statusCode = 404; return res.end("not found");
  }
  res.setHeader("Content-Type", types[path.extname(target).toLowerCase()] || "application/octet-stream");
  res.setHeader("Cache-Control", "no-store");
  fs.createReadStream(target).pipe(res);
}).listen(PORT, HOST, () => {
  console.log("Invitation running at http://" + (HOST === "0.0.0.0" ? "localhost" : HOST) + ":" + PORT);
  console.log(process.env.ADMIN_KEY ? "ADMIN_KEY loaded from .env.local: run `npm run admin` to see RSVPs." : "No ADMIN_KEY found: copy .env.example to .env.local to enable /api/admin.");
});
