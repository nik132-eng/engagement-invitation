/* GET /robots.txt (rewritten here by vercel.json). */
module.exports = (req, res) => {
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const proto = req.headers["x-forwarded-proto"] || "https";
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=86400");
  res.status(200).send("User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: " + proto + "://" + host + "/sitemap.xml\n");
};
