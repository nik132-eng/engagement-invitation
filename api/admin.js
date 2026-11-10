/* GET /api/admin   (developer only)
   Returns every RSVP plus totals. Send the key as the `x-admin-key` header, as
   `Authorization: Bearer <key>`, or (less safe: it ends up in browser history) as ?key=.
   Set ADMIN_KEY in Vercel > Settings > Environment Variables, at least 20 random
   characters (for example: openssl rand -base64 32). Without a strong key set, this
   endpoint is disabled. Repeated wrong keys are blocked for 15 minutes. */
const crypto = require("crypto");
const { ACCESS, clientIp, recent, record, retryAfter, localEnabled, localStore } = require("./_lib");

const MIN_KEY = 20, FAIL_LIMIT = 5, FAIL_WINDOW = 15 * 60e3;
const sha = (s) => crypto.createHash("sha256").update(String(s)).digest();
/* hashing first makes both sides the same length, so the comparison leaks nothing */
const same = (a, b) => crypto.timingSafeEqual(sha(a), sha(b));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const send = (res, status, body) => res.status(status).json(body);

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.setHeader("Referrer-Policy", "no-referrer");
  if (req.method !== "GET") { res.setHeader("Allow", "GET"); return send(res, 405, { ok: false, error: "method" }); }

  const key = process.env.ADMIN_KEY;
  if (!key) return send(res, 503, { ok: false, error: "ADMIN_KEY is not set" });
  if (key.length < MIN_KEY) return send(res, 503, { ok: false, error: "ADMIN_KEY must be at least " + MIN_KEY + " characters" });

  const failKey = "admin-fail:" + clientIp(req);
  if (recent(failKey, FAIL_WINDOW).length >= FAIL_LIMIT) {
    res.setHeader("Retry-After", String(retryAfter(failKey, FAIL_WINDOW)));
    return send(res, 429, { ok: false, error: "too many attempts" });
  }

  const auth = String(req.headers.authorization || "");
  const given = req.headers["x-admin-key"] || (auth.startsWith("Bearer ") ? auth.slice(7) : "") || (req.query && req.query.key) || "";
  if (!same(given, key)) {
    record(failKey);
    await sleep(400);
    return send(res, 401, { ok: false, error: "unauthorized" });
  }
  const useLocal = !process.env.BLOB_READ_WRITE_TOKEN && localEnabled();
  if (!process.env.BLOB_READ_WRITE_TOKEN && !useLocal) return send(res, 503, { ok: false, error: "No Blob store connected" });

  try {
    let rows;
    if (useLocal) {
      rows = localStore.all();
    } else {
      const { list, get } = require("@vercel/blob");
      let cursor, blobs = [];
      do {
        const page = await list({ prefix: "rsvp/", cursor, limit: 1000 });
        blobs = blobs.concat(page.blobs);
        cursor = page.hasMore ? page.cursor : undefined;
      } while (cursor);

      const read = async (b) => {
        try {
          const r = await get(b.pathname, { access: ACCESS });
          return r && r.stream ? JSON.parse(await new Response(r.stream).text()) : null;
        } catch (e) { return null; }
      };
      rows = (await Promise.all(blobs.map(read))).filter(Boolean);
    }
    rows.sort((a, b) => a.at.localeCompare(b.at));
    const yes = rows.filter((r) => r.attending === "yes"), no = rows.filter((r) => r.attending === "no");
    const dists = yes.map((r) => r.distanceKm).filter((d) => typeof d === "number");
    return send(res, 200, {
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
    console.error("admin read failed: " + e.message);
    return send(res, 500, { ok: false, error: "server error" });
  }
};
