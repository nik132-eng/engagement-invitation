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
      intro: "Welcome to the celebration of love & togetherness\nWe are delighted to invite you in our engagement ceremony.",
      groomName: "Nikunj", brideName: "Ayushi", scroll: "Scroll",
      familiesTitle: "Our Families",
      familiesLine: "Two souls, two families,\none beautiful beginning.",
      groomParents: "Shri Champakbhai R. Rohit\n&\nA. Sau. Jaybalaben C. Rohit", groomRel: "Their son", groomTitle: "Nikunj",
      brideParents: "Shri Kismatbhai A. Andhariya\n&\nA. Sau. Rinkuben K. Andhariya", brideRel: "Their daughter", brideTitle: "Ayushi",
      familiesBlessing: "Where two hearts meet, two families become one,\nand every blessing turns into a promise of forever.",
      foreverTitle: "Our forever begins", invited: "You're Invited!",
      saveDate: "Save the Date", googleCal: "Add to Google Calendar", downloadIcs: "Download for Apple / Outlook",
      countTitle: "Counting down", days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds",
      countBefore: "until our engagement ceremony begins", countLive: "It's today. The celebration is on! 💍", countAfter: "Thank you for celebrating with us 💓",
      galleryTitle: "Our Moments", galShuffle: "Shuffle photos",
      songsTitle: "Songs of Love", songsNote: "Romantic songs play on their own, one after another. Tap any song to play from there.", songsShuffle: "Shuffle all songs",
      programTitle: "Program", stepChandla: "Chandla Vidhi", stepGoldhana: "Goldhana", stepRing: "Ring Ceremony", stepGreetings: "Greetings & Wishes", stepDinner: "Dinner",
      venueTitle: "Venue", directions: "Get Directions",
      distTitle: "How far are you?", distBtn: "Show my distance",
      distAway: "About {km} km away", distNear: "You're less than 1 km away!", distLoading: "Finding your distance…",
      distDenied: "Location is off. Tap to try again.",
      distFrom: "You are in {place}",
      distNote: "Your exact location stays on your phone. Only the rounded distance and the nearest city name are shared if you reply.",
      fName: "Your name", fAttend: "Will you be attending?", fYes: "Yes, I'll be there!", fNo: "Sorry, I can't make it",
      fGuests: "Total guests (including you)", fMsg: "Your message (optional)", fSend: "Send", fSending: "Sending…",
      fNeedName: "Please enter your name.", fError: "Couldn't send your reply. Please try again.", fErrorWa: "Or send it on WhatsApp",
      thanksName: "Thank you, {name}!", thanksYes: "We've noted your reply. See you on 12 December!", thanksNo: "Thanks for letting us know. You'll be missed.",
      fEdit: "Change my reply",
      closing: "We can't wait to celebrate with you!", signoff: "Nikunj & Ayushi",
      footer: "Made with love for Nikunj & Ayushi", dockRsvp: "Reply",
      rsvpTitle: "Waiting for your response",
      scratchHint: "Scratch to reveal the date", scratchAria: "Scratch to reveal the date and time. Press Enter to reveal them."
    },
    gu: {
      splashKicker: "આપ સૌને આમંત્રણ", tapOpen: "ખોલવા માટે સીલ પર ટેપ કરો",
      intro: "પ્રેમ અને સાથની ઉજવણીમાં આપનું સ્વાગત છે\nઅમારા સગાઈ સમારોહમાં આપને આમંત્રિત કરતાં અમને ખૂબ આનંદ થાય છે.",
      groomName: "નિકુંજ", brideName: "આયુષી", scroll: "નીચે જુઓ",
      familiesTitle: "અમારા પરિવાર",
      familiesLine: "બે આત્મા, બે પરિવાર,\nએક સુંદર શરૂઆત.",
      groomParents: "શ્રી ચંપકભાઈ આર. રોહિત\nઅને\nઅ. સૌ. જયબાળાબેન સી. રોહિતના", groomRel: "સુપુત્ર", groomTitle: "ચિ. નિકુંજ",
      brideParents: "શ્રી કિસ્મતભાઈ એ. અંધારિયા\nઅને\nઅ. સૌ. રિંકુબેન કે. અંધારિયાની", brideRel: "સુપુત્રી", brideTitle: "ચિ. આયુષી",
      familiesBlessing: "જ્યાં બે હૃદય મળે છે, ત્યાં બે પરિવાર એક થાય છે,\nઅને દરેક આશીર્વાદ સદાના સાથનું વચન બની જાય છે.",
      foreverTitle: "અમારી સફર અહીંથી શરૂ થાય છે", invited: "આપ સૌને આમંત્રણ",
      saveDate: "તારીખ સાચવો", googleCal: "Google Calendar માં ઉમેરો", downloadIcs: "Apple / Outlook માટે ડાઉનલોડ",
      countTitle: "ગણતરી ચાલુ છે", days: "દિવસ", hours: "કલાક", minutes: "મિનિટ", seconds: "સેકન્ડ",
      countBefore: "અમારા સગાઈ સમારોહ શરૂ થવામાં", countLive: "આજે જ છે. ઉજવણી ચાલુ છે! 💍", countAfter: "અમારી સાથે ઉજવણી કરવા બદલ આભાર 💓",
      galleryTitle: "અમારી યાદો", galShuffle: "ફોટા શફલ કરો",
      songsTitle: "પ્રેમનાં ગીતો", songsNote: "રોમેન્ટિક ગીતો એક પછી એક આપોઆપ વાગે છે. કોઈ પણ ગીત પર ટેપ કરો અને ત્યાંથી સાંભળો.", songsShuffle: "બધાં ગીતો શફલ કરો",
      programTitle: "કાર્યક્રમ", stepChandla: "ચાંદલા વિધિ", stepGoldhana: "ગોળ ધાણા", stepRing: "રિંગ સેરેમની", stepGreetings: "અભિનંદન અને શુભેચ્છાઓ", stepDinner: "ભોજન",
      venueTitle: "સ્થળ", directions: "દિશા મેળવો",
      distTitle: "તમે કેટલા દૂર છો?", distBtn: "મારું અંતર બતાવો",
      distAway: "આશરે {km} કિમી દૂર", distNear: "તમે 1 કિમીથી પણ ઓછા દૂર છો!", distLoading: "અંતર શોધી રહ્યા છીએ…",
      distDenied: "લોકેશન બંધ છે. ફરી પ્રયત્ન કરવા ટેપ કરો.",
      distFrom: "તમે {place} માં છો",
      distNote: "તમારું ચોક્કસ લોકેશન તમારા ફોનમાં જ રહે છે. જવાબ આપો તો ફક્ત આશરે અંતર અને નજીકના શહેરનું નામ શેર થાય છે.",
      fName: "આપનું નામ", fAttend: "શું આપ હાજર રહેશો?", fYes: "હા, હું આવીશ!", fNo: "માફ કરશો, હું આવી શકીશ નહીં",
      fGuests: "કુલ મહેમાન (આપ સહિત)", fMsg: "આપનો સંદેશ (વૈકલ્પિક)", fSend: "મોકલો", fSending: "મોકલી રહ્યા છીએ…",
      fNeedName: "કૃપા કરીને આપનું નામ લખો.", fError: "જવાબ મોકલી શકાયું નહીં. ફરી પ્રયત્ન કરો.", fErrorWa: "અથવા WhatsApp પર મોકલો",
      thanksName: "આભાર, {name}!", thanksYes: "આપની હાજરીની નોંધ થઈ ગઈ છે. 12 ડિસેમ્બરે મળીએ!", thanksNo: "જાણ કરવા બદલ આભાર. આપની ખોટ સાલશે.",
      fEdit: "જવાબ બદલો",
      closing: "આપની સાથે ઉજવણી કરવા અમે આતુર છીએ!", signoff: "નિકુંજ અને આયુષી",
      footer: "નિકુંજ અને આયુષી માટે પ્રેમથી બનાવેલ", dockRsvp: "જવાબ આપો",
      rsvpTitle: "આપના જવાબની રાહ જોઈ રહ્યા છીએ",
      scratchHint: "તારીખ જોવા સ્ક્રેચ કરો", scratchAria: "તારીખ અને સમય જોવા સ્ક્રેચ કરો. સીધું જોવા Enter દબાવો."
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

  /* "4:30 PM onwards" / "સાંજે 4:30 વાગ્યાથી", from the start time in config.js */
  function timeFrom() {
    if (!tm) return "";
    var h = tm[0], clock = (h % 12 || 12) + ":" + two(tm[1]);
    if (lang === "gu") return (h < 12 ? "સવારે" : h < 16 ? "બપોરે" : h < 20 ? "સાંજે" : "રાત્રે") + " " + clock + " વાગ્યાથી";
    return clock + " " + (h >= 12 ? "PM" : "AM") + " onwards";
  }
  function renderDates() {
    var d = utc(12, 0);
    $("#dateDay").textContent = fmt({ day: "numeric" }, d);
    $("#dateMonthYear").textContent = fmt({ month: "long", year: "numeric" }, d);
    $("#dateWeekday").textContent = fmt({ weekday: "long" }, d);
    $("#dateTime").textContent = timeFrom();
    $("#programDate").textContent = fmt({ weekday: "long", day: "numeric", month: "long", year: "numeric" }, d);
    $("#programTime").textContent = timeFrom();
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = T[lang][el.getAttribute("data-i18n")];
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-anim]").forEach(splitText);
    $("#heartFoil").setAttribute("aria-label", t("scratchAria"));
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
  var distanceKm = null, distState = "idle", asked = false, place = null;

  function haversine(a, b) {
    var R = 6371, r = Math.PI / 180, dLat = (b.lat - a.lat) * r, dLng = (b.lng - a.lng) * r;
    var x = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.pow(Math.sin(dLng / 2), 2);
    return 2 * R * Math.asin(Math.sqrt(x));
  }
  /* nearest city to the guest, worked out on the phone from a bundled GeoNames list: the position itself is never sent anywhere */
  function nearestPlace(lat, lng) {
    return fetch("assets/places.json").then(function (r) { return r.json(); }).then(function (d) {
      var best = null, bestKm = 150;
      d.c.forEach(function (c) { var km = haversine({ lat: lat, lng: lng }, { lat: c[1], lng: c[2] }); if (km < bestKm) { bestKm = km; best = c; } });
      if (!best) return null;
      var parts = [best[0]], region = d.a[best[4]];
      if (region && region !== best[0]) parts.push(region);
      try { parts.push(new Intl.DisplayNames(["en"], { type: "region" }).of(best[3])); } catch (e) {}
      return parts.join(", ");
    }).catch(function () { return null; });
  }
  function renderDistance() {
    if (!venue) return;
    var out = $("#distOut"), btn = $("#distBtn");
    $("#distPlace").textContent = distState === "ok" && place ? t("distFrom").replace("{place}", place) : "";
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
      nearestPlace(pos.coords.latitude, pos.coords.longitude).then(function (p) { place = p; renderDistance(); });
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

  /* ================= Gallery: a shuffled 3D coverflow with autoplay ================= */
  if (C.photos && C.photos.length) {
    $("#gallerySection").hidden = false;
    var g = $("#gallery"), dots = $("#dots"), figs = [], gIdx = -1, gRaf = 0, gPausedUntil = 0, gVisible = false, gDealt = false;
    var shuffled = function (a) { var b = a.slice(); for (var i = b.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = b[i]; b[i] = b[j]; b[j] = x; } return b; };
    var gPause = function () { gPausedUntil = Date.now() + 9000; };
    function gGo(i) {
      var f = figs[(i + figs.length) % figs.length];
      g.scrollTo({ left: f.offsetLeft - (g.clientWidth - f.offsetWidth) / 2, behavior: reduced ? "auto" : "smooth" });
    }

    /* every frame of the scroll: tilt and shrink the photos away from the centre, mark the centred one */
    function paintGallery() {
      gRaf = 0;
      var mid = g.scrollLeft + g.clientWidth / 2, best = 0, bestD = Infinity;
      figs.forEach(function (f, i) {
        var d = (f.offsetLeft + f.offsetWidth / 2 - mid) / (f.offsetWidth || 1), a = Math.min(1, Math.abs(d));
        if (!reduced) {
          f.firstChild.style.transform = "rotateY(" + (-d * 30).toFixed(1) + "deg) scale(" + (1 - a * 0.14).toFixed(3) + ")";
          f.firstChild.style.opacity = (1 - a * 0.5).toFixed(2);
        }
        f.style.zIndex = String(10 - Math.round(a * 5));
        if (Math.abs(d) < bestD) { bestD = Math.abs(d); best = i; }
      });
      if (best !== gIdx) {
        if (figs[gIdx]) figs[gIdx].classList.remove("is-active");
        figs[best].classList.add("is-active"); gIdx = best;
        [].forEach.call(dots.children, function (dt, k) { dt.className = k === best ? "on" : ""; });
      }
    }
    /* a fresh random order every visit, and again on the Shuffle button */
    function buildGallery() {
      g.textContent = ""; dots.textContent = ""; figs = []; gIdx = -1;
      shuffled(C.photos).forEach(function (src, i) {
        var f = document.createElement("figure"), card = document.createElement("div"), im = document.createElement("img");
        card.className = "gallery__card"; card.style.setProperty("--k", i);
        im.src = src; im.alt = "Nikunj & Ayushi, photo " + (i + 1); im.loading = i < 3 ? "eager" : "lazy"; im.decoding = "async";
        im.width = 1080; im.height = 1440;
        card.appendChild(im); f.appendChild(card); g.appendChild(f); figs.push(f);
        dots.appendChild(document.createElement("i"));
      });
      g.scrollTo({ left: 0, behavior: "instant" });
      paintGallery();
    }
    /* the photos fly in like dealt cards */
    function deal() {
      g.classList.remove("dealing"); void g.offsetWidth; g.classList.add("dealing");
      setTimeout(function () { g.classList.remove("dealing"); }, 1800);
    }

    buildGallery();
    g.addEventListener("scroll", function () { if (!gRaf) gRaf = requestAnimationFrame(paintGallery); }, { passive: true });
    addEventListener("resize", paintGallery);
    ["pointerdown", "wheel", "touchstart"].forEach(function (ev) { g.addEventListener(ev, gPause, { passive: true }); });
    g.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); gPause(); gGo(gIdx + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); gPause(); gGo(gIdx - 1); }
    });
    $("#galPrev").addEventListener("click", function () { gPause(); gGo(gIdx - 1); });
    $("#galNext").addEventListener("click", function () { gPause(); gGo(gIdx + 1); });
    $("#galShuffle").addEventListener("click", function () { gPause(); buildGallery(); if (!reduced) deal(); track("gallery_shuffle"); });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) {
        gVisible = en[0].isIntersecting;
        if (gVisible && !gDealt) { gDealt = true; if (!reduced) deal(); }
      }, { threshold: 0.35 }).observe($("#gallerySection"));
    } else gVisible = true;
    /* slideshow: moves on by itself while the gallery is on screen, and waits when a guest touches it */
    if (!reduced) setInterval(function () { if (gVisible && !document.hidden && Date.now() > gPausedUntil) gGo(gIdx + 1); }, 4800);
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
      a.href = "https://wa.me/" + String(C.whatsapp).replace(/\D/g, "") + "?text=" + encodeURIComponent("Engagement reply: " + form.name.value.trim() + " - " + (form.attend.value === "yes" ? "Yes" : "No"));
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
    var payload = { name: name, attending: attending, guests: attending === "yes" ? guests : 0, message: form.message.value.trim(), distanceKm: distanceKm, place: place, lang: lang, t: Math.round(performance.now()) };
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
  /* tapping the heart showers confetti, once the date has been scratched clear */
  $("#heartBtn").addEventListener("click", function () { if (!heartRevealed) return; burst(this); track("heart_tap"); });

  /* ================= Heart: the date and time sit under gold foil; scratch to reveal ================= */
  var heartRevealed = false;
  (function () {
    var heart = $("#heartBtn"), cv = $("#heartFoil"), cx = cv.getContext("2d");
    var dpr = Math.min(2, window.devicePixelRatio || 1), W = 0, H = 0, done = false, drawing = false, last = null, moves = 0, probe = [];
    var HEART = "M0.5,0.96 C0.5,0.96 0.06,0.70 0.06,0.36 C0.06,0.18 0.20,0.06 0.32,0.06 C0.42,0.06 0.48,0.14 0.5,0.24 C0.52,0.14 0.58,0.06 0.68,0.06 C0.80,0.06 0.94,0.18 0.94,0.36 C0.94,0.70 0.5,0.96 0.5,0.96 Z";

    function paint() {
      if (done) return;
      var w = cv.offsetWidth, h = cv.offsetHeight;
      if (!w) return;
      W = cv.width = Math.round(w * dpr); H = cv.height = Math.round(h * dpr);
      /* foil only inside the heart */
      cx.save(); cx.scale(W, H); cx.clip(new Path2D(HEART)); cx.setTransform(1, 0, 0, 1, 0, 0);
      var g = cx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "#cfa857"); g.addColorStop(0.3, "#f4e2ab"); g.addColorStop(0.55, "#c79b49"); g.addColorStop(0.8, "#ead08a"); g.addColorStop(1, "#bb8c3f");
      cx.fillStyle = g; cx.fillRect(0, 0, W, H);
      cx.globalAlpha = 0.18; cx.strokeStyle = "#fff"; cx.lineWidth = dpr;
      for (var x = -H; x < W; x += 9 * dpr) { cx.beginPath(); cx.moveTo(x, H); cx.lineTo(x + H, 0); cx.stroke(); }
      cx.globalAlpha = 0.5; cx.fillStyle = "#fff";
      for (var i = 0; i < 110; i++) { cx.beginPath(); cx.arc(Math.random() * W, Math.random() * H, (0.4 + Math.random() * 1.3) * dpr, 0, 6.283); cx.fill(); }
      cx.globalAlpha = 1; cx.restore();
      /* remember which sample points are foil, so "mostly scratched" is measured on the heart only */
      var d = cx.getImageData(0, 0, W, H).data; probe = [];
      for (var k = 3; k < d.length; k += 64) if (d[k] > 128) probe.push(k);
    }
    function reveal(via) {
      if (done) return; done = true; heartRevealed = true;
      heart.classList.add("revealed"); cv.setAttribute("aria-hidden", "true"); cv.tabIndex = -1;
      track("date_revealed", { via: via });
      if (!reduced) setTimeout(function () { burst(heart); }, 250);
    }
    function pt(e) { var r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * H / r.height }; }
    function cleared() {
      var d = cx.getImageData(0, 0, W, H).data, n = 0;
      for (var k = 0; k < probe.length; k++) if (d[probe[k]] < 128) n++;
      return probe.length ? n / probe.length : 1;
    }
    function strike(p) {
      cx.globalCompositeOperation = "destination-out"; cx.lineCap = "round"; cx.lineJoin = "round"; cx.lineWidth = 38 * dpr;
      cx.beginPath(); cx.moveTo(last.x, last.y); cx.lineTo(p.x + 0.01, p.y); cx.stroke(); last = p;
    }
    cv.addEventListener("pointerdown", function (e) {
      if (done) return; e.preventDefault(); drawing = true;
      try { cv.setPointerCapture(e.pointerId); } catch (x) {} /* throws if the pointer is already gone; scratching still works */
      heart.classList.add("scratching"); last = pt(e); strike(last);
    });
    cv.addEventListener("pointermove", function (e) {
      if (!drawing || done) return; strike(pt(e));
      if (++moves % 6 === 0 && cleared() > 0.55) reveal("scratch");
    });
    function end() { if (!drawing) return; drawing = false; if (!done && cleared() > 0.55) reveal("scratch"); }
    cv.addEventListener("pointerup", end); cv.addEventListener("pointercancel", end);
    cv.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); reveal("key"); } });
    if ("ResizeObserver" in window) new ResizeObserver(paint).observe(heart); else paint();
  })();

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
