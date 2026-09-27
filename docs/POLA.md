# POLA.md — Baku tampilan & bahasa jemurku.app v1

Aturan main agar produk konsisten lintas fase dan lintas sesi. Langgar = sebutkan
alasannya di PR.

## 1. Pola pesan sistem: status + alasan + aksi

Setiap pesan ke user wajib 3 unsur (urutan bebas, ketiganya harus ada):
1. **Status** — apa yang terjadi ("Peluang hujan 70%").
2. **Alasan** — kenapa ("ambang kamu 65%, awan 90%").
3. **Aksi** — apa yang harus dilakukan ("Angkat jemuran sebelum 14.00").

Contoh benar: "Peluang hujan 70% dalam 3 jam (ambang 65%). Segera angkat jemuran."
Contoh salah: "Peringatan cuaca ekstrem!" (tanpa alasan & aksi).

## 2. Bahasa (adopsi copy rules Shifunaa §6 + voice product-marketing)

- Kata user: jemur luar, jemur indoor, angkat jemuran, peluang hujan, aman, siaga.
- Kata terlarang di hadapan user: probabilitas, presipitasi, API, endpoint, deploy.
- Kalimat pendek, aktif, tanpa tanda seru, tanpa klaim angka tanpa data.
- CTA: "[Kata kerja] + [objek jelas]" — "Daftar via WhatsApp", "Coba Demo",
  "Aktifkan notifikasi". Satu label per intent di seluruh halaman.

## 3. Pola kartu (bento web app)

- Hero status: ikon + judul + deskripsi + "Kenapa?" + "Apa yang harus saya lakukan?".
- Warna + ikon + teks (tidak mengandalkan warna saja).
- State kartu: memuat (skeleton/teks) → data → basi (badge umur data) → error
  (pesan + jalan keluar, bukan sekadar gagal).

## 4. Pola landing (anti-slop, mengikat)

- Hero split-screen, muat 1 viewport: judul ≤2 baris, sub ≤20 kata, CTA terlihat.
- Tiap seksi beda keluarga layout. Dilarang: 3 kartu sejajar identik, zigzag >2
  seksi, eyebrow >1 per 3 seksi, screenshot palsu dari div, angka klaim palsu.
- Foto nyata ≥2, atau slot berlabel TODO.

## 5. Pola data (FE ↔ BE ↔ Zapier)

- Key API stabil Bahasa Inggris datar: `status`, `risk_pct`, `threshold`,
  `bahaya`, `event_id`, `versi`. Teks Indonesia boleh berubah; key tidak.
- Estimasi hanya dari `shared/drying-rules.js`. Demo landing memakai
  DEMO-MIRROR berlabel sampai BE lahir.
