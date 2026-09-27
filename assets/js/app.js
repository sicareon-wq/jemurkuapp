/* Orkestrasi: lokasi -> forecast -> render -> estimasi -> notifikasi. */
(function () {
  "use strict";

  var REFRESH_MS = 20 * 60 * 1000;
  var currentLoc = null;
  var lastData = null;
  var timer = null;

  function $(id) { return document.getElementById(id); }

  function showMessage(msg) {
    var el = $("appMessage");
    if (!msg) { el.hidden = true; el.textContent = ""; return; }
    el.hidden = false;
    el.textContent = msg;
  }

  function setLoading(loading) {
    $("btnRefresh").disabled = loading;
    $("btnRefresh").textContent = loading ? "Memuat…" : "Muat ulang";
  }

  function fmtHour(iso) {
    // "2026-09-27T14:00" -> "14.00"
    var t = iso.slice(11, 16).replace(":", ".");
    return t;
  }

  function fmtDay(iso) {
    var names = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso.slice(5);
    return names[d.getDay()] + ", " + iso.slice(8, 10) + "/" + iso.slice(5, 7);
  }

  function pakaiLokasi(loc) {
    currentLoc = loc;
    window.JemurLokasi.saveStored(loc);
    $("locationLabel").textContent = loc.label + " [" + loc.lat.toFixed(4) + ", " + loc.lon.toFixed(4) + "]";
    $("latInput").value = loc.lat.toFixed(4);
    $("lonInput").value = loc.lon.toFixed(4);
    muatCuaca();
  }

  function muatCuaca() {
    if (!currentLoc) return;
    showMessage("");
    setLoading(true);
    window.JemurCuaca.fetchForecast(currentLoc.lat, currentLoc.lon)
      .then(function (data) {
        lastData = data;
        renderSemua(data);
        jadwalRefresh();
      })
      .catch(function (err) {
        showMessage("Gagal memuat cuaca: " + err.message + " Periksa koneksi lalu tekan Muat ulang.");
      })
      .finally(function () { setLoading(false); });
  }

  function renderSemua(data) {
    var c = data.current;
    var threshold = window.JemurNotif.getThreshold();

    // Cuaca kini
    $("curTemp").textContent = Math.round(c.temperature_2m);
    $("curCondition").textContent = window.JemurCuaca.codeToId(c.weather_code);
    $("curFeels").textContent = Math.round(c.apparent_temperature) + "°C";
    $("curHumidity").textContent = c.relative_humidity_2m + "%";
    $("curWind").textContent = Math.round(c.wind_speed_10m) + " km/jam";
    $("curCloud").textContent = c.cloud_cover + "%";

    // Jam-jam ke depan
    var hours12 = window.JemurCuaca.nextHours(data, 12);
    var hours3 = hours12.slice(0, 3);
    var maxProb3 = window.JemurCuaca.maxProb(hours3);

    $("riskMax").textContent = maxProb3;
    $("riskText").textContent = maxProb3 >= threshold
      ? "Tinggi — siaga angkat jemuran."
      : "Aman untuk saat ini (ambang " + threshold + "%).";
    var rh = $("riskHours");
    rh.innerHTML = "";
    hours3.forEach(function (h) {
      var li = document.createElement("li");
      li.textContent = fmtHour(h.time) + " " + h.prob + "%";
      rh.appendChild(li);
    });

    var strip = $("hourlyStrip");
    strip.innerHTML = "";
    hours12.forEach(function (h) {
      var div = document.createElement("div");
      div.className = "hour-block";
      var jam = document.createElement("strong");
      jam.textContent = fmtHour(h.time);
      var suhu = document.createElement("div");
      suhu.textContent = Math.round(h.temp) + "°C";
      var prob = document.createElement("div");
      prob.className = "prob";
      prob.textContent = h.prob + "%";
      div.appendChild(jam); div.appendChild(suhu); div.appendChild(prob);
      strip.appendChild(div);
    });

    // Harian
    var dl = $("dailyList");
    dl.innerHTML = "";
    (data.daily.time || []).forEach(function (t, i) {
      var li = document.createElement("li");
      var kiri = document.createElement("span");
      kiri.textContent = fmtDay(t) + " · " + window.JemurCuaca.codeToId(data.daily.weather_code[i]);
      var kanan = document.createElement("strong");
      kanan.textContent = Math.round(data.daily.temperature_2m_min[i]) + "–"
        + Math.round(data.daily.temperature_2m_max[i]) + "°C · "
        + data.daily.precipitation_probability_max[i] + "%";
      li.appendChild(kiri); li.appendChild(kanan);
      dl.appendChild(li);
    });

    // Estimasi + notifikasi
    var hasil = window.JemurKering.hitungEstimasi(c, hours3, threshold);
    window.JemurKering.renderHasil(hasil);
    window.JemurNotif.cekHujan(maxProb3, threshold);

    var now = new Date();
    $("updateTime").textContent = "Diperbarui " + now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  }

  function jadwalRefresh() {
    if (timer) clearInterval(timer);
    timer = setInterval(function () { if (currentLoc) muatCuaca(); }, REFRESH_MS);
  }

  function initLokasi() {
    $("btnGps").addEventListener("click", function () {
      showMessage("Mengambil GPS…");
      window.JemurLokasi.getGps().then(function (loc) {
        showMessage("");
        // Perkaya label dengan nama daerah bila memungkinkan.
        window.JemurLokasi.reverseLabel(loc.lat, loc.lon).then(function (nama) {
          if (nama) loc.label = nama + " (GPS)";
          pakaiLokasi(loc);
        });
      }).catch(function (err) { showMessage(err.message); });
    });

    function cari() {
      var q = $("searchInput").value.trim();
      if (q.length < 2) { showMessage("Ketik minimal 2 huruf untuk mencari."); return; }
      showMessage("Mencari…");
      window.JemurLokasi.searchPlaces(q).then(function (hasil) {
        var ul = $("searchResults");
        ul.innerHTML = "";
        if (!hasil.length) {
          showMessage("Tidak ketemu. Coba ejaan lain atau pakai koordinat manual (mis. dusun sangat kecil belum terdaftar).");
          return;
        }
        showMessage("");
        hasil.forEach(function (h) {
          var li = document.createElement("li");
          var b = document.createElement("button");
          b.type = "button";
          b.textContent = h.label;
          b.addEventListener("click", function () { ul.innerHTML = ""; pakaiLokasi(h); });
          li.appendChild(b);
          ul.appendChild(li);
        });
      }).catch(function (err) { showMessage(err.message); });
    }
    $("btnSearch").addEventListener("click", cari);
    $("searchInput").addEventListener("keydown", function (e) { if (e.key === "Enter") cari(); });

    $("btnCoord").addEventListener("click", function () {
      var lat = parseFloat($("latInput").value);
      var lon = parseFloat($("lonInput").value);
      if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        showMessage("Koordinat tidak valid. Lat -90…90, Lon -180…180.");
        return;
      }
      pakaiLokasi({ lat: lat, lon: lon, label: "Koordinat manual", source: "manual" });
    });
  }

  function initPengaturan() {
    var range = $("thresholdRange");
    range.value = window.JemurNotif.getThreshold();
    $("thresholdValue").textContent = range.value;
    range.addEventListener("input", function () {
      $("thresholdValue").textContent = range.value;
      window.JemurNotif.setThreshold(parseInt(range.value, 10));
      if (lastData) renderSemua(lastData); // hitung ulang dengan ambang baru
    });

    var sound = $("soundToggle");
    sound.checked = window.JemurNotif.soundOn();
    sound.addEventListener("change", function () { window.JemurNotif.setSound(sound.checked); });

    $("notifyState").textContent = window.JemurNotif.notifyStateText();
    $("btnNotify").addEventListener("click", function () {
      window.JemurNotif.requestPermission().then(function () {
        $("notifyState").textContent = window.JemurNotif.notifyStateText();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLokasi();
    initPengaturan();
    $("btnRefresh").addEventListener("click", muatCuaca);
    var stored = window.JemurLokasi.loadStored();
    if (stored && isFinite(stored.lat) && isFinite(stored.lon)) {
      currentLoc = stored;
      $("locationLabel").textContent = stored.label + " [" + Number(stored.lat).toFixed(4) + ", " + Number(stored.lon).toFixed(4) + "]";
      muatCuaca();
    }
  });
})();
