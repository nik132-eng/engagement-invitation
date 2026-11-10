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
      groomParents: "Son of Champakbhai R. Rohit & Jaybalaben C. Rohit",
      brideParents: "Daughter of Kishmatbhai A. Andhariya & Rinkuben K. Andhariya",
      foreverTitle: "Our forever begins", invited: "You're Invited!",
      saveDate: "Save the Date", googleCal: "Add to Google Calendar", downloadIcs: "Download for Apple / Outlook",
      countTitle: "Counting down", days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds",
      countBefore: "until our engagement ceremony begins", countLive: "It's today. The celebration is on! 💍", countAfter: "Thank you for celebrating with us 💓",
      galleryTitle: "Our Moments",
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
      footer: "Made with love for Nikunj & Ayushi", dockRsvp: "RSVP", nowPlaying: "composed for you"
    },
    gu: {
      splashKicker: "આપ સૌને આમંત્રણ", tapOpen: "ખોલવા માટે સીલ પર ટેપ કરો",
      intro: "અમારા બંને પરિવારો સાથે,\nઅમારા સગાઈ સમારોહમાં આપને સાદર આમંત્રણ 💍",
      groomName: "નિકુંજ", brideName: "આયુષી", scroll: "નીચે જુઓ",
      welcome: "પ્રેમ અને સાથની ઉજવણીમાં આપનું સ્વાગત છે 💍✨\nઅમારા સગાઈ પ્રસંગે આપની હાજરી અમારા માટે ખૂબ આનંદની વાત છે.",
      familiesTitle: "અમારા પરિવાર",
      groomParents: "ચંપકભાઈ આર. રોહિત અને જયબાળાબેન સી. રોહિતના સુપુત્ર",
      brideParents: "કિસ્મતભાઈ એ. આંધરિયા અને રિંકુબેન કે. આંધરિયાની સુપુત્રી",
      foreverTitle: "અમારી સફર અહીંથી શરૂ થાય છે", invited: "આપ સૌને આમંત્રણ",
      saveDate: "તારીખ સાચવો", googleCal: "Google Calendar માં ઉમેરો", downloadIcs: "Apple / Outlook માટે ડાઉનલોડ",
      countTitle: "ગણતરી ચાલુ છે", days: "દિવસ", hours: "કલાક", minutes: "મિનિટ", seconds: "સેકન્ડ",
      countBefore: "અમારા સગાઈ સમારોહ શરૂ થવામાં", countLive: "આજે જ છે. ઉજવણી ચાલુ છે! 💍", countAfter: "અમારી સાથે ઉજવણી કરવા બદલ આભાર 💓",
      galleryTitle: "અમારી યાદો",
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
      footer: "નિકુંજ અને આયુષી માટે પ્રેમથી બનાવેલ", dockRsvp: "RSVP", nowPlaying: "તમારા માટે રચાયેલ"
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
    $("#langLabel").textContent = lang === "en" ? "ગુજરાતી" : "English";
    renderDates(); renderDistance(); tick(); updateTitleLabel(); renderThanks();
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
      im.src = src; im.alt = "Nikunj & Ayushi, photo " + (i + 1); im.loading = "lazy"; im.decoding = "async";
      f.appendChild(im); g.appendChild(f);
      var dot = document.createElement("i"); if (!i) dot.className = "on"; dots.appendChild(dot);
    });
    g.addEventListener("scroll", function () {
      var i = Math.round(g.scrollLeft / g.clientWidth);
      [].forEach.call(dots.children, function (d, k) { d.className = k === i ? "on" : ""; });
    }, { passive: true });
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
    var payload = { name: name, attending: attending, guests: attending === "yes" ? guests : 0, message: form.message.value.trim(), distanceKm: distanceKm, lang: lang };
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

  /* ================= Music ================= */
  var music = (function () {
    var audio = $("#bgm"), playBtn = $("#playBtn"), nextBtn = $("#nextBtn"), np = $("#nowPlaying"), npTitle = $("#npTitle");
    var tracks = (C.tracks || []).slice(), order = [], idx = 0, mode = tracks.length ? "files" : "gen";
    var playing = false, started = false, wantPlay = false, curTitle = "";

    /* ---- shared UI ---- */
    function ui(on) {
      playing = on;
      $("#icPlay").hidden = on; $("#icPause").hidden = !on;
      playBtn.setAttribute("aria-pressed", String(on));
      np.hidden = !started; np.classList.toggle("paused", !on);
    }
    function setTitle(s) { curTitle = s; updateTitleLabel(); }
    window.updateTitleLabel = function () {
      npTitle.textContent = curTitle ? curTitle + (mode === "gen" ? " · " + t("nowPlaying") : "") : "";
    };

    /* ---- Mode A: your own tracks (shuffled) ---- */
    function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
    function loadFile(i) {
      var tr = tracks[order[i]]; audio.src = tr.src; setTitle(tr.title || "Romantic song");
      return audio.play().then(function () { ui(true); }).catch(function () { ui(false); });
    }
    audio.addEventListener("ended", function () { filesNext(); });
    function filesNext() { idx = (idx + 1) % order.length; track("music_next"); return loadFile(idx); }

    /* ---- Mode B: a unique romantic piece composed live for each visitor ---- */
    var ctx, master, bus, verb, timer = null, nextTime = 0, bar = 0, S = null;
    var SCALE = [0, 2, 4, 5, 7, 9, 11];
    var PROGS = [[0, 4, 5, 3], [5, 3, 0, 4], [0, 5, 3, 4], [0, 2, 3, 4], [3, 4, 2, 5], [0, 3, 5, 4]]; /* I V vi IV style loops */
    var RHYTHMS = [[2, 1, 1], [1, 1, 2], [3, 1], [1, 1, 1, 1], [2, 2], [1.5, 0.5, 2]];
    var A = ["Moonlit", "Golden", "Rose", "Velvet", "Silver", "Soft", "Endless", "Whispered", "Evening", "Sunlit"];
    var B = ["Promise", "Evening", "Petals", "Melody", "Dance", "Vows", "Dreams", "Forever", "Embrace", "Waltz"];
    var rnd = function (n) { return Math.floor(Math.random() * n); };
    var pick = function (a) { return a[rnd(a.length)]; };
    var mtof = function (m) { return 440 * Math.pow(2, (m - 69) / 12); };
    var degNote = function (i) { return S.root + SCALE[((i % 7) + 7) % 7] + 12 * Math.floor(i / 7); };

    function newSong() {
      var title, a, b2; do { a = pick(A); b2 = pick(B); title = a + " " + b2; } while (title === curTitle || a === b2);
      S = { root: 48 + rnd(7), bpm: 60 + rnd(19), prog: pick(PROGS), title: title, mel: 9 + rnd(3), bars: 0,
            pat: pick([[0, 1, 2, 1, 0, 1, 2, 1], [0, 2, 1, 2, 0, 2, 1, 2], [0, 1, 2, 3, 2, 1, 2, 1], [0, 1, 2, 1, 3, 1, 2, 1]]) };
      bar = 0; setTitle(S.title);
    }
    function makeReverb() {
      var len = ctx.sampleRate * 3.2, buf = ctx.createBuffer(2, len, ctx.sampleRate);
      for (var c = 0; c < 2; c++) { var d = buf.getChannelData(c); for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
      var cv = ctx.createConvolver(); cv.buffer = buf; return cv;
    }
    function initAudio() {
      var AC = window.AudioContext || window.webkitAudioContext; ctx = new AC();
      master = ctx.createGain(); master.gain.value = 0;
      var comp = ctx.createDynamicsCompressor(); master.connect(comp); comp.connect(ctx.destination);
      bus = ctx.createGain(); bus.connect(master);
      verb = makeReverb(); var wet = ctx.createGain(); wet.gain.value = 0.55; bus.connect(verb); verb.connect(wet); wet.connect(master);
    }
    function voice(freq, at, dur, o) {
      var osc = ctx.createOscillator(), g = ctx.createGain(), out = g;
      osc.type = o.type || "sine"; osc.frequency.value = freq; if (o.detune) osc.detune.value = o.detune;
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(o.gain, at + (o.attack || 0.01));
      g.gain.exponentialRampToValueAtTime(0.0001, at + dur + (o.release || 0.4));
      osc.connect(g);
      if (o.lp) { var f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = o.lp; g.connect(f); out = f; }
      out.connect(bus); osc.start(at); osc.stop(at + dur + (o.release || 0.4) + 0.05);
    }
    function scheduleBar(at) {
      var beat = 60 / S.bpm, barLen = beat * 4, deg = S.prog[bar % S.prog.length], i;
      var ch = [degNote(deg), degNote(deg + 2), degNote(deg + 4)];
      ch.forEach(function (n) { [-7, 7].forEach(function (dt) { voice(mtof(n + 12), at, barLen, { type: "triangle", gain: 0.03, attack: 1.1, release: 1.8, detune: dt, lp: 1100 }); }); });
      voice(mtof(ch[0] - 12), at, barLen * 0.92, { type: "sine", gain: 0.2, attack: 0.03, release: 0.5 });
      for (i = 0; i < 8; i++) {
        var k = S.pat[i], n = ch[k % 3] + 12 * Math.floor(k / 3) + 12;
        voice(mtof(n), at + i * beat / 2, 0.05, { type: "triangle", gain: 0.085, attack: 0.006, release: 1.1 });
      }
      var t0 = at + (bar % 4 === 3 ? beat * 0.5 : 0), r = pick(RHYTHMS), pos = 0, note;
      for (i = 0; i < r.length; i++) {
        if (Math.random() > 0.15) {
          S.mel = Math.max(7, Math.min(14, S.mel + pick([-2, -1, -1, 0, 1, 1, 2])));
          note = degNote(S.mel);
          var f0 = mtof(note), ds = r[i] * beat, st = t0 + pos * beat;
          voice(f0, st, ds * 0.9, { type: "sine", gain: 0.1, attack: 0.02, release: 1.5 });
          voice(f0 * 2, st, ds * 0.5, { type: "sine", gain: 0.03, attack: 0.02, release: 1.0 });
        }
        pos += r[i];
      }
      bar++; S.bars++;
    }
    function pump() {
      while (nextTime < ctx.currentTime + 1.6) {
        if (S.bars >= 16) { newSong(); track("music_song", { title: S.title }); }
        scheduleBar(nextTime); nextTime += (60 / S.bpm) * 4;
      }
    }
    function genStart() {
      if (!ctx) { initAudio(); newSong(); }
      ui(true); /* optimistic: the button flips instantly, reverts if the browser refuses */
      return ctx.resume().then(function () {
        nextTime = ctx.currentTime + 0.15; pump();
        timer = setInterval(pump, 250);
        master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 2.5);
        ui(true);
      }).catch(function () { ui(false); });
    }
    function genPause() {
      clearInterval(timer); timer = null;
      if (!ctx) return;
      master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      setTimeout(function () { if (!timer) ctx.suspend(); }, 700);
      ui(false);
    }
    function genNext() {
      if (!ctx || !playing) return genStart();
      newSong(); track("music_next");
      nextTime = ctx.currentTime + 0.2; /* new song begins on the next bar */
    }

    /* ---- public ---- */
    function start() {
      started = true; wantPlay = true;
      if (mode === "files") { order = shuffle(tracks.map(function (_, i) { return i; })); idx = 0; loadFile(0); }
      else genStart();
      track("music_start", { mode: mode });
    }
    function toggle() {
      if (!started) { start(); return; }
      if (playing) { wantPlay = false; mode === "files" ? (audio.pause(), ui(false)) : genPause(); track("music_pause"); }
      else { wantPlay = true; mode === "files" ? audio.play().then(function () { ui(true); }) : genStart(); track("music_resume"); }
    }
    function next() { if (!started) { start(); return; } if (mode === "files") filesNext(); else genNext(); }
    playBtn.addEventListener("click", toggle);
    nextBtn.addEventListener("click", next);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden && playing) { mode === "files" ? (audio.pause(), ui(false)) : genPause(); }
      else if (!document.hidden && wantPlay && !playing && started) { mode === "files" ? audio.play().then(function () { ui(true); }).catch(function () {}) : genStart(); }
    });
    return { start: start };
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
