# JemurKu — Web Laundry + Cuaca

Web statis (HTML/CSS/JS murni) untuk usaha laundry: prakiraan cuaca
Open-Meteo, estimasi pengeringan, dan peringatan hujan. Tanpa API key,
siap deploy ke GitHub Pages.

## Jalankan lokal

```bash
# dari root repo
python3 -m http.server 8000
# buka http://localhost:8000
```

> Jangan buka via `file://` — `fetch` ke API diblokir browser.

## Deploy GitHub Pages

1. Push repo ke GitHub.
2. Buka **Settings → Pages**.
3. **Source:** Deploy from a branch → branch `master` (atau `main`), folder `/ (root)`.
4. Simpan, tunggu ±1 menit, buka URL `https://username.github.io/praktek1/`.

## Struktur

- `index.html` — satu halaman, bento grid 7 kartu
- `assets/css/style.css` — solid colors, tanpa gradient neon
- `assets/js/location.js` — GPS + pencarian + koordinat manual
- `assets/js/weather.js` — fetch Open-Meteo + kode WMO Indonesia
- `assets/js/drying.js` — rule estimasi (lihat `PRD.md` FR-3)
- `assets/js/notify.js` — banner + Browser Notification + bunyi
- `assets/js/app.js` — orkestrasi + refresh 20 menit

Lihat `BRIEF.md` dan `PRD.md` untuk spesifikasi.
