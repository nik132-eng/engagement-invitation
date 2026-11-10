#!/usr/bin/env python3
"""Builds assets/places.json: the offline city list the invitation uses to turn a guest's GPS position
into a place name ON THE PHONE. Nothing about the position is sent anywhere.

Data: GeoNames (https://www.geonames.org), licensed CC BY 4.0, which is why the footer credits it.
Keeps every city with 15,000+ people in India and every city with 100,000+ people elsewhere.
Usage:  python3 scripts/build-places.py     (needs an internet connection; takes a few seconds)"""
import io, json, os, urllib.request, zipfile

BASE = "https://download.geonames.org/export/dump/"
OUT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "places.json"))


def fetch(name):
    return urllib.request.urlopen(BASE + name, timeout=120).read()


cities = zipfile.ZipFile(io.BytesIO(fetch("cities15000.zip"))).read("cities15000.txt").decode("utf-8")
admin = {}
for line in fetch("admin1CodesASCII.txt").decode("utf-8").splitlines():
    code, name = line.split("\t")[:2]
    admin[code] = name

admins, index, rows = [], {}, []
for line in cities.splitlines():
    f = line.split("\t")
    name, lat, lon, cc, a1, pop = f[2], float(f[4]), float(f[5]), f[8], f[10], int(f[14] or 0)
    if cc != "IN" and pop < 100000:
        continue
    state = admin.get(cc + "." + a1, "")
    if state not in index:
        index[state] = len(admins)
        admins.append(state)
    rows.append([name, round(lat, 2), round(lon, 2), cc, index[state]])

data = {"source": "GeoNames (https://www.geonames.org), CC BY 4.0", "a": admins, "c": rows}
with open(OUT, "w", encoding="utf-8") as fh:
    json.dump(data, fh, ensure_ascii=False, separators=(",", ":"))
print("wrote %s: %d cities, %d states/regions, %d KB" % (OUT, len(rows), len(admins), os.path.getsize(OUT) // 1024))
