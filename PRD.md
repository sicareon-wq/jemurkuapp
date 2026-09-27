# PRD — Laundry Weather v1

## 1. Ringkasan produk
Satu halaman web statis berbahasa Indonesia, layout kartu bento, mengambil
prakiraan Open-Meteo per koordinat, menerjemahkannya jadi keputusan jemur.

## 2. User stories
- US-1: Sebagai owner, saya tekan "Gunakan GPS" agar cuaca lokasi saya
  langsung tampil.
- US-2: Sebagai owner di daerah terpencil, saya ketik nama desa/dusun atau
  lat/lon agar tetap dapat prakiraan.
- US-3: Sebagai owner sibuk, saya lihat satu kartu besar berisi status jemur
  + durasi.
- US-4: Sebagai owner, saya paham alasan estimasi ("kelembapan 85%").
- US-5: Sebagai owner, saya dapat peringatan sebelum hujan (banner +
  notifikasi).
- US-6: Sebagai owner, saya atur sensitivitas hujan 60–70%.

## 3. Functional requirements

### FR-1 Lokasi
- FR-1.1: Tombol GPS pakai `navigator.geolocation.getCurrentPosition`
  (high accuracy, timeout 10 dtk). Wajib atas aksi user (privasi).
- FR-1.2: Kolom pencarian manual →
  `GET geocoding-api.open-meteo.com/v1/search?name={q}&count=5&language=id&format=json` →
  list 5 hasil (nama, admin, negara) → klik pakai.
- FR-1.3: Input lat/lon manual (fallback dusun tak terdaftar).
- FR-1.4: Simpan lokasi terakhir + threshold di `localStorage`. Jika GPS
  ditolak → fallback ke manual, tampil pesan jelas.

### FR-2 Cuaca (Open-Meteo, tanpa key)
- FR-2.1: `GET api.open-meteo.com/v1/forecast` dengan parameter current,
  hourly, daily, `timezone=auto`, `forecast_days=3`. (Detail di `weather.js`.)
- FR-2.2: Tampilkan suhu besar, terasa, kelembapan, angin, awan, hujan saat
  ini, kode WMO diterjemahkan (Cerah/Berawan/Hujan/Gerimis/Badai/Kabut).
- FR-2.3: Strip per-jam 12–24 jam (jam, suhu, probabilitas hujan) + kartu
  3 hari (min/maks, probabilitas maks).
- FR-2.4: Refresh tiap 20 menit + tombol manual + stempel "diperbarui pukul".
  State loading/error/offline eksplisit.

### FR-3 Estimasi pengeringan
- FR-3.1: Rule v1 (dikunci):
  - 🔴 **TUNDA / JEMUR INDOOR** jika hujan aktif
    (`precipitation > 0.5` atau kode hujan/badai) ATAU
    `max probabilitas 3 jam ke depan ≥ threshold (default 65%)`.
  - 🟢 **CEPAT ±2–3 jam**: suhu ≥30, kelembapan ≤60%, angin ≥15 km/jam,
    awan <40%, hujan rendah.
  - 🟡 **NORMAL ±4–6 jam**: kondisi tengah (skor 2 dari 4).
  - 🟠 **LAMBAT ±7–9 jam / indoor disarankan**: lembap/mendung/angin lemah.
- FR-3.2: Kartu hero menampilkan status + rentang jam + ikon; warna + teks
  (bukan warna saja).
- FR-3.3: Blok "Kenapa estimasi ini?" list faktor penentu aktual.

### FR-4 Notifikasi hujan
- FR-4.1: Banner in-page selalu tampil saat risiko ≥ threshold (jalur utama).
- FR-4.2: Browser Notification opsional (minta izin eksplisit); bunyi opsional.
- FR-4.3: Slider threshold 60–70%, default 65%. Dicek tiap polling 20 menit +
  saat load.
- FR-4.4: Jika izin notifikasi ditolak → tetap banner + pesan penjelasan.

## 4. UI/UX spec
- Bento grid 7 kartu: (1) Status jemur hero, (2) Cuaca kini, (3) Risiko hujan,
  (4) Per-jam, (5) 3 hari, (6) Lokasi, (7) Pengaturan.
- Bahasa Indonesia penuh. Tanpa gradient ungu/biru neon; background solid
  terang, teks gelap, aksen solid satu warna.
- Status: hijau/kuning/oranye/merah kontras + ikon.
- Mobile-first; angka suhu ≥48px di hero; target sentuh ≥44px;
  kontras teks ≥4.5:1.

## 5. Non-functional
- Tanpa build, tanpa key, path relatif (aman di `user.github.io/repo/`),
  file `.nojekyll`.
- Struktur: `index.html`, `assets/css/style.css`,
  `assets/js/{app,location,weather,drying,notify}.js`, `README.md`.
- 2 request API per refresh (forecast + opsional geocoding); gagal satu →
  pesan spesifik, data lama tetap tampil berlabel "terakhir".

## 6. Edge cases
GPS mati/ditolak, dusun tak ketemu, offline, API error, koordinat invalid,
probabilitas tepat di ambang (gunakan ≥, tampilkan angka aktual).

## 7. Acceptance criteria
- [ ] GPS → cuaca + estimasi tampil <10 dtk (network normal).
- [ ] Cari desa manual → 5 hasil → pilih → forecast ganti.
- [ ] Lat/lon manual valid → forecast tampil.
- [ ] Probabilitas 3 jam ≥65% → kartu merah + banner muncul.
- [ ] Slider 60–70% tersimpan setelah reload.
- [ ] Tanpa gradient ungu/biru neon; hero terbaca di HP.

## 8. Milestone bangun
1. Scaffold + bento → 2. Lokasi → 3. Forecast → 4. Estimasi →
5. Notifikasi → 6. Polish + uji → 7. Komit + panduan Pages.
