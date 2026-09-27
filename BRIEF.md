# BRIEF — Web Laundry + Cuaca (Laundry Weather v1)

## 1. Latar belakang
Pemilik usaha laundry tidak punya sensor cuaca fisik. Keputusan jemur
(luar/indoor, timing angkat) selama ini menebak. Dibutuhkan web ringan yang
memberi prakiraan akurat global — termasuk daerah terpencil — berbasis API,
bukan sensor.

## 2. Tujuan
- Memberi info cuaca real-time + prakiraan per-jam/3-hari untuk lokasi usaha.
- Memberi **estimasi pengeringan** yang mudah dibaca saat sibuk di lapangan.
- Memberi **peringatan hujan** sebelum cucian kehujanan.

## 3. Target pengguna
- **Primer:** owner/operator laundry (cek via HP di lapangan, butuh angka
  besar + status warna kontras).
- **Sekunder:** karyawan/keluarga yang bantu angkat jemuran.

## 4. Scope v1 (dikunci)
1. Tampil cuaca saat ini (suhu, terasa, kelembapan, angin, awan, kode cuaca).
2. Estimasi pengeringan 4 tier + penjelasan "kenapa".
3. Notifikasi hujan (banner in-page + Browser Notification + opsi bunyi).
4. Lokasi: GPS perangkat (utama) + pencarian manual
   negara/kota/kecamatan/desa/dusun + input lat/lon fallback.
5. Prakiraan per-jam (12–24 jam) + harian 3 hari.
6. Static HTML/CSS/JS, API Open-Meteo, deploy GitHub Pages.

## 5. Non-goals v1
Tanpa backend, tanpa login, tanpa booking/katalog, tanpa peta interaktif,
tanpa push saat tab tertutup, tanpa multi-bahasa.

## 6. Kriteria sukses
- Owner tahu dalam <5 detik: "jemur luar atau indoor sekarang".
- Estimasi + alasan tampil transparan; threshold hujan bisa diubah 60–70%.
- Jalan penuh via GitHub Pages tanpa API key.

## 7. Keputusan terkunci
- Lokasi default: GPS perangkat; manual sebagai pendamping.
- Threshold hujan: default **65%**, slider 60–70%.
- Durasi: Cepat ±2–3 jam, Normal ±4–6 jam, Lambat ±7–9 jam, Tunda/Indoor.
