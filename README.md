# Nikunj & Ayushi – Engagement Invitation (12 Dec 2026, 4:30 PM)

Mobile-first static site + three tiny Vercel functions. No build step.

## What it does
- Tap-to-open splash, animated hero, scroll progress, falling petals, English/Gujarati toggle
- Live countdown to **12 Dec 2026, 4:30 PM IST**
- Background music: a unique romantic piece is composed live for every visitor
  (or your own shuffled tracks, see `config.js`)
- "How far are you?" distance to the venue (location never leaves the phone)
- RSVP form -> `/api/rsvp` (distance included, rounded)
- SEO: meta + Open Graph, Event structured data, auto sitemap.xml and robots.txt

## Setup on Vercel (one time)
1. Import this repo in Vercel (Framework preset: **Other**).
2. **Analytics** tab -> Enable **Web Analytics** (unique visitors, pages, countries; visible only to you).
3. **Storage** tab -> Create a **Blob** store and connect it to this project (stores RSVPs).
4. Settings -> Environment Variables -> add `ADMIN_KEY` (any long random string), then redeploy.
5. Replace `REPLACE-WITH-YOUR-DOMAIN` in `index.html` (2 places) with your live domain.

## Developer-only views
- Visitors: Vercel dashboard -> Analytics
- RSVPs + totals: `https://YOUR-DOMAIN/api/admin?key=YOUR_ADMIN_KEY`
- Raw RSVP log lines: Vercel dashboard -> Logs (search "RSVP")

## Edit details
Everything editable is in `config.js` (venue, coordinates, WhatsApp fallback, music, photos).
Names, parents and wording (English + Gujarati) are in `script.js`.

## Music note
Popular film/album songs are copyrighted; using them on a public site can get it taken down.
Use royalty-free or licensed MP3s in `assets/music/` and list them in `config.js`, or keep the
default live-composed music.
