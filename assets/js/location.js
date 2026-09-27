/* Modul lokasi: GPS + pencarian manual + koordinat manual. */
(function () {
  "use strict";

  var STORE_KEY = "jemurku_location_v1";

  function loadStored() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveStored(loc) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(loc));
    } catch (e) { /* abaikan */ }
  }

  function getGps() {
    return new Promise(function (resolve, reject) {
      if (!("geolocation" in navigator)) {
        reject(new Error("Perangkat tidak mendukung GPS."));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          resolve({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            label: "GPS (" + pos.coords.latitude.toFixed(4) + ", " + pos.coords.longitude.toFixed(4) + ")",
            source: "gps"
          });
        },
        function (err) {
          var msg = "GPS gagal.";
          if (err && err.code === 1) msg = "Izin GPS ditolak. Pakai pencarian manual di bawah.";
          else if (err && err.code === 2) msg = "Posisi tidak tersedia. Pakai pencarian manual.";
          else if (err && err.code === 3) msg = "GPS timeout. Coba lagi atau pakai pencarian manual.";
          reject(new Error(msg));
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    });
  }

  // Label nama daerah dari koordinat (opsional, gagal = tetap pakai koordinat).
  function reverseLabel(lat, lon) {
    var url = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude="
      + encodeURIComponent(lat) + "&longitude=" + encodeURIComponent(lon)
      + "&localityLanguage=id";
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error("reverse gagal");
      return r.json();
    }).then(function (j) {
      var parts = [j.city || j.locality, j.principalSubdivision, j.countryName].filter(Boolean);
      return parts.length ? parts.join(", ") : null;
    }).catch(function () { return null; });
  }

  function searchPlaces(query) {
    var url = "https://geocoding-api.open-meteo.com/v1/search?name="
      + encodeURIComponent(query) + "&count=5&language=id&format=json";
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error("Pencarian gagal (kode " + r.status + ").");
      return r.json();
    }).then(function (j) {
      return (j.results || []).map(function (r) {
        var admin = [r.admin2, r.admin1, r.country].filter(Boolean).join(", ");
        return {
          lat: r.latitude,
          lon: r.longitude,
          label: r.name + (admin ? " — " + admin : ""),
          source: "search"
        };
      });
    });
  }

  window.JemurLokasi = {
    loadStored: loadStored,
    saveStored: saveStored,
    getGps: getGps,
    reverseLabel: reverseLabel,
    searchPlaces: searchPlaces
  };
})();
