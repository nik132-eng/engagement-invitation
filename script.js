(function () {
  "use strict";
  var C = window.INVITE;
  var $ = function (s) { return document.querySelector(s); };

  /* ---------- Text (English / Gujarati) ---------- */
  var T = {
    en: {
      intro: "Together with our families,\nWe invite you to celebrate our Engagement 💍",
      groomName: "Nikunj", brideName: "Ayushi",
      scroll: "Scroll",
      welcome: "Welcome to the celebration of love and togetherness 💍✨\nWe are delighted to have you with us on our Engagement.",
      familiesTitle: "Our Families",
      groomParents: "Son of Champakbhai R. Rohit & Jaybalaben C. Rohit",
      brideParents: "Daughter of Kishmatbhai A. Andhariya & Rinkuben K. Andhariya",
      foreverTitle: "Our forever begins",
      invited: "You're Invited!",
      saveDate: "Save the Date", googleCal: "Add to Google Calendar", downloadIcs: "Download for Apple / Outlook",
      galleryTitle: "Our Moments",
      countTitle: "Forever, in",
      days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds",
      programTitle: "Program",
      event: "Engagement Ceremony",
      venueTitle: "Venue", directions: "Get Directions",
      giftsTitle: "Gifts", gifts: "Your blessings and presence are the best gift 💓",
      fName: "Your name", fAttend: "Will you be attending?", fSelect: "Select...",
      fYes: "Yes, I'll be there!", fNo: "Sorry, I can't make it", fMsg: "Your message", fSend: "Send on WhatsApp",
      closing: "We can't wait to celebrate with you!",
      signoff: "Nikunj & Ayushi",
      footer: "Made with love for Nikunj & Ayushi",
      done: "Celebrating today!"
    },
    gu: {
      intro: "અમારા બંને પરિવારો સાથે,\nઅમારા સગાઈ સમારોહમાં આપને સાદર આમંત્રણ 💍",
      groomName: "નિકુંજ", brideName: "આયુષી",
      scroll: "નીચે જુઓ",
      welcome: "પ્રેમ અને સાથની ઉજવણીમાં આપનું સ્વાગત છે 💍✨\nઅમારા સગાઈ પ્રસંગે આપની હાજરી અમારા માટે ખૂબ આનંદની વાત છે.",
      familiesTitle: "અમારા પરિવાર",
      groomParents: "ચંપકભાઈ આર. રોહિત અને જયબાળાબેન સી. રોહિતના સુપુત્ર",
      brideParents: "કિસ્મતભાઈ એ. આંધરિયા અને રિંકુબેન કે. આંધરિયાની સુપુત્રી",
      foreverTitle: "અમારી સફર અહીંથી શરૂ થાય છે",
      invited: "આપ સૌને આમંત્રણ",
      saveDate: "તારીખ સાચવો", googleCal: "Google Calendar માં ઉમેરો", downloadIcs: "Apple / Outlook માટે ડાઉનલોડ",
      galleryTitle: "અમારી યાદો",
      countTitle: "હવે બાકી છે",
      days: "દિવસ", hours: "કલાક", minutes: "મિનિટ", seconds: "સેકન્ડ",
      programTitle: "કાર્યક્રમ",
      event: "સગાઈ સમારોહ",
      venueTitle: "સ્થળ", directions: "દિશા મેળવો",
      giftsTitle: "ભેટ", gifts: "આપના આશીર્વાદ અને હાજરી જ અમારા માટે સૌથી મોટી ભેટ છે 💓",
      fName: "આપનું નામ", fAttend: "શું આપ હાજર રહેશો?", fSelect: "પસંદ કરો...",
      fYes: "હા, હું આવીશ!", fNo: "માફ કરશો, હું આવી શકીશ નહીં", fMsg: "આપનો સંદેશ", fSend: "WhatsApp પર મોકલો",
      closing: "આપની સાથે ઉજવણી કરવા અમે આતુર છીએ!",
      signoff: "નિકુંજ અને આયુષી",
      footer: "નિકુંજ અને આયુષી માટે પ્રેમથી બનાવેલ",
      done: "આજે ઉજવણી છે!"
    }
  };

  var lang = "en";
  try { lang = localStorage.getItem("inv-lang") || "en"; } catch (e) {}
  if (!T[lang]) lang = "en";

  /* ---------- Date helpers ---------- */
  var p = C.dateISO.split("-").map(Number);
  var tm = C.time ? C.time.split(":").map(Number) : null;
  var locale = function () { return lang === "gu" ? "gu-IN" : "en-IN"; };
  var dateAt = function (h, m) { return new Date(Date.UTC(p[0], p[1] - 1, p[2], h || 12, m || 0)); };
  var fmt = function (opts, d) { return new Intl.DateTimeFormat(locale(), Object.assign({ timeZone: "UTC" }, opts)).format(d); };

  function renderDates() {
    var d = dateAt(12, 0);
    $("#dateShort").textContent = fmt({ day: "numeric", month: "long", year: "numeric" }, d);
    $("#dateWeekday").textContent = fmt({ weekday: "long" }, d);
    $("#programDate").textContent = fmt({ weekday: "long", day: "numeric", month: "long", year: "numeric" }, d);
    var timeText = tm ? fmt({ hour: "numeric", minute: "2-digit" }, dateAt(tm[0], tm[1])) : "";
    $("#dateTime").textContent = timeText;
    $("#programTime").textContent = timeText;
  }

  function applyLang() {
    var dict = T[lang];
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n")];
      if (v != null) el.textContent = v;
    });
    $("#langLabel").textContent = lang === "en" ? "ગુજરાતી" : "English";
    renderDates();
    tick();
  }

  $("#langBtn").addEventListener("click", function () {
    lang = lang === "en" ? "gu" : "en";
    try { localStorage.setItem("inv-lang", lang); } catch (e) {}
    applyLang();
  });

  /* ---------- Venue ---------- */
  $("#venueName").textContent = C.venueName || "";
  $("#venueAddr").textContent = C.venueAddress || "";
  $("#mapBtn").href = C.mapUrl;

  /* ---------- Countdown ---------- */
  var target = new Date(C.dateISO + "T" + (C.time || "00:00") + ":00+05:30").getTime();
  var two = function (n) { return String(n).padStart(2, "0"); };
  function tick() {
    var diff = Math.max(0, target - Date.now());
    var s = Math.floor(diff / 1000);
    $("#cd-d").textContent = two(Math.floor(s / 86400));
    $("#cd-h").textContent = two(Math.floor((s % 86400) / 3600));
    $("#cd-m").textContent = two(Math.floor((s % 3600) / 60));
    $("#cd-s").textContent = two(s % 60);
  }
  setInterval(tick, 1000);

  /* ---------- Save the date ---------- */
  var saveBtn = $("#saveBtn"), saveMenu = $("#saveMenu");
  saveBtn.addEventListener("click", function () {
    var open = saveMenu.hidden;
    saveMenu.hidden = !open;
    saveBtn.setAttribute("aria-expanded", String(open));
  });

  var stamp = function (h, m, addHours) {
    var d = new Date(Date.UTC(p[0], p[1] - 1, p[2], h + (addHours || 0), m));
    return d.getUTCFullYear() + two(d.getUTCMonth() + 1) + two(d.getUTCDate()) + "T" + two(d.getUTCHours()) + two(d.getUTCMinutes()) + "00";
  };
  var dayStamp = function (add) {
    var d = new Date(Date.UTC(p[0], p[1] - 1, p[2] + (add || 0)));
    return d.getUTCFullYear() + two(d.getUTCMonth() + 1) + two(d.getUTCDate());
  };
  var calTitle = "Engagement of Nikunj & Ayushi";
  var calWhere = [C.venueName, C.venueAddress].filter(Boolean).join(", ") || C.mapUrl;
  var calDetails = "Join us to celebrate our engagement.\nDirections: " + C.mapUrl;
  var range = tm
    ? { start: stamp(tm[0], tm[1]), end: stamp(tm[0], tm[1], C.durationHours || 3) }
    : { start: dayStamp(0), end: dayStamp(1) };

  $("#gcalLink").href = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent(calTitle) +
    "&dates=" + range.start + "/" + range.end +
    (tm ? "&ctz=Asia/Kolkata" : "") +
    "&details=" + encodeURIComponent(calDetails) +
    "&location=" + encodeURIComponent(calWhere);

  $("#icsBtn").addEventListener("click", function () {
    var dt = tm ? "DTSTART;TZID=Asia/Kolkata:" + range.start + "\r\nDTEND;TZID=Asia/Kolkata:" + range.end
                : "DTSTART;VALUE=DATE:" + range.start + "\r\nDTEND;VALUE=DATE:" + range.end;
    var esc = function (s) { return String(s).replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n"); };
    var ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Nikunj and Ayushi//Engagement//EN", "BEGIN:VEVENT",
      "UID:engagement-" + C.dateISO + "@invitation", "DTSTAMP:" + dayStamp(0) + "T000000Z", dt,
      "SUMMARY:" + esc(calTitle), "DESCRIPTION:" + esc(calDetails), "LOCATION:" + esc(calWhere),
      "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = "nikunj-ayushi-engagement.ics";
    document.body.appendChild(a); a.click(); a.remove();
  });

  /* ---------- Gallery ---------- */
  if (C.photos && C.photos.length) {
    $("#gallerySection").hidden = false;
    var g = $("#gallery"), dots = $("#dots");
    C.photos.forEach(function (src, i) {
      var f = document.createElement("figure");
      var im = document.createElement("img");
      im.src = src; im.alt = "Nikunj & Ayushi, photo " + (i + 1); im.loading = "lazy";
      f.appendChild(im); g.appendChild(f);
      var dot = document.createElement("i"); if (!i) dot.className = "on"; dots.appendChild(dot);
    });
    g.addEventListener("scroll", function () {
      var i = Math.round(g.scrollLeft / g.clientWidth);
      [].forEach.call(dots.children, function (d, k) { d.className = k === i ? "on" : ""; });
    }, { passive: true });
  }

  /* ---------- RSVP via WhatsApp ---------- */
  if (C.whatsapp) {
    $("#rsvp").hidden = false;
    $("#rsvpForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.target, yes = f.attend.value === "yes";
      var msg = "Engagement RSVP\nName: " + f.name.value.trim() + "\nAttending: " + (yes ? "Yes" : "No") +
        (f.msg.value.trim() ? "\nMessage: " + f.msg.value.trim() : "");
      window.open("https://wa.me/" + C.whatsapp.replace(/\D/g, "") + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });
  }

  /* ---------- Music ---------- */
  if (C.music) {
    var bgm = $("#bgm"), mb = $("#musicBtn"), mi = $("#musicIcon");
    bgm.src = C.music; mb.hidden = false;
    mb.addEventListener("click", function () {
      if (bgm.paused) { bgm.play().then(function () { mi.textContent = "❚❚"; }).catch(function () {}); }
      else { bgm.pause(); mi.textContent = "♪"; }
    });
  }

  /* ---------- Floating hearts (hero) ---------- */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduced) {
    var hearts = $("#hearts");
    for (var i = 0; i < 14; i++) {
      var h = document.createElement("span");
      h.textContent = "♥";
      h.style.left = Math.random() * 100 + "%";
      h.style.fontSize = 10 + Math.random() * 16 + "px";
      h.style.animationDuration = 9 + Math.random() * 9 + "s";
      h.style.animationDelay = Math.random() * 10 + "s";
      hearts.appendChild(h);
    }
  }

  /* ---------- Confetti on heart tap ---------- */
  var cv = $("#confetti"), cx = cv.getContext("2d"), bits = [], raf = 0;
  var colors = ["#a9584c", "#c7776b", "#7e3a30", "#f6f2ea", "#c9a96e"];
  function size() { cv.width = innerWidth; cv.height = innerHeight; }
  size(); addEventListener("resize", size);
  function frame() {
    cx.clearRect(0, 0, cv.width, cv.height);
    bits.forEach(function (b) {
      b.vy += 0.18; b.x += b.vx; b.y += b.vy; b.r += b.vr;
      cx.save(); cx.translate(b.x, b.y); cx.rotate(b.r); cx.fillStyle = b.c;
      cx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h); cx.restore();
    });
    bits = bits.filter(function (b) { return b.y < cv.height + 20; });
    if (bits.length) raf = requestAnimationFrame(frame); else cx.clearRect(0, 0, cv.width, cv.height);
  }
  $("#heartBtn").addEventListener("click", function () {
    if (reduced) return;
    var r = this.getBoundingClientRect(), ox = r.left + r.width / 2, oy = r.top + r.height / 2;
    for (var k = 0; k < 90; k++) {
      bits.push({ x: ox, y: oy, vx: (Math.random() - 0.5) * 10, vy: -Math.random() * 11 - 2, r: Math.random() * 6,
        vr: (Math.random() - 0.5) * 0.3, w: 5 + Math.random() * 6, h: 8 + Math.random() * 8,
        c: colors[(Math.random() * colors.length) | 0] });
    }
    cancelAnimationFrame(raf); frame();
  });

  /* ---------- Scroll reveal ---------- */
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add("in"); }); }

  applyLang();
})();
