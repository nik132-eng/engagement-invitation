/* GET /robots.txt (rewritten here by vercel.json). */
const { safeHost } = require("./_lib");

module.exports = (req, res) => {
  const host = safeHost(req);
  if (!host) return res.status(400).send("bad host");
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=86400");
  res.status(200).send("User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: https://" + host + "/sitemap.xml\n");
};
