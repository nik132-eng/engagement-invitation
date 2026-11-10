/* ------------------------------------------------------------------
   Edit this file to change the invitation. No other file needs to
   change for time, venue, photos, music or RSVP settings.
------------------------------------------------------------------- */
window.INVITE = {
  // Event date (YYYY-MM-DD) and start time (24h, India time)
  dateISO: "2026-12-12",
  time: "16:30",            // 4:30 PM
  durationHours: 4,

  // Venue text shown above the buttons. Leave "" to hide.
  venueName: "",
  venueAddress: "",

  // Directions link (Google Maps)
  mapUrl: "https://share.google/5yUGFvIcc0Pt9U1bb",

  // Venue coordinates power the "how far are you" feature.
  // Google Maps: long-press / right-click the venue pin and copy the
  // two numbers, e.g. venueLat: 23.0225, venueLng: 72.5714.
  // (Also auto-read from mapUrl if it is a full maps URL containing @lat,lng.)
  venueLat: null,
  venueLng: null,

  // Where RSVPs are sent (see api/rsvp.js)
  rsvpEndpoint: "/api/rsvp",
  // Optional: if the RSVP request fails, offer a WhatsApp fallback.
  // Country code first, digits only, e.g. "919876543210". "" = no fallback.
  whatsapp: "",

  // Background music.
  // [] = a unique romantic piece is composed live for every visitor
  //      (different key, tempo, chords and melody each time).
  // Or list your own licensed / royalty-free files:
  //   tracks: [{ title: "Song name", src: "assets/music/song1.mp3" }]
  // A random track starts first, then the list plays in a shuffled order.
  tracks: [],

  // Gallery photos, e.g. ["assets/photo1.jpg", "assets/photo2.jpg"]. [] hides the gallery.
  photos: []
};
