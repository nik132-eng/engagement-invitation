# Nikunj & Ayushi – Engagement Invitation (12 Dec 2026, 4:30 PM)

Mobile-first static site + three tiny Vercel functions. No build step.

## What it does
- Tap-to-open splash, animated text, scroll progress, falling petals, English/Gujarati toggle
- The date and time on the first page are hidden under gold foil: guests scratch to reveal them
- Live countdown to **12 Dec 2026, 4:30 PM IST**
- Music: the official YouTube songs in `youtubeSongs` (`config.js`) play by default as one shuffled
  playlist, starting when a guest taps the seal. They are listed in "Songs of Love" with the
  player (tap a song to play from it, or shuffle); the dock has play/pause and next
- "How far are you?" distance to the venue (location never leaves the phone)
- RSVP form -> `/api/rsvp` (distance included, rounded)
- SEO: meta + Open Graph, Event structured data, auto sitemap.xml and robots.txt

## Run it on your computer
1. Install Node 20+ and run `npm install` once.
2. Copy the example settings: `cp .env.example .env.local`, then set `ADMIN_KEY` in `.env.local` to
   20+ random characters (for example the output of `openssl rand -base64 32`). `.env.local` is
   git-ignored, so it never leaves your computer.
3. Start it: `npm run dev`, then open http://localhost:3000
   (`PORT=4000 npm run dev` for another port; `HOST=0.0.0.0 npm run dev` to open it from your phone on
   the same Wi-Fi at `http://YOUR-COMPUTER-IP:3000`).
4. RSVPs sent from the local page are saved in `.local-data/rsvp.jsonl` (git-ignored). Read them with
   `npm run admin`, which sends your `ADMIN_KEY` as a header, or with
   `curl -H "x-admin-key: YOUR_ADMIN_KEY" http://localhost:3000/api/admin`.

Notes for local runs:
- The local server sends the same security headers as the live site, so a console warning here
  means a problem there too.
- The songs play from YouTube, so they need an internet connection.
- Browsers only allow location on `localhost` or HTTPS: the "How far are you?" card works at
  `http://localhost:3000`, but not at an `http://192.168...` address on your phone.
- `npm run dev` never touches Vercel or Blob. To try the real Vercel setup, use `npx vercel dev`.

## Setup on Vercel (one time)
1. Import this repo in Vercel (Framework preset: **Other**).
2. **Analytics** tab -> Enable **Web Analytics** (unique visitors, pages, countries; visible only to you).
3. **Storage** tab -> Create a **Blob** store, choose **Private**, and connect it to this project for
   **all environments** (stores RSVPs; `BLOB_READ_WRITE_TOKEN` is added automatically).
   If you create a *Public* store instead, also add the env var `BLOB_ACCESS=public`.
4. Settings -> Environment Variables -> add `ADMIN_KEY`: **at least 20 random characters**
   (generate one with `openssl rand -base64 32`). Then redeploy. A short key is refused.
5. `index.html` already uses https://nikunj-ayushi-engagement-invitation.vercel.app for the share preview
   (2 places). If you add a custom domain later, change it there.
6. Changes to environment variables only apply to **new** deployments, so redeploy after editing them.

## Test with your real Blob store from your computer
`npm run dev` keeps everything on your computer (RSVPs go to `.local-data/`). To run the site locally
against the real Vercel Blob store instead, the same one the live site writes to:
1. In Vercel -> Storage -> your Blob store, find `BLOB_STORE_ID` and `BLOB_READ_WRITE_TOKEN` (the
   ".env.local" tab shows both lines).
2. `cp .env.blob.example .env.blob` and paste the two values in. `.env.blob` is git-ignored. Never commit
   the token or paste it into a chat; if it ever leaks, regenerate it in Vercel.
3. `npm run dev:blob`, then open http://localhost:3000. The start-up banner says "REAL Vercel Blob store".
   RSVPs sent from this page are real records in the store, so delete test ones afterwards.
4. `npm run admin` lists what is in the store (it sends the `ADMIN_KEY` from `.env.local`).

The API works with a Private or a Public store: it tries Private first, and `/api/admin` reports what it
found in `storage`. Private is the safer choice, because guests' names and messages can then not be read
by URL.

## Check the live site
`npm run check` runs a read-only smoke test against https://nikunj-ayushi-engagement-invitation.vercel.app:
the page and share preview, security headers, robots/sitemap, files that must stay private, and that the
RSVP and admin endpoints refuse bad requests. It never saves an RSVP.
- Another address: `npm run check -- https://your-domain`
- Also prove your live admin key works and Blob is connected:
  `ADMIN_KEY='your live key' npm run check` (the key is read from your shell only, never from `.env.local`,
  because that one is for local runs)
- By hand: `curl -H "x-admin-key: YOUR_LIVE_KEY" https://nikunj-ayushi-engagement-invitation.vercel.app/api/admin`

Reading the admin result:
- `401 unauthorized`: the key does not match the `ADMIN_KEY` on Vercel.
- `503 ADMIN_KEY is not set` / `must be at least 20 characters`: fix the environment variable, then redeploy.
- `503 No Blob store connected`: Vercel -> Storage -> connect the store to this project, then redeploy.
- `200` with `"ok": true`: all good. `storage` says `private` or `public`.

## Developer-only views
- Visitors: Vercel dashboard -> Analytics
- RSVPs + totals (on your computer: `npm run admin`). On the live site, send the key in a header so it
  never lands in browser history:
  `curl -H "x-admin-key: YOUR_ADMIN_KEY" https://YOUR-DOMAIN/api/admin`
  (`?key=YOUR_ADMIN_KEY` also works, but is less safe)
- Raw RSVP log lines: Vercel dashboard -> Logs (search "RSVP")

## Security
- `vercel.json` sends a strict Content-Security-Policy (no inline scripts), HSTS, clickjacking
  protection (`frame-ancestors 'none'`), `nosniff`, a locked-down Permissions-Policy and COOP.
- `/api/rsvp`: same-origin only, JSON only, 4 KB cap, hidden honeypot field, minimum fill time,
  link-spam filter, input sanitising, and rate limits per visitor and overall.
- `/api/admin`: key compared in constant time, 5 wrong tries blocks that visitor for 15 minutes,
  no details leaked in errors, never cached or indexed.
- RSVP files live in a private Blob store. `npm audit` reports 0 known vulnerabilities.
- The in-code rate limits are per server instance. For a hard limit, add a rate-limit rule in
  Vercel -> Firewall (for example 10 requests/minute on `/api/rsvp`).

## Edit details
Everything editable is in `config.js` (venue, coordinates, WhatsApp fallback, songs, photos).
Names, parents and wording (English + Gujarati) are in `script.js`.

## Music note
The songs play from their official YouTube uploads, so the labels' rights stay intact and no
audio files are hosted here. YouTube may play an ad first, and a video the owner later blocks
from embedding is skipped automatically.
