/* POST /api/rsvp
   Saves each reply as a small JSON file in Vercel Blob (when a Blob store is connected
   to the project) and logs a line you can read in Vercel > Logs. Only the rounded
   distance is stored, never coordinates.
   Abuse protection: same-origin only, JSON only, size cap, honeypot, minimum fill time,
   link-spam filter and per-IP / global rate limits. */
const crypto = require("crypto");
const { blobCall, clientIp, allow, retryAfter, sameOrigin, localEnabled, localStore } = require("./_lib");

const clean = (v, n) => String(v == null ? "" : v).replace(/[\u0000-\u001f\u007f<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, n);
/* stops spreadsheet formula injection if the RSVPs are ever exported to CSV / Excel */
const plain = (s) => (/^[=+\-@]/.test(s) ? "'" + s : s);
const spammy = (s) => /(https?:\/\/|www\.|\.(com|net|org|ru|xyz|top)\b)/i.test(s);
const bad = (res, status, error) => res.status(status).json({ ok: false, error });

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return bad(res, 405, "method"); }
  if (!sameOrigin(req)) return bad(res, 403, "origin");
  if (!/^application\/json\b/i.test(req.headers["content-type"] || "")) return bad(res, 415, "type");
  if (Number(req.headers["content-length"] || 0) > 4096) return bad(res, 413, "size");

  const ip = clientIp(req);
  if (!allow("rsvp:" + ip, 10, 10 * 60e3) || !allow("rsvp:all", 300, 3600e3)) {
    res.setHeader("Retry-After", String(retryAfter("rsvp:" + ip, 10 * 60e3)));
    return bad(res, 429, "rate");
  }

  let b = req.body;
  if (typeof b === "string") { try { b = JSON.parse(b); } catch (e) { b = null; } }
  if (!b || typeof b !== "object" || Array.isArray(b)) return bad(res, 400, "body");

  /* honeypot: real people never fill it, so pretend it worked and store nothing */
  if (b.website) return res.status(200).json({ ok: true });
  /* the page sends how long it was open; a form filled in under 2.5 s is a script */
  if (!(Number(b.t) >= 2500)) return bad(res, 400, "fast");

  const name = plain(clean(b.name, 80));
  if (!name) return bad(res, 400, "name");
  const message = plain(clean(b.message, 300));
  if (spammy(name) || spammy(message)) return res.status(200).json({ ok: true });

  const attending = b.attending === "no" ? "no" : "yes";
  const guests = attending === "yes" ? Math.min(10, Math.max(1, parseInt(b.guests, 10) || 1)) : 0;
  const dist = Number(b.distanceKm);

  let city = "";
  try { city = decodeURIComponent(String(req.headers["x-vercel-ip-city"] || "")); } catch (e) {}

  const rec = {
    id: crypto.randomBytes(4).toString("hex"),
    at: new Date().toISOString(),
    name,
    attending,
    guests,
    message,
    distanceKm: Number.isFinite(dist) && dist >= 0 && dist < 25000 ? Math.round(dist * 10) / 10 : null,
    lang: b.lang === "gu" ? "gu" : "en",
    city: clean(city, 60) || null,
    country: clean(req.headers["x-vercel-ip-country"], 4) || null
  };

  console.log("RSVP " + JSON.stringify(rec));

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { put } = require("@vercel/blob");
      const pathname = "rsvp/" + rec.at.replace(/[:.]/g, "-") + "-" + rec.id + ".json";
      await blobCall((access) => put(pathname, JSON.stringify(rec), { access, contentType: "application/json", addRandomSuffix: true }));
    } catch (e) {
      console.error("RSVP blob write failed: " + e.message);
    }
  } else if (localEnabled()) {
    try { localStore.add(rec); } catch (e) { console.error("local RSVP save failed: " + e.message); }
  }

  return res.status(200).json({ ok: true });
};
