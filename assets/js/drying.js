/* Modul estimasi pengeringan — rule v1 yang dikunci (lihat PRD FR-3). */
(function () {
  "use strict";

  var STATUS = {
    cepat: { icon: "🟢", title: "CEPAT — jemur luar", desc: "Kondisi bagus. Estimasi kering ±2–3 jam." },
    normal: { icon: "🟡", title: "NORMAL — jemur luar", desc: "Kondisi sedang. Estimasi kering ±4–6 jam." },
    lambat: { icon: "🟠", title: "LAMBAT — pertimbangkan indoor", desc: "Lembap/mendung. Estimasi ±7–9 jam." },
    tunda: { icon: "🔴", title: "TUNDA / JEMUR INDOOR", desc: "Hujan aktif atau peluang hujan tinggi. Jangan jemur luar." }
  };

  function hitungEstimasi(current, hours3, threshold) {
    var reasons = [];
    var maxProb = window.JemurCuaca.maxProb(hours3);
    var hujanAktif = (current.precipitation != null && current.precipitation > 0.5)
      || window.JemurCuaca.isRainCode(current.weather_code);

    if (hujanAktif) reasons.push("Hujan terdeteksi saat ini (" + window.JemurCuaca.codeToId(current.weather_code) + ").");
    reasons.push("Peluang hujan maks 3 jam ke depan: " + maxProb + "% (ambang " + threshold + "%).");

    if (hujanAktif || maxProb >= threshold) {
      return { key: "tunda", maxProb3: maxProb, reasons: reasons };
    }

    var skor = 0;
    var temp = current.temperature_2m, hum = current.relative_humidity_2m;
    var wind = current.wind_speed_10m, cloud = current.cloud_cover;

    if (temp >= 30) { skor++; reasons.push("Suhu " + Math.round(temp) + "°C mendukung (≥30°C)."); }
    else reasons.push("Suhu " + Math.round(temp) + "°C kurang panas.");
    if (hum <= 60) { skor++; reasons.push("Kelembapan " + hum + "% kering (≤60%)."); }
    else reasons.push("Kelembapan " + hum + "% agak lembap.");
    if (wind >= 15) { skor++; reasons.push("Angin " + Math.round(wind) + " km/jam kencang (≥15)."); }
    else reasons.push("Angin " + Math.round(wind) + " km/jam lemah.");
    if (cloud < 40) { skor++; reasons.push("Tutupan awan " + cloud + "% cerah (<40%)."); }
    else reasons.push("Tutupan awan " + cloud + "% mendung.");

    var key = skor >= 3 ? "cepat" : (skor === 2 ? "normal" : "lambat");
    // Kelembapan ekstrem selalu minimal lambat.
    if (hum >= 85 && key === "cepat") key = "normal";
    if (hum >= 90) key = "lambat";

    return { key: key, maxProb3: maxProb, reasons: reasons };
  }

  function renderHasil(hasil) {
    var card = document.getElementById("statusCard");
    var meta = STATUS[hasil.key];
    card.setAttribute("data-status", hasil.key);
    document.getElementById("statusIcon").textContent = meta.icon;
    document.getElementById("statusTitle").textContent = meta.title;
    document.getElementById("statusDesc").textContent = meta.desc;
    var ul = document.getElementById("reasonList");
    ul.innerHTML = "";
    hasil.reasons.forEach(function (r) {
      var li = document.createElement("li");
      li.textContent = r;
      ul.appendChild(li);
    });
  }

  window.JemurKering = { hitungEstimasi: hitungEstimasi, renderHasil: renderHasil };
})();
