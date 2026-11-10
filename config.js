/* ------------------------------------------------------------------
   Edit this file to change the invitation. No other file needs to change
   for details like time, venue, photos, music or RSVP number.
------------------------------------------------------------------- */
window.INVITE = {
  // Event date (YYYY-MM-DD)
  dateISO: "2026-12-12",

  // Start time in 24h format, e.g. "10:30". Leave "" to hide the time
  // (the countdown then counts down to midnight of the event day).
  time: "",
  durationHours: 3,

  // Venue text shown above the map button. Leave "" to show only the button.
  venueName: "",
  venueAddress: "",

  // Google Maps link for directions
  mapUrl: "https://share.google/5yUGFvIcc0Pt9U1bb",

  // WhatsApp number for RSVP, country code first, digits only
  // e.g. "919876543210". Leave "" to hide the RSVP section.
  whatsapp: "",

  // Optional background music file, e.g. "assets/music.mp3". Leave "" for none.
  music: "",

  // Photos for the gallery, e.g. ["assets/photo1.jpg", "assets/photo2.jpg"].
  // Leave [] to hide the gallery.
  photos: []
};
