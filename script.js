(function () {
  "use strict";
  var C = window.INVITE;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Vercel Web Analytics custom events (counts appear only in your Vercel dashboard) */
  function track(name, data) { try { if (window.va) window.va("event", { name: name, data: data || {} }); } catch (e) {} }

  /* ================= Text (English / Gujarati) ================= */
  var T = {
    en: {
      splashKicker: "You are invited", tapOpen: "Tap the seal to open",
      intro: "Together with our families,\nWe invite you to celebrate our Engagement 💍",
      groomName: "Nikunj", brideName: "Ayushi", scroll: "Scroll",
      welcome: "Welcome to the celebration of love and togetherness 💍✨\nWe are delighted to have you with us on our Engagement.",
      familiesTitle: "Our Families",
      familiesLine: "Two souls, two families,\none beautiful beginning.",
      groomParents: "Son of\nChampakbhai R. Rohit\n&\nJaybalaben C. Rohit",
      brideParents: "Daughter of\nKishmatbhai A. Andhariya\n&\nRinkuben K. Andhariya",
      familiesBlessing: "Where two hearts meet, two families become one,\nand every blessing turns into a promise of forever.",
      foreverTitle: "Our forever begins", invited: "You're Invited!",
      saveDate: "Save the Date", googleCal: "Add to Google Calendar", downloadIcs: "Download for Apple / Outlook",
      countTitle: "Counting down", days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds",
      countBefore: "until our engagement ceremony begins", countLive: "It's today. The celebration is on! 💍", countAfter: "Thank you for celebrating with us 💓",
      galleryTitle: "Our Moments",
      songsTitle: "Songs of Love", songsNote: "Romantic songs play on their own, one after another. Tap any song to play from there.", songsShuffle: "Shuffle all songs",
      programTitle: "Program", event: "Engagement Ceremony",
      venueTitle: "Venue", directions: "Get Directions",
      distTitle: "How far are you?", distBtn: "Show my distance",
      distAway: "About {km} km away", distNear: "You're less than 1 km away!", distLoading: "Finding your distance…",
      distDenied: "Location is off. Tap to try again.",
      distNote: "Your location stays on your phone. Only the rounded distance is shared if you RSVP.",
      giftsTitle: "Gifts", gifts: "Your blessings and presence are the best gift 💓",
      fName: "Your name", fAttend: "Will you be attending?", fYes: "Yes, I'll be there!", fNo: "Sorry, I can't make it",
      fGuests: "Total guests (including you)", fMsg: "Your message (optional)", fSend: "Send RSVP", fSending: "Sending…",
      fNeedName: "Please enter your name.", fError: "Couldn't send your RSVP. Please try again.", fErrorWa: "Or send it on WhatsApp",
      thanksName: "Thank you, {name}!", thanksYes: "We've noted your RSVP. See you on 12 December!", thanksNo: "Thanks for letting us know. You'll be missed.",
      fEdit: "Change my reply",
      closing: "We can't wait to celebrate with you!", signoff: "Nikunj & Ayushi",
      footer: "Made with love for Nikunj & Ayushi", dockRsvp: "RSVP",
      scratchHint: "Scratch to reveal the date & time", scratchAria: "Scratch to reveal the date and time. Press Enter to reveal it."
    },
    gu: {
      splashKicker: "આપ સૌને આમંત્રણ", tapOpen: "ખોલવા માટે સીલ પર ટેપ કરો",
      intro: "અમારા બંને પરિવારો સાથે,\nઅમારા સગાઈ સમારોહમાં આપને સાદર આમંત્રણ 💍",
      groomName: "નિકુંજ", brideName: "આયુષી", scroll: "નીચે જુઓ",
      welcome: "પ્રેમ અને સાથની ઉજવણીમાં આપનું સ્વાગત છે 💍✨\nઅમારા સગાઈ પ્રસંગે આપની હાજરી અમારા માટે ખૂબ આનંદની વાત છે.",
      familiesTitle: "અમારા પરિવાર",
      familiesLine: "બે આત્મા, બે પરિવાર,\nએક સુંદર શરૂઆત.",
      groomParents: "ચંપકભાઈ આર. રોહિત\nઅને\nજયબાળાબેન સી. રોહિતના\nસુપુત્ર",
      brideParents: "કિસ્મતભાઈ એ. અંધારિયા\nઅને\nરિંકુબેન કે. અંધારિયાની\nસુપુત્રી",
      familiesBlessing: "જ્યાં બે હૃદય મળે છે, ત્યાં બે પરિવાર એક થાય છે,\nઅને દરેક આશીર્વાદ સદાના સાથનું વચન બની જાય છે.",
      foreverTitle: "અમારી સફર અહીંથી શરૂ થાય છે", invited: "આપ સૌને આમંત્રણ",
      saveDate: "તારીખ સાચવો", googleCal: "Google Calendar માં ઉમેરો", downloadIcs: "Apple / Outlook માટે ડાઉનલોડ",
      countTitle: "ગણતરી ચાલુ છે", days: "દિવસ", hours: "કલાક", minutes: "મિનિટ", seconds: "સેકન્ડ",
      countBefore: "અમારા સગાઈ સમારોહ શરૂ થવામાં", countLive: "આજે જ છે. ઉજવણી ચાલુ છે! 💍", countAfter: "અમારી સાથે ઉજવણી કરવા બદલ આભાર 💓",
      galleryTitle: "અમારી યાદો",
      songsTitle: "પ્રેમનાં ગીતો", songsNote: "રોમેન્ટિક ગીતો એક પછી એક આપોઆપ વાગે છે. કોઈ પણ ગીત પર ટેપ કરો અને ત્યાંથી સાંભળો.", songsShuffle: "બધાં ગીતો શફલ કરો",
      programTitle: "કાર્યક્રમ", event: "સગાઈ સમારોહ",
      venueTitle: "સ્થળ", directions: "દિશા મેળવો",
      distTitle: "તમે કેટલા દૂર છો?", distBtn: "મારું અંતર બતાવો",
      distAway: "આશરે {km} કિમી દૂર", distNear: "તમે 1 કિમીથી પણ ઓછા દૂર છો!", distLoading: "અંતર શોધી રહ્યા છીએ…",
      distDenied: "લોકેશન બંધ છે. ફરી પ્રયત્ન કરવા ટેપ કરો.",
      distNote: "તમારું લોકેશન તમારા ફોનમાં જ રહે છે. RSVP કરો તો ફક્ત આશરે અંતર જ શેર થાય છે.",
      giftsTitle: "ભેટ", gifts: "આપના આશીર્વાદ અને હાજરી જ અમારા માટે સૌથી મોટી ભેટ છે 💓",
      fName: "આપનું નામ", fAttend: "શું આપ હાજર રહેશો?", fYes: "હા, હું આવીશ!", fNo: "માફ કરશો, હું આવી શકીશ નહીં",
      fGuests: "કુલ મહેમાન (આપ સહિત)", fMsg: "આપનો સંદેશ (વૈકલ્પિક)", fSend: "RSVP મોકલો", fSending: "મોકલી રહ્યા છીએ…",
      fNeedName: "કૃપા કરીને આપનું નામ લખો.", fError: "RSVP મોકલી શકાયું નહીં. ફરી પ્રયત્ન કરો.", fErrorWa: "અથવા WhatsApp પર મોકલો",
      thanksName: "આભાર, {name}!", thanksYes: "આપની હાજરીની નોંધ થઈ ગઈ છે. 12 ડિસેમ્બરે મળીએ!", thanksNo: "જાણ કરવા બદલ આભાર. આપની ખોટ સાલશે.",
      fEdit: "જવાબ બદલો",
      closing: "આપની સાથે ઉજવણી કરવા અમે આતુર છીએ!", signoff: "નિકુંજ અને આયુષી",
      footer: "નિકુંજ અને આયુષી માટે પ્રેમથી બનાવેલ", dockRsvp: "RSVP",
      scratchHint: "તારીખ અને સમય જોવા સ્ક્રેચ કરો", scratchAria: "તારીખ અને સમય જોવા સ્ક્રેચ કરો. સીધું જોવા Enter દબાવો."
    }
  };

  var lang = "en";
  try { lang = localStorage.getItem("inv-lang") || "en"; } catch (e) {}
  if (!T[lang]) lang = "en";
  var t = function (k) { return T[lang][k]; };

  /* ================= Dates ================= */
  var p = C.dateISO.split("-").map(Number);
  var tm = C.time ? C.time.split(":").map(Number) : null;
  var locale = function () { return lang === "gu" ? "gu-IN" : "en-IN"; };
  var utc = function (h, m) { return new Date(Date.UTC(p[0], p[1] - 1, p[2], h, m)); };
  var fmt = function (o, d) { return new Intl.DateTimeFormat(locale(), Object.assign({ timeZone: "UTC" }, o)).format(d); };
  var two = function (n) { return String(n).padStart(2, "0"); };

  function renderDates() {
    var d = utc(12, 0), time = tm ? fmt({ hour: "numeric", minute: "2-digit" }, utc(tm[0], tm[1])) : "";
    var long = fmt({ weekday: "long", day: "numeric", month: "long", year: "numeric" }, d);
    $("#dateShort").textContent = fmt({ day: "numeric", month: "long", year: "numeric" }, d);
    $("#dateWeekday").textContent = fmt({ weekday: "long" }, d);
    $("#dateTime").textContent = time;
    $("#programDate").textContent = long;
    $("#programTime").textContent = time;
    $("#heroDate").textContent = fmt({ day: "numeric", month: "long", year: "numeric" }, d) + (time ? "  ·  " + time : "");
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = T[lang][el.getAttribute("data-i18n")];
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-anim]").forEach(splitText);
    $("#scratchFoil").setAttribute("aria-label", t("scratchAria"));
    $("#langLabel").textContent = lang === "en" ? "ગુજરાતી" : "English";
    renderDates(); renderDistance(); tick(); renderThanks();
  }
  $("#langBtn").addEventListener("click", function () {
    lang = lang === "en" ? "gu" : "en";
    try { localStorage.setItem("inv-lang", lang); } catch (e) {}
    track("language_change", { lang: lang });
    if (document.startViewTransition && !reduced) document.startViewTransition(applyLang); else applyLang();
  });

  /* ================= Splash (also unlocks music) ================= */
  var splash = $("#splash");
  function openInvite() {
    if (document.body.classList.contains("opened")) return;
    splash.classList.add("opening");
    document.body.classList.remove("locked");
    document.body.classList.add("opened");
    window.scrollTo(0, 0);
    track("invitation_opened");
    music.start();
    setTimeout(function () { splash.remove(); }, 1600);
  }
  $("#openBtn").addEventListener("click", openInvite);

  /* ================= Venue + map ================= */
  $("#venueName").textContent = C.venueName || "";
  $("#venueAddr").textContent = C.venueAddress || "";
  $("#mapBtn").href = C.mapUrl;
  $("#mapBtn").addEventListener("click", function () { track("directions_click"); });

  /* ================= Countdown ================= */
  var target = new Date(C.dateISO + "T" + (C.time || "00:00") + ":00+05:30").getTime();
  var endAt = target + (C.durationHours || 4) * 3600 * 1000;
  var L = 213.63;
  function ring(id, frac) { $("#" + id).style.strokeDashoffset = String(L * (1 - Math.max(0, Math.min(1, frac)))); }
  function tick() {
    var now = Date.now(), diff = Math.max(0, target - now), s = Math.floor(diff / 1000);
    var d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    $("#cd-d").textContent = two(d); $("#cd-h").textContent = two(h); $("#cd-m").textContent = two(m); $("#cd-s").textContent = two(sec);
    ring("r-d", d / 100); ring("r-h", h / 24); ring("r-m", m / 60); ring("r-s", sec / 60);
    $("#countNote").textContent = now < target ? t("countBefore") : (now < endAt ? t("countLive") : t("countAfter"));
  }
  setInterval(tick, 1000);

  /* ================= Calendar ================= */
  var saveBtn = $("#saveBtn"), saveMenu = $("#saveMenu");
  saveBtn.addEventListener("click", function () {
    var open = saveMenu.hidden; saveMenu.hidden = !open; saveBtn.setAttribute("aria-expanded", String(open));
    if (open) track("save_date_open");
  });
  var stamp = function (add) {
    var d = new Date(Date.UTC(p[0], p[1] - 1, p[2], tm[0] + (add || 0), tm[1]));
    return d.getUTCFullYear() + two(d.getUTCMonth() + 1) + two(d.getUTCDate()) + "T" + two(d.getUTCHours()) + two(d.getUTCMinutes()) + "00";
  };
  var dayStamp = function (add) {
    var d = new Date(Date.UTC(p[0], p[1] - 1, p[2] + (add || 0)));
    return d.getUTCFullYear() + two(d.getUTCMonth() + 1) + two(d.getUTCDate());
  };
  var calTitle = "Engagement of Nikunj & Ayushi";
  var calWhere = [C.venueName, C.venueAddress].filter(Boolean).join(", ") || C.mapUrl;
  var calDetails = "Join us to celebrate our engagement.\nDirections: " + C.mapUrl;
  var range = tm ? { s: stamp(0), e: stamp(C.durationHours || 4) } : { s: dayStamp(0), e: dayStamp(1) };
  $("#gcalLink").href = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(calTitle) +
    "&dates=" + range.s + "/" + range.e + (tm ? "&ctz=Asia/Kolkata" : "") +
    "&details=" + encodeURIComponent(calDetails) + "&location=" + encodeURIComponent(calWhere);
  $("#gcalLink").addEventListener("click", function () { track("calendar_google"); });
  $("#icsBtn").addEventListener("click", function () {
    track("calendar_ics");
    var dt = tm ? "DTSTART;TZID=Asia/Kolkata:" + range.s + "\r\nDTEND;TZID=Asia/Kolkata:" + range.e
                : "DTSTART;VALUE=DATE:" + range.s + "\r\nDTEND;VALUE=DATE:" + range.e;
    var esc = function (s) { return String(s).replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n"); };
    var ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Nikunj and Ayushi//Engagement//EN", "BEGIN:VEVENT",
      "UID:engagement-" + C.dateISO + "@invitation", "DTSTAMP:" + dayStamp(0) + "T000000Z", dt,
      "SUMMARY:" + esc(calTitle), "DESCRIPTION:" + esc(calDetails), "LOCATION:" + esc(calWhere),
      "BEGIN:VALARM", "TRIGGER:-PT2H", "ACTION:DISPLAY", "DESCRIPTION:Engagement today", "END:VALARM",
      "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = "nikunj-ayushi-engagement.ics";
    document.body.appendChild(a); a.click(); a.remove();
  });

  /* ================= Distance from visitor to venue ================= */
  function parseLatLng(u) {
    var s = String(u || ""), m = s.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) || s.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/) || s.match(/[?&](?:q|ll|query)=(-?\d+\.\d+),(-?\d+\.\d+)/);
    return m ? { lat: +m[1], lng: +m[2] } : null;
  }
  var venue = (C.venueLat != null && C.venueLng != null) ? { lat: +C.venueLat, lng: +C.venueLng } : parseLatLng(C.mapUrl);
  var distanceKm = null, distState = "idle", asked = false;

  function haversine(a, b) {
    var R = 6371, r = Math.PI / 180, dLat = (b.lat - a.lat) * r, dLng = (b.lng - a.lng) * r;
    var x = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.pow(Math.sin(dLng / 2), 2);
    return 2 * R * Math.asin(Math.sqrt(x));
  }
  function renderDistance() {
    if (!venue) return;
    var out = $("#distOut"), btn = $("#distBtn");
    if (distState === "ok") {
      out.textContent = distanceKm < 1 ? t("distNear") : t("distAway").replace("{km}", distanceKm.toLocaleString(locale(), { maximumFractionDigits: 1 }));
      btn.hidden = true;
    } else if (distState === "loading") { out.textContent = t("distLoading"); btn.hidden = true; }
    else if (distState === "denied") { out.textContent = t("distDenied"); btn.hidden = false; btn.textContent = t("distBtn"); }
    else { out.textContent = ""; btn.hidden = false; btn.textContent = t("distBtn"); }
  }
  function locate() {
    if (!venue || !navigator.geolocation) return;
    asked = true; distState = "loading"; renderDistance();
    navigator.geolocation.getCurrentPosition(function (pos) {
      distanceKm = Math.round(haversine({ lat: pos.coords.latitude, lng: pos.coords.longitude }, venue) * 10) / 10;
      distState = "ok"; renderDistance(); track("distance_shown");
    }, function () { distState = "denied"; renderDistance(); }, { timeout: 12000, maximumAge: 600000 });
  }
  if (venue && navigator.geolocation) {
    $("#distCard").hidden = false;
    $("#distBtn").addEventListener("click", locate);
    if ("IntersectionObserver" in window) {
      var dio = new IntersectionObserver(function (en) {
        if (en[0].isIntersecting && !asked) {
          dio.disconnect();
          if (navigator.permissions && navigator.permissions.query) {
            navigator.permissions.query({ name: "geolocation" }).then(function (s) { if (s.state !== "denied") locate(); else { distState = "denied"; renderDistance(); } }).catch(locate);
          } else locate();
        }
      }, { threshold: 0.5 });
      dio.observe($("#venue"));
    }
  }

  /* ================= Gallery ================= */
  if (C.photos && C.photos.length) {
    $("#gallerySection").hidden = false;
    var g = $("#gallery"), dots = $("#dots");
    C.photos.forEach(function (src, i) {
      var f = document.createElement("figure"), im = document.createElement("img");
      im.src = src; im.alt = "Nikunj & Ayushi, photo " + (i + 1); im.loading = i ? "lazy" : "eager"; im.decoding = "async";
      im.width = 1080; im.height = 1440;
      f.appendChild(im); g.appendChild(f);
      var dot = document.createElement("i"); if (!i) dot.className = "on"; dots.appendChild(dot);
    });
    var prev = $("#galPrev"), nextP = $("#galNext"), n = C.photos.length;
    var cur = function () { return Math.round(g.scrollLeft / g.clientWidth); };
    function syncGallery() {
      var i = cur();
      [].forEach.call(dots.children, function (d, k) { d.className = k === i ? "on" : ""; });
      prev.disabled = i <= 0; nextP.disabled = i >= n - 1;
    }
    g.addEventListener("scroll", syncGallery, { passive: true });
    prev.addEventListener("click", function () { g.scrollTo({ left: (cur() - 1) * g.clientWidth }); });
    nextP.addEventListener("click", function () { g.scrollTo({ left: (cur() + 1) * g.clientWidth }); });
    syncGallery();
  }

  /* ================= RSVP ================= */
  var form = $("#rsvpForm"), guests = 1, rsvpSaved = null;
  try { rsvpSaved = JSON.parse(localStorage.getItem("inv-rsvp") || "null"); } catch (e) {}
  function setGuests(n) { guests = Math.max(1, Math.min(10, n)); $("#gOut").textContent = guests; }
  $("#gMinus").addEventListener("click", function () { setGuests(guests - 1); });
  $("#gPlus").addEventListener("click", function () { setGuests(guests + 1); });
  form.addEventListener("change", function () {
    $("#guestsField").hidden = form.attend.value === "no";
  });

  function renderThanks() {
    if (!rsvpSaved) return;
    $("#thanksTitle").textContent = t("thanksName").replace("{name}", rsvpSaved.name);
    $("#thanksSub").textContent = rsvpSaved.attending === "yes" ? t("thanksYes") : t("thanksNo");
  }
  function showThanks() { form.hidden = true; $("#thanks").hidden = false; renderThanks(); }
  if (rsvpSaved) showThanks();
  $("#editRsvp").addEventListener("click", function () { $("#thanks").hidden = true; form.hidden = false; });

  function fail() {
    var err = $("#formError");
    err.textContent = t("fError");
    if (C.whatsapp) {
      var a = document.createElement("a");
      a.textContent = " " + t("fErrorWa");
      a.href = "https://wa.me/" + String(C.whatsapp).replace(/\D/g, "") + "?text=" + encodeURIComponent("Engagement RSVP: " + form.name.value.trim() + " - " + (form.attend.value === "yes" ? "Yes" : "No"));
      a.target = "_blank"; a.rel = "noopener"; err.appendChild(a);
    }
    err.hidden = false;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var err = $("#formError"), btn = $("#sendBtn"); err.hidden = true;
    if (form.website.value) return; /* spam trap */
    var name = form.name.value.trim();
    if (!name) { err.textContent = t("fNeedName"); err.hidden = false; form.name.focus(); return; }
    var attending = form.attend.value;
    var payload = { name: name, attending: attending, guests: attending === "yes" ? guests : 0, message: form.message.value.trim(), distanceKm: distanceKm, lang: lang, t: Math.round(performance.now()) };
    btn.disabled = true; btn.textContent = t("fSending");
    fetch(C.rsvpEndpoint, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) })
      .then(function (r) { if (!r.ok) throw new Error("bad"); return r.json(); })
      .then(function () {
        rsvpSaved = { name: name, attending: attending };
        try { localStorage.setItem("inv-rsvp", JSON.stringify(rsvpSaved)); } catch (x) {}
        track("rsvp_submit", { attending: attending, guests: payload.guests });
        showThanks(); if (attending === "yes") burst($("#thanks"));
      })
      .catch(fail)
      .then(function () { btn.disabled = false; btn.textContent = t("fSend"); });
  });

  /* ================= Music: one playlist of official YouTube songs ================= */
  /* The songs play by default as one shuffled playlist, in the player inside the "Songs of Love"
     section (no floating overlay). Nothing is requested from YouTube until the guest taps the seal. */
  var music = (function () {
    var songs = (C.youtubeSongs || []).filter(function (s) { return s && /^[\w-]{11}$/.test(s.id); });
    var playBtn = $("#playBtn"), nextBtn = $("#nextBtn"), np = $("#nowPlaying"), npTitle = $("#npTitle");
    var section = $("#songsSection"), list = $("#songsList");
    if (!songs.length) { playBtn.hidden = true; nextBtn.hidden = true; return { start: function () {} }; }
    section.hidden = false;

    var order = [], idx = 0, yt = null, ready = false, booting = false;
    var started = false, wantPlay = false, playing = false, failures = 0, rows = [];

    function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
    function reshuffle() {
      var last = order.length ? order[order.length - 1] : -1;
      order = shuffle(songs.map(function (_, i) { return i; }));
      if (songs.length > 1 && order[0] === last) { var x = order[0]; order[0] = order[1]; order[1] = x; }
    }
    function current() { return songs[order[idx]]; }
    function advance() { idx++; if (idx >= order.length) { reshuffle(); idx = 0; } }

    function render() {
      /* the icons are SVG elements, which have no .hidden property, so toggle the attribute */
      $("#icPlay").toggleAttribute("hidden", wantPlay); $("#icPause").toggleAttribute("hidden", !wantPlay);
      playBtn.setAttribute("aria-pressed", String(wantPlay));
      np.hidden = !started; np.classList.toggle("paused", !playing);
      npTitle.textContent = started ? current().title : "";
      rows.forEach(function (b, i) { b.setAttribute("aria-current", String(started && i === order[idx])); });
    }
    function load() {
      if (!ready) return;
      if (wantPlay) yt.loadVideoById(current().id); else yt.cueVideoById(current().id);
      render();
    }

    function onReady() { ready = true; load(); }
    function onState(e) {
      var S = window.YT.PlayerState;
      if (e.data === S.PLAYING) { playing = true; wantPlay = true; failures = 0; render(); }
      else if (e.data === S.PAUSED) { playing = false; wantPlay = false; render(); }
      else if (e.data === S.ENDED) { playing = false; next(); }
    }
    /* a song that cannot be embedded is skipped; give up only if every one fails */
    function onError() { failures++; if (failures > songs.length) { wantPlay = false; render(); return; } advance(); load(); }

    function create() {
      yt = new window.YT.Player("ytMount", {
        width: "100%", height: "100%", videoId: current().id, host: "https://www.youtube-nocookie.com",
        playerVars: { playsinline: 1, rel: 0, modestbranding: 1, origin: location.origin },
        events: { onReady: onReady, onStateChange: onState, onError: onError }
      });
    }
    function boot() {
      if (booting) return; booting = true;
      if (window.YT && window.YT.Player) { create(); return; }
      window.onYouTubeIframeAPIReady = create;
      var s = document.createElement("script"); s.src = "https://www.youtube.com/iframe_api"; s.async = true; document.head.appendChild(s);
    }

    /* play the playlist from its current position */
    function go() { started = true; wantPlay = true; render(); boot(); load(); }
    function start() { if (started) return; go(); track("music_start"); }
    function next() { if (!started) { start(); return; } advance(); go(); track("music_next"); }
    function toggle() {
      if (!started) { start(); return; }
      wantPlay = !wantPlay; render();
      if (ready) { if (wantPlay) yt.playVideo(); else yt.pauseVideo(); }
      track(wantPlay ? "music_resume" : "music_pause");
    }
    /* tapping a song plays it, then carries on down the list */
    function playFrom(i) {
      order = songs.map(function (_, k) { return (i + k) % songs.length; }); idx = 0; failures = 0;
      go(); track("song_play", { title: songs[i].title });
    }
    function shuffleAll() { reshuffle(); idx = 0; failures = 0; go(); track("song_shuffle"); }

    /* the visible list, with a heading per language group */
    var lastGroup = null;
    songs.forEach(function (s, i) {
      if (s.group && s.group !== lastGroup) {
        var h = document.createElement("li"); h.className = "songs__group"; h.textContent = s.group; h.setAttribute("aria-hidden", "true");
        list.appendChild(h); lastGroup = s.group;
      }
      var li = document.createElement("li"), b = document.createElement("button");
      b.type = "button";
      b.innerHTML = '<span class="songs__icon" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span><span><span class="songs__title"></span><span class="songs__film"></span></span>';
      b.querySelector(".songs__title").textContent = s.title;
      b.querySelector(".songs__film").textContent = s.film || "";
      b.addEventListener("click", function () { playFrom(i); });
      li.appendChild(b); list.appendChild(li); rows.push(b);
    });

    reshuffle();
    playBtn.addEventListener("click", toggle);
    nextBtn.addEventListener("click", next);
    $("#songsShuffle").addEventListener("click", shuffleAll);
    /* the pill under the page jumps to the player */
    function showPlayer() { section.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" }); }
    np.addEventListener("click", showPlayer);
    np.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showPlayer(); } });
    return { start: start };
  })();

  /* ================= Animated text: letters / words rise and un-blur ================= */
  function splitText(el) {
    var key = el.getAttribute("data-i18n");
    var txt = key ? t(key) : (el.dataset.txt || (el.dataset.txt = el.textContent.trim()));
    if (txt == null) return;
    /* Gujarati letters join into clusters, so it animates by word, never by letter */
    var letters = el.getAttribute("data-anim") === "letters" && lang !== "gu";
    el.textContent = "";
    var sr = document.createElement("span"); sr.className = "sr"; sr.textContent = txt; el.appendChild(sr);
    var n = 0;
    (letters ? Array.from(txt) : txt.split(/(\s+)/)).forEach(function (p) {
      if (!p) return;
      if (/^\s+$/.test(p)) { el.appendChild(document.createTextNode(p)); return; }
      var s = document.createElement("span"); s.className = "ch"; s.setAttribute("aria-hidden", "true");
      s.style.setProperty("--i", n++); s.textContent = p; el.appendChild(s);
    });
  }

  /* ================= Scratch-to-reveal date and time (hero) ================= */
  (function () {
    var wrap = $("#scratch"), cv = $("#scratchFoil"), cx = cv.getContext("2d");
    var dpr = Math.min(2, window.devicePixelRatio || 1), W = 0, H = 0, done = false, drawing = false, last = null, moves = 0;

    function paint() {
      var r = wrap.getBoundingClientRect();
      if (!r.width || done) return;
      W = cv.width = Math.round(r.width * dpr); H = cv.height = Math.round(r.height * dpr);
      cx.globalCompositeOperation = "source-over";
      var g = cx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "#cfa857"); g.addColorStop(0.3, "#f4e2ab"); g.addColorStop(0.55, "#c79b49"); g.addColorStop(0.8, "#ead08a"); g.addColorStop(1, "#bb8c3f");
      cx.fillStyle = g; cx.fillRect(0, 0, W, H);
      cx.globalAlpha = 0.18; cx.strokeStyle = "#fff"; cx.lineWidth = dpr;
      for (var x = -H; x < W; x += 9 * dpr) { cx.beginPath(); cx.moveTo(x, H); cx.lineTo(x + H, 0); cx.stroke(); }
      cx.globalAlpha = 0.5; cx.fillStyle = "#fff";
      for (var i = 0; i < 70; i++) { cx.beginPath(); cx.arc(Math.random() * W, Math.random() * H, (0.4 + Math.random() * 1.2) * dpr, 0, 6.283); cx.fill(); }
      cx.globalAlpha = 1;
    }
    function reveal(via) {
      if (done) return; done = true;
      wrap.classList.add("revealed"); cv.setAttribute("aria-hidden", "true"); cv.tabIndex = -1;
      track("date_revealed", { via: via });
    }
    function pt(e) { var r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * H / r.height }; }
    function cleared() {
      var d = cx.getImageData(0, 0, W, H).data, n = 0, tot = 0;
      for (var i = 3; i < d.length; i += 64) { tot++; if (d[i] < 128) n++; }
      return n / tot;
    }
    function strike(p) {
      cx.globalCompositeOperation = "destination-out"; cx.lineCap = "round"; cx.lineJoin = "round"; cx.lineWidth = 30 * dpr;
      cx.beginPath(); cx.moveTo(last.x, last.y); cx.lineTo(p.x + 0.01, p.y); cx.stroke(); last = p;
    }
    cv.addEventListener("pointerdown", function (e) {
      if (done) return; e.preventDefault(); drawing = true;
      try { cv.setPointerCapture(e.pointerId); } catch (x) {} /* throws if the pointer is already gone; scratching still works */
      wrap.classList.add("scratching"); last = pt(e); strike(last);
    });
    cv.addEventListener("pointermove", function (e) {
      if (!drawing || done) return; strike(pt(e));
      if (++moves % 6 === 0 && cleared() > 0.5) reveal("scratch");
    });
    function end() { if (!drawing) return; drawing = false; if (!done && cleared() > 0.5) reveal("scratch"); }
    cv.addEventListener("pointerup", end); cv.addEventListener("pointercancel", end);
    cv.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); reveal("key"); } });
    if ("ResizeObserver" in window) new ResizeObserver(paint).observe(wrap); else paint();
  })();

  /* ================= Petals (canvas) ================= */
  (function () {
    if (reduced) return;
    var cv = $("#petals"), cx = cv.getContext("2d"), dpr = Math.min(2, window.devicePixelRatio || 1), W, H, P = [], sv = 0, lastY = window.scrollY, raf = 0;
    var cols = ["#d98c80", "#c7776b", "#e6b3a8", "#b88a4a", "#f1d3c9"];
    function size() { W = cv.width = Math.floor(innerWidth * dpr); H = cv.height = Math.floor(innerHeight * dpr); }
    function mk(top) {
      var s = (7 + Math.random() * 10) * dpr;
      return { x: Math.random() * W, y: top ? -s * 2 : Math.random() * H, s: s, vy: (0.35 + Math.random() * 0.8) * dpr, vx: (Math.random() - 0.5) * 0.4 * dpr,
        r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.03, ph: Math.random() * 6.28, c: cols[(Math.random() * cols.length) | 0] };
    }
    function init() { size(); P = []; var n = innerWidth < 600 ? 14 : 26; for (var i = 0; i < n; i++) P.push(mk(false)); }
    function draw(q) {
      cx.save(); cx.translate(q.x, q.y); cx.rotate(q.r); cx.scale(1, 0.55 + 0.45 * Math.sin(q.ph)); cx.globalAlpha = 0.5; cx.fillStyle = q.c;
      cx.beginPath(); cx.moveTo(0, -q.s);
      cx.bezierCurveTo(q.s, -q.s * 0.6, q.s * 0.8, q.s * 0.8, 0, q.s);
      cx.bezierCurveTo(-q.s * 0.8, q.s * 0.8, -q.s, -q.s * 0.6, 0, -q.s); cx.fill(); cx.restore();
    }
    function loop(ts) {
      cx.clearRect(0, 0, W, H);
      var dy = window.scrollY - lastY; lastY = window.scrollY; sv = sv * 0.9 + dy * 0.1;
      P.forEach(function (q) {
        q.ph += 0.03; q.r += q.vr;
        q.y += q.vy + sv * 0.25 * dpr; q.x += q.vx + Math.sin(ts / 1200 + q.ph) * 0.6 * dpr;
        if (q.y > H + q.s * 2) Object.assign(q, mk(true));
        if (q.y < -q.s * 3) q.y = H + q.s;
        if (q.x < -q.s * 2) q.x = W + q.s; if (q.x > W + q.s * 2) q.x = -q.s;
        draw(q);
      });
      raf = requestAnimationFrame(loop);
    }
    init(); addEventListener("resize", init);
    raf = requestAnimationFrame(loop);
    document.addEventListener("visibilitychange", function () { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(loop); });
  })();

  /* ================= Confetti ================= */
  var cf = $("#confetti"), cfx = cf.getContext("2d"), bits = [], cfRaf = 0;
  var ccol = ["#a9584c", "#c7776b", "#7e3a30", "#f6f2ea", "#c9a96e"];
  function cfSize() { cf.width = innerWidth; cf.height = innerHeight; }
  cfSize(); addEventListener("resize", cfSize);
  function cfLoop() {
    cfx.clearRect(0, 0, cf.width, cf.height);
    bits.forEach(function (b) {
      b.vy += 0.18; b.x += b.vx; b.y += b.vy; b.r += b.vr;
      cfx.save(); cfx.translate(b.x, b.y); cfx.rotate(b.r); cfx.fillStyle = b.c; cfx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h); cfx.restore();
    });
    bits = bits.filter(function (b) { return b.y < cf.height + 20; });
    if (bits.length) cfRaf = requestAnimationFrame(cfLoop); else cfx.clearRect(0, 0, cf.width, cf.height);
  }
  function burst(el) {
    if (reduced) return;
    var r = el.getBoundingClientRect(), ox = r.left + r.width / 2, oy = r.top + r.height / 2;
    for (var k = 0; k < 90; k++) bits.push({ x: ox, y: oy, vx: (Math.random() - 0.5) * 10, vy: -Math.random() * 11 - 2, r: Math.random() * 6,
      vr: (Math.random() - 0.5) * 0.3, w: 5 + Math.random() * 6, h: 8 + Math.random() * 8, c: ccol[(Math.random() * ccol.length) | 0] });
    cancelAnimationFrame(cfRaf); cfLoop();
  }
  $("#heartBtn").addEventListener("click", function () { burst(this); track("heart_tap"); });

  /* ================= Scroll: reveal, progress, parallax ================= */
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else els.forEach(function (el) { el.classList.add("in"); });

  var prog = $("#progress"), ticking = false;
  addEventListener("scroll", function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      var h = document.documentElement.scrollHeight - innerHeight;
      prog.style.transform = "scaleX(" + (h > 0 ? Math.min(1, scrollY / h) : 0) + ")"; ticking = false;
    });
  }, { passive: true });

  var hero = $("#top");
  if (!reduced && matchMedia("(pointer: fine)").matches) {
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5) * 2);
      hero.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5) * 2);
    });
  }

  /* ================= SEO: canonical + structured data from config ================= */
  try {
    var link = document.createElement("link"); link.rel = "canonical"; link.href = location.origin + "/"; document.head.appendChild(link);
    var ld = $("#ld"), data = JSON.parse(ld.textContent);
    data.url = location.origin + "/";
    if (C.venueName) data.location.name = C.venueName;
    if (C.venueAddress) data.location.address = C.venueAddress;
    if (venue) data.location.geo = { "@type": "GeoCoordinates", latitude: venue.lat, longitude: venue.lng };
    ld.textContent = JSON.stringify(data);
  } catch (e) {}

  applyLang();
})();
