/* Shared helpers for the API routes. The leading underscore stops Vercel from
   exposing this file as an endpoint. */
const fs = require("fs");
const path = require("path");
const hits = new Map();

/* Local development only: `npm run dev` sets LOCAL_DEV=1, and then RSVPs go to a file instead of
   Vercel Blob, so /api/admin works without any cloud setup. Never active on Vercel. */
const LOCAL_FILE = path.join(__dirname, "..", ".local-data", "rsvp.jsonl");
const localEnabled = () => process.env.LOCAL_DEV === "1";
const localStore = {
  add(rec) { fs.mkdirSync(path.dirname(LOCAL_FILE), { recursive: true }); fs.appendFileSync(LOCAL_FILE, JSON.stringify(rec) + "\n"); },
  all() {
    try { return fs.readFileSync(LOCAL_FILE, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)); } catch (e) { return []; }
  }
};

/* Blob access: "private" (default) keeps RSVP files readable only with the store token.
   Set BLOB_ACCESS=public in Vercel only if the connected Blob store was created as public. */
const ACCESS = process.env.BLOB_ACCESS === "public" ? "public" : "private";

/* A Blob store is either private or public, and calls must say which. Try the preferred mode first and,
   if the store turns out to be the other kind, switch and remember it. blobAccess() reports what worked. */
let working = null;
async function blobCall(fn) {
  const order = working ? [working] : [ACCESS, ACCESS === "private" ? "public" : "private"];
  let lastErr;
  for (const access of order) {
    try { const result = await fn(access); working = access; return result; }
    catch (e) { lastErr = e; if (!/access|private|public/i.test(String((e && e.message) || ""))) break; }
  }
  throw lastErr;
}
const blobAccess = () => working;

const clientIp = (req) =>
  String(req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || (req.socket && req.socket.remoteAddress) || "unknown")
    .split(",")[0].trim();

/* Sliding-window counters. They live in memory, so each server instance counts on its
   own: they slow bots down, and Vercel Firewall rate limiting is the hard stop. */
function recent(key, windowMs) {
  const now = Date.now();
  const list = (hits.get(key) || []).filter((t) => now - t < windowMs);
  hits.set(key, list);
  return list;
}

function record(key) {
  const list = hits.get(key) || [];
  list.push(Date.now());
  hits.set(key, list);
  if (hits.size > 5000) {
    const cutoff = Date.now() - 3600e3;
    for (const [k, v] of hits) if (!v.length || v[v.length - 1] < cutoff) hits.delete(k);
  }
}

/* true = allowed (and counted), false = over the limit */
function allow(key, limit, windowMs) {
  if (recent(key, windowMs).length >= limit) return false;
  record(key);
  return true;
}

function retryAfter(key, windowMs) {
  const list = recent(key, windowMs);
  return list.length ? Math.max(1, Math.ceil((windowMs - (Date.now() - list[0])) / 1000)) : 1;
}

/* The request host, or null if it does not look like a plain hostname (stops header injection). */
function safeHost(req) {
  const host = String(req.headers["x-forwarded-host"] || req.headers.host || "").split(",")[0].trim().toLowerCase();
  return /^[a-z0-9.-]+(:\d{1,5})?$/.test(host) ? host : null;
}

/* Browsers always send Origin on a POST; it must match this site. */
function sameOrigin(req) {
  const host = safeHost(req);
  if (!host || !req.headers.origin) return false;
  try { return new URL(req.headers.origin).host === host; } catch (e) { return false; }
}

module.exports = { ACCESS, blobCall, blobAccess, clientIp, recent, record, allow, retryAfter, safeHost, sameOrigin, localEnabled, localStore };
