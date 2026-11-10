/* POST /api/rsvp
   Saves each reply as a small JSON file in Vercel Blob (when a Blob store is
   connected to the project) and always writes a log line you can read in
   Vercel > Logs. Only the rounded distance is stored, never coordinates. */
const crypto = require("crypto");

const clean = (v, n) => String(v == null ? "" : v).replace(/[\u0000-\u001f<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, n);

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "method" });

  let b = req.body;
  if (typeof b === "string") { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  b = b || {};

  const name = clean(b.name, 80);
  if (!name) return res.status(400).json({ ok: false, error: "name" });

  const attending = b.attending === "no" ? "no" : "yes";
  const guests = attending === "yes" ? Math.min(10, Math.max(1, parseInt(b.guests, 10) || 1)) : 0;
  const dist = Number(b.distanceKm);

  const rec = {
    id: crypto.randomBytes(4).toString("hex"),
    at: new Date().toISOString(),
    name,
    attending,
    guests,
    message: clean(b.message, 300),
    distanceKm: Number.isFinite(dist) && dist >= 0 && dist < 25000 ? Math.round(dist * 10) / 10 : null,
    lang: b.lang === "gu" ? "gu" : "en",
    city: clean(decodeURIComponent(String(req.headers["x-vercel-ip-city"] || "")), 60) || null,
    country: clean(req.headers["x-vercel-ip-country"], 4) || null
  };

  console.log("RSVP " + JSON.stringify(rec));

  let stored = false;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { put } = require("@vercel/blob");
      await put("rsvp/" + rec.at.replace(/[:.]/g, "-") + "-" + rec.id + ".json", JSON.stringify(rec), {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: true
      });
      stored = true;
    } catch (e) {
      console.error("RSVP blob write failed: " + e.message);
    }
  }

  return res.status(200).json({ ok: true, stored });
};
