/* GET /api/admin?key=YOUR_ADMIN_KEY   (developer only)
   Returns every RSVP plus totals. Set ADMIN_KEY in Vercel > Settings > Environment Variables.
   Without ADMIN_KEY set, this endpoint is disabled. */
const crypto = require("crypto");

const same = (a, b) => {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex");
  const key = process.env.ADMIN_KEY;
  if (!key) return res.status(503).json({ ok: false, error: "ADMIN_KEY is not set" });
  const given = (req.query && req.query.key) || req.headers["x-admin-key"] || "";
  if (!same(given, key)) return res.status(401).json({ ok: false, error: "unauthorized" });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return res.status(503).json({ ok: false, error: "No Blob store connected" });

  try {
    const { list } = require("@vercel/blob");
    let cursor, blobs = [];
    do {
      const page = await list({ prefix: "rsvp/", cursor, limit: 1000 });
      blobs = blobs.concat(page.blobs);
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);

    const rows = (await Promise.all(blobs.map(b => fetch(b.url).then(r => r.json()).catch(() => null)))).filter(Boolean)
      .sort((a, b) => a.at.localeCompare(b.at));
    const yes = rows.filter(r => r.attending === "yes"), no = rows.filter(r => r.attending === "no");
    const dists = yes.map(r => r.distanceKm).filter(d => typeof d === "number");
    return res.status(200).json({
      ok: true,
      totals: {
        replies: rows.length,
        attending: yes.length,
        notAttending: no.length,
        totalGuests: yes.reduce((s, r) => s + (r.guests || 0), 0),
        averageDistanceKm: dists.length ? Math.round(dists.reduce((s, d) => s + d, 0) / dists.length * 10) / 10 : null,
        farthestKm: dists.length ? Math.max.apply(null, dists) : null
      },
      rsvps: rows
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
