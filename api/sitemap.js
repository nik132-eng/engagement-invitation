/* GET /sitemap.xml (rewritten here by vercel.json). Uses the live domain automatically. */
const { safeHost } = require("./_lib");

module.exports = (req, res) => {
  const host = safeHost(req);
  if (!host) return res.status(400).send("bad host");
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=86400");
  res.status(200).send(
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    "  <url><loc>https://" + host + "/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>\n</urlset>\n"
  );
};
