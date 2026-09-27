# Product Marketing Context — jemurku.app

**Document version:** v1
**Last updated:** 2026-09-27

## Product Overview
**One-liner:** Tahu hujan sebelum cucian basah.
**What it does:** Web ringan untuk usaha laundry yang mengubah prakiraan cuaca Open-Meteo menjadi keputusan jemur (luar/indoor) plus peringatan hujan. Tanpa alat sensor, tanpa daftar, gratis selama beta.
**Product category:** Asisten operasional laundry (bukan ramalan cuaca umum).
**Product type:** Web statis gratis → SaaS freemium (Free/Pro).
**Business model:** Gratis selama beta. Pro (berbayar): notifikasi WA otomatis, multi-outlet, riwayat 90 hari.

## Target Audience
**Target companies:** Usaha laundry kiloan/rumahan/kos, 1–3 orang, daerah kota hingga terpencil.
**Decision-makers:** Owner-operator (yang juga yang jemur).
**Primary use case:** Pagi/siang hari, owner buka HP dan tahu dalam <5 detik: jemur luar atau indoor.
**Jobs to be done:**
- Hindari cuci ulang akibat kehujanan.
- Tentukan timing angkat jemuran.
- Tenang saat tinggalkan jemuran.
**Use cases:**
- Cek status sebelum gelar jemuran pagi.
- Dapat peringatan saat peluang hujan naik.
- Lihat prakiraan 3 hari untuk atur antrean cucian.

## Personas
(B2C — satu persona.)
| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Owner laundry (non-IT) | Cucian kering tepat waktu, tanpa drama | Tidak paham istilah cuaca; sibuk di lapangan | Satu kartu besar: status + apa yang harus dilakukan |

## Problems & Pain Points
**Core problem:** Keputusan jemur menebak — kehujanan berarti cuci ulang (air, deterjen, waktu, reputasi).
**Why alternatives fall short:**
- Aplikasi cuaca umum: angka mentah tanpa arti ("kelembapan 85%" lalu harus apa?).
- Grup WA / feeling: tidak konsisten, tidak tercatat.
- Sensor fisik: mahal, perlu maintenance.
**What it costs them:** Cuci ulang per kejadian (biaya + waktu + pelanggan kecewa).
**Emotional tension:** Was-was tiap tinggalkan jemuran; takut hujan saat di luar.

## Competitive Landscape
**Direct:** Belum ada produk "cuaca khusus laundry" yang kami ketahui di pasar ini.
**Secondary:** Aplikasi cuaca umum (BMKG, AccuWeather) — akurat tapi tidak memberi keputusan jemur.
**Indirect:** Feeling/pengalaman ("lihat langit") — gratis tapi gagal saat cuaca menipu.

## Differentiation
**Key differentiators:**
- Estimasi pengeringan 4 tier + alasan + aksi konkret (bukan angka mentah).
- Lokasi GPS + desa/dusun terpencil + koordinat manual.
- Gratis, tanpa daftar, tanpa sensor.
**Why customers choose us:** Dibuka, dibaca, dipahami — oleh orang yang tangannya basah deterjen.

## Objections
| Objection | Response |
|-----------|----------|
| Apakah akurat di desa saya? | Prakiraan per koordinat (bukan per kota); coba demo live di landing dengan lokasi contoh |
| Perlu alat tambahan? | Tidak. HP saja |
| Bayar? | Gratis selama beta; Pro hanya untuk notif WA otomatis dkk |
| HP kentang bisa? | Halaman ringan (<100 KB tanpa gambar), tanpa login |

**Anti-persona:** Yang butuh integrasi mesin laundry / POS / akuntansi — bukan kami.

## Switching Dynamics
**Push:** Pernah cuci ulang karena hujan; capek was-was.
**Pull:** Demo live di landing membuktikan sebelum daftar.
**Habit:** Lihat langit + feeling — dipertahankan sebagai pelengkap, bukan musuh.
**Anxiety:** "Angka cuaca tidak saya mengerti" → dijawab kartu hero + kalimat aksi.

## Customer Language
**How they describe the problem:**
- "Kehujanan lagi, cuci ulang."
- "Mendung begini jemur luar berani tidak ya?"
**How they describe us (target):**
- "Lihat jemurku dulu sebelum gelar."
**Words to use:** jemur luar, jemur indoor, angkat jemuran, peluang hujan, aman, siaga.
**Words to avoid:** probabilitas, presipitasi, API, deploy, endpoint, dashboard (di hadapan user).
**Glossary:**
| Term | Meaning |
|------|---------|
| Peluang hujan | Kemungkinan hujan dalam %, dari model cuaca |
| Ambang | Batas % yang memicu peringatan (bisa digeser 60–70) |
| Mode mandiri | Web mengambil cuaca langsung saat server mati |

## Brand Voice
**Tone:** Hangat, lugas, menenangkan. Seperti tetangga yang paham cuaca.
**Style:** Kalimat pendek. Kata kerja aktif. Tanpa istilah teknis. Tanpa tanda seru.
**Personality:** Peduli, jujur (mengaku saat data basi), sederhana, rajin (mengingatkan sebelum hujan).

## Proof Points
**Metrics:** (menunggu kalibrasi — dilarang klaim angka sebelum ada data; lihat KALIBRASI.md)
**Customers:** (belum ada — testimoni dilarang sampai nyata)
**Testimonials:** —
**Value themes:**
| Theme | Proof |
|-------|-------|
| Keputusan <5 detik | Demo live di landing |
| Jujur saat tak tahu | Badge data-basi + mode mandiri |

## Goals
**Business goal:** 50 pendaftar beta via WA dalam 2 bulan pertama.
**Conversion action:** Klik "Daftar via WhatsApp" (prefilled DAFTAR).
**Current metrics:** Belum diukur (analitik bawaan Vercel setelah deploy).

## Changelog
- v1 (2026-09-27) — Initial context.
