/* Demo lite landing — memakai threshold & aturan yang sama dengan web app.
   Nomor WA admin sudah terisi di index.html (6285158551178). */
(function () {
  "use strict";

  var LAT = -7.68, LON = 110.37; // Sleman (contoh)
  var THRESHOLD = 65;

  var WMO = { 0: "Cerah", 1: "Cerah berawan", 2: "Berawan", 3: "Mendung",
    45: "Berkabut", 48: "Berkabut",
    51: "Gerimis", 53: "Gerimis", 55: "Gerimis", 56: "Gerimis", 57: "Gerimis" };
  var RAIN = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99];
  function codeId(c) { return WMO[c] || (RAIN.indexOf(c) !== -1 ? "Hujan" : "Berawan"); }

  function $(id) { return document.getElementById(id); }

  function render(status, detail, risk) {
    var card = $("demoCard");
    var meta = {
      cepat: ["cepat", "🟢", "CEPAT — jemur luar"],
      normal: ["normal", "🟡", "NORMAL — jemur luar"],
      lambat: ["lambat", "🟠", "LAMBAT — pertimbangkan indoor"],
      tunda: ["tunda", "🔴", "TUNDA / JEMUR INDOOR"],
      unknown: ["unknown", "⏳", "Belum ada data"]
    }[status];
    card.setAttribute("data-status", meta[0]);
    $("demoIcon").textContent = meta[1];
    $("demoStatus").textContent = meta[2];
    $("demoDetail").textContent = detail;
    $("demoRisk").textContent = risk;
  }

  function mulai() {
    var url = "https://api.open-meteo.com/v1/forecast?latitude=" + LAT
      + "&longitude=" + LON
      + "&current=temperature_2m,weather_code,precipitation"
      + "&hourly=precipitation_probability&forecast_days=1&timezone=auto";
    fetch(url).then(function (r) {
      if (!r.ok) throw new Error("kode " + r.status);
      return r.json();
    }).then(function (d) {
      var c = d.current;
      // Pakai jam ke depan (cocokkan current.time), bukan 3 entri pertama yang bisa basi.
      var times = (d.hourly && d.hourly.time) || [];
      var probs = d.hourly.precipitation_probability || [];
      var start = 0;
      if (c.time) {
        for (var i = 0; i < times.length; i++) {
          if (times[i] >= c.time) { start = i; break; }
          start = i;
        }
      }
      var next3 = probs.slice(start, start + 3);
      var maks = next3.length ? Math.max.apply(null, next3.concat([0])) : 0;
      var hujan = (c.precipitation != null && c.precipitation > 0.5)
        || RAIN.indexOf(c.weather_code) !== -1;
      var detail = Math.round(c.temperature_2m) + "°C, " + codeId(c.weather_code) + " di lokasi contoh.";
      if (hujan || maks >= THRESHOLD) {
        render("tunda", detail + " Jangan jemur luar.", maks + "% — tinggi");
      } else if (maks >= 40) {
        render("normal", detail + " Estimasi kering ±4–6 jam.", maks + "% — sedang");
      } else {
        render("cepat", detail + " Estimasi kering ±2–3 jam.", maks + "% — rendah");
      }
    }).catch(function () {
      render("unknown", "Gagal memuat. Periksa koneksi lalu muat ulang halaman.", "…");
    });
  }

  document.addEventListener("DOMContentLoaded", mulai);
})();
