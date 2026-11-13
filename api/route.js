/* GET /api/route?lat=..&lng=..  ->  { ok: true, km }
   Driving distance from the guest to the venue, asked of the OpenStreetMap routing service (OSRM)
   from the server, so browser ad-blockers / CSP / CORS cannot break it. The position is rounded to
   ~100 m and is neither stored nor logged. On any failure it answers 502 and the page falls back to
   a straight-line estimate. */
const { clientIp, allow } = require("./_lib");

const VENUE = { lat: 20.4763134, lng: 72.9326796 }; /* keep in sync with venueLat / venueLng in config.js */
const HOSTS = ["https://router.project-osrm.org", "https://routing.openstreetmap.de/routed-car"];

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") { res.setHeader("Allow", "GET"); return res.status(405).json({ ok: false }); }
  if (!allow("route:" + clientIp(req), 30, 10 * 60e3)) return res.status(429).json({ ok: false });

  const lat = Number(req.query && req.query.lat), lng = Number(req.query && req.query.lng);
  if (!(Math.abs(lat) <= 90) || !(Math.abs(lng) <= 180)) return res.status(400).json({ ok: false });
  const a = lng.toFixed(3) + "," + lat.toFixed(3), b = VENUE.lng + "," + VENUE.lat;

  for (const host of HOSTS) {
    try {
      const r = await fetch(host + "/route/v1/driving/" + a + ";" + b + "?overview=false&alternatives=false", { signal: AbortSignal.timeout(5000) });
      const d = await r.json();
      const m = d && d.routes && d.routes[0] && d.routes[0].distance;
      if (m > 0) return res.status(200).json({ ok: true, km: Math.round(m / 100) / 10 });
    } catch (e) { /* try the next host */ }
  }
  return res.status(502).json({ ok: false });
};
