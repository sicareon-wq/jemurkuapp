/* Modul cuaca: fetch Open-Meteo + terjemahan kode WMO ke Bahasa Indonesia. */
(function () {
  "use strict";

  var WMO_ID = {
    0: "Cerah", 1: "Cerah sedikit berawan", 2: "Berawan sebagian", 3: "Mendung",
    45: "Berkabut", 48: "Berkabut (embun beku)",
    51: "Gerimis ringan", 53: "Gerimis", 55: "Gerimis lebat",
    56: "Gerimis beku ringan", 57: "Gerimis beku",
    61: "Hujan ringan", 63: "Hujan", 65: "Hujan lebat",
    66: "Hujan beku ringan", 67: "Hujan beku",
    71: "Salju ringan", 73: "Salju", 75: "Salju lebat", 77: "Butiran salju",
    80: "Hujan lokal ringan", 81: "Hujan lokal", 82: "Hujan lokal lebat",
    85: "Hujan salju ringan", 86: "Hujan salju",
    95: "Badai petir", 96: "Badai petir + es ringan", 99: "Badai petir + es"
  };

  var RAIN_CODES = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99];

  function codeToId(code) {
    return WMO_ID[code] || "Kondisi tidak diketahui";
  }

  function isRainCode(code) {
    return RAIN_CODES.indexOf(code) !== -1;
  }

  function fetchForecast(lat, lon) {
    var params = [
      "latitude=" + encodeURIComponent(lat),
      "longitude=" + encodeURIComponent(lon),
      "current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,cloud_cover,precipitation,wind_speed_10m",
      "hourly=temperature_2m,precipitation_probability,precipitation,relative_humidity_2m,cloud_cover",
      "daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
      "timezone=auto",
      "forecast_days=3"
    ].join("&");
    return fetch("https://api.open-meteo.com/v1/forecast?" + params)
      .then(function (r) {
        if (!r.ok) throw new Error("API cuaca gagal (kode " + r.status + ").");
        return r.json();
      });
  }

  // Ambil N jam ke depan dari array hourly (cocokkan waktu ISO >= waktu current).
  // F-3: bila current.time lebih baru dari semua entri (jam basi), default ke entri terakhir.
  function nextHours(data, n) {
    var times = (data.hourly && data.hourly.time) || [];
    var curTime = data.current && data.current.time;
    var start = 0;
    if (curTime) {
      for (var i = 0; i < times.length; i++) {
        if (times[i] >= curTime) { start = i; break; }
        start = i; // curTime lebih baru dari semua entri -> pakai entri terakhir
      }
    }
    var out = [];
    for (var k = start; k < Math.min(start + n, times.length); k++) {
      out.push({
        time: times[k],
        temp: data.hourly.temperature_2m[k],
        prob: data.hourly.precipitation_probability
          ? data.hourly.precipitation_probability[k] : 0,
        precip: data.hourly.precipitation ? data.hourly.precipitation[k] : 0
      });
    }
    return out;
  }

  function maxProb(hours) {
    var m = 0;
    hours.forEach(function (h) { if (h.prob != null && h.prob > m) m = h.prob; });
    return m;
  }

  window.JemurCuaca = {
    codeToId: codeToId,
    isRainCode: isRainCode,
    fetchForecast: fetchForecast,
    nextHours: nextHours,
    maxProb: maxProb
  };
})();
