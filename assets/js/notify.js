/* Modul notifikasi: banner in-page (utama) + Browser Notification + bunyi. */
(function () {
  "use strict";

  var THRESHOLD_KEY = "jemurku_threshold_v1";
  var SOUND_KEY = "jemurku_sound_v1";
  var DEFAULT_THRESHOLD = 65;

  function getThreshold() {
    var v = parseInt(localStorage.getItem(THRESHOLD_KEY), 10);
    if (isNaN(v)) return DEFAULT_THRESHOLD;
    return Math.min(70, Math.max(60, v));
  }

  function setThreshold(v) {
    localStorage.setItem(THRESHOLD_KEY, String(v));
  }

  function soundOn() {
    var v = localStorage.getItem(SOUND_KEY);
    return v === null ? true : v === "1";
  }

  function setSound(on) {
    localStorage.setItem(SOUND_KEY, on ? "1" : "0");
  }

  function notifyStateText() {
    if (!("Notification" in window)) return "Browser ini tidak mendukung notifikasi.";
    if (Notification.permission === "granted") return "Notifikasi browser: aktif.";
    if (Notification.permission === "denied") return "Notifikasi browser: ditolak — banner di halaman tetap tampil.";
    return "Notifikasi browser: belum diminta.";
  }

  function requestPermission() {
    if (!("Notification" in window)) return Promise.resolve("unsupported");
    return Notification.requestPermission();
  }

  function beep() {
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      osc.type = "sine";
      gain.gain.value = 0.15;
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) { /* abaikan */ }
  }

  // Dipanggil setiap data baru masuk. Banner selalu; notif browser + bunyi opsional.
  function cekHujan(maxProb3, threshold) {
    var banner = document.getElementById("rainBanner");
    var text = document.getElementById("rainBannerText");
    var bahaya = maxProb3 >= threshold;

    if (bahaya) {
      text.textContent = "Peluang hujan " + maxProb3 + "% dalam 3 jam ke depan (ambang " + threshold + "%). Segera angkat jemuran!";
      banner.hidden = false;
      if (soundOn()) beep();
      if ("Notification" in window && Notification.permission === "granted") {
        try {
          new Notification("JemurKu: hujan mendekat!", {
            body: "Peluang hujan " + maxProb3 + "%. Segera angkat jemuran."
          });
        } catch (e) { /* abaikan */ }
      }
    } else {
      banner.hidden = true;
    }
    return bahaya;
  }

  window.JemurNotif = {
    getThreshold: getThreshold,
    setThreshold: setThreshold,
    soundOn: soundOn,
    setSound: setSound,
    notifyStateText: notifyStateText,
    requestPermission: requestPermission,
    cekHujan: cekHujan
  };
})();
