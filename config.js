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
  venueName: "Shiv Party Plot",
  venueAddress: "NH 48, opp. Raymond, Khadki, Gujarat 396185",

  // Directions link (Google Maps place page for Shiv Party Plot)
  mapUrl: "https://www.google.com/maps/place/Shiv+Party+Plot/@20.4763134,72.9326796,17z/data=!4m6!3m5!1s0x3be0c56473af5003:0x8a46240d267a9d3a!8m2!3d20.4763134!4d72.9326796!16s%2Fg%2F11v0zwljn0",

  // Venue coordinates power the "how far are you" feature.
  // Google Maps: long-press / right-click the venue pin and copy the
  // two numbers, e.g. venueLat: 23.0225, venueLng: 72.5714.
  // (Also auto-read from mapUrl if it is a full maps URL containing @lat,lng.)
  venueLat: 20.4763134,
  venueLng: 72.9326796,

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

  // "Our favourite songs" card: official YouTube videos, played in a visible
  // player only when a guest taps a song (background music pauses meanwhile).
  // id = the part after "watch?v=" in the YouTube link. [] hides the card.
  // group = heading the song is listed under.
  youtubeSongs: [
    { group: "Hindi", title: "Gehra Hua", film: "Dhurandhar · Arijit Singh", id: "GX9x62kFsVU" },
    { group: "Hindi", title: "Tum Ho Toh", film: "Saiyaara · Vishal Mishra", id: "rOUuGvJkBrQ" },
    { group: "Hindi", title: "Saiyaara", film: "Saiyaara · Faheem Abdullah", id: "BSJa1UytM8w" },
    { group: "Hindi", title: "Barbaad", film: "Saiyaara · Jubin Nautiyal", id: "0v5eHPfy5Lk" },
    { group: "Hindi", title: "Sahiba", film: "Aditya Rikhari", id: "n2dVFdqMYGA" },
    { group: "Hindi", title: "Sitaare", film: "Ikkis · Arijit Singh", id: "nDjloeIB3Pc" },
    { group: "Hindi", title: "Fitratein", film: "Arijit Singh", id: "PylcNpYMX4A" },
    { group: "Hindi", title: "Kasturi", film: "Amar Prem Ki Prem Kahani · Arijit Singh", id: "gPfIxI0b5Xs" },
    { group: "Hindi", title: "Qubool", film: "Haq · Vishal Mishra", id: "zyEHIW_Rx1U" },
    { group: "Hindi", title: "Dil Tod Gaya Tu", film: "Haq · Vishal Mishra", id: "HT0mIkKFP3w" },
    { group: "Hindi", title: "Aaj Mohabbat", film: "Aditya Rikhari", id: "EYYbrOqgUBI" },
    { group: "Hindi", title: "Teri Ore", film: "Singh Is Kinng · Shreya Ghoshal", id: "CWfCp96-yck" },
    { group: "Hindi", title: "Maskara", film: "Main Vaapas Aaunga · A.R. Rahman", id: "DgKHBJWYpFs" },
    { group: "Hindi", title: "Arz Kiya Hai", film: "Coke Studio Bharat · Anuv Jain", id: "bP8ATWCvqzw" },
    { group: "Hindi", title: "Jo Tum Mere Ho", film: "Anuv Jain", id: "ilNt2bikxDI" },
    { group: "Hindi", title: "Agar Tum Saath Ho", film: "Tamasha · Arijit Singh, Alka Yagnik", id: "xRb8hxwN5zc" },
    { group: "Hindi", title: "Kesariya", film: "Brahmāstra · Arijit Singh", id: "BddP6PYo2gs" },
    { group: "Hindi", title: "Tum Hi Ho", film: "Aashiqui 2 · Arijit Singh", id: "Umqb9KENgmk" },
    { group: "Hindi", title: "Raataan Lambiyan", film: "Shershaah · Jubin Nautiyal, Asees Kaur", id: "gvyUuxdRdR4" },
    { group: "Hindi", title: "Tum Kya Mile", film: "Rocky Aur Rani Kii Prem Kahaani", id: "taRBVfDRukY" },
    { group: "Hindi", title: "Apna Bana Le", film: "Bhediya · Arijit Singh", id: "ElZfdU54Cp8" },
    { group: "Hindi", title: "Tujh Mein Rab Dikhta Hai", film: "Rab Ne Bana Di Jodi", id: "qoq8B8ThgEM" },

    { group: "Punjabi", title: "Jaiye Sajana", film: "Satinder Sartaaj, Jasmine Sandlas", id: "F2m4HPLvj-4" },
    { group: "Punjabi", title: "Still in Love", film: "Jassa Dhillon", id: "sLueqNhgB3E" },
    { group: "Punjabi", title: "Haseen", film: "Talwiinder", id: "IltsOcCj1Ak" },
    { group: "Punjabi", title: "Tu", film: "Talwiinder", id: "4dkss90fdPc" },

    { group: "Haryanvi / Hindi", title: "Bairan", film: "Banjaare", id: "oafxkMv4xnc" },
    { group: "Haryanvi / Hindi", title: "Barsaat", film: "Banjaare", id: "ebZj_nrmH-c" },
    { group: "Haryanvi / Hindi", title: "Haaye Re", film: "Banjaare", id: "gJGcC3hlRcE" },

    { group: "Malayalam / Hindi", title: "Kalyani", film: "ARJN, Shreya Ghoshal", id: "xvT1jH8B9AM" },

    { group: "Gujarati", title: "Sajan Ho", film: "Jigardan Gadhavi", id: "j5kMD5wgwcM" },
    { group: "Gujarati", title: "Ghumar Ramva Aavo Ne", film: "Jigardan Gadhavi, Aishwarya Majmudar", id: "rw8Fr96FVCM" },
    { group: "Gujarati", title: "Kaajal Kali", film: "Vaanki Chuki Love Story · Jigardan Gadhavi", id: "B36_fE93YOk" },
    { group: "Gujarati", title: "Vhalam Aavo Ne", film: "Love Ni Bhavai · Jigardan Gadhavi", id: "5gIpqS-Qpzw" },
    { group: "Gujarati", title: "Valamiya", film: "Aavaa De · Jigardan Gadhavi", id: "r19vNIkNQmQ" },
    { group: "Gujarati", title: "Shangari De", film: "Aishwarya Majmudar", id: "woVVyjYC96Y" },
    { group: "Gujarati", title: "Khovai Jau", film: "Harsh Soni, Ishani Dave", id: "bYBmXPdE2kk" },
    { group: "Gujarati", title: "Dil Bekabu", film: "Soham Naik", id: "WulMVD2DEzE" }
  ],

  // Gallery photos, e.g. ["assets/photo1.jpg", "assets/photo2.jpg"]. [] hides the gallery.
  // Portrait 3:4 photos (1080x1440) look best.
  photos: ["assets/photos/photo1.jpg", "assets/photos/photo2.jpg", "assets/photos/photo3.jpg", "assets/photos/photo4.jpg"]
};
