# Brand Guidelines — jemurku.app v1

Sumber kebenaran identitas. Semua token CSS merujuk ke sini. Perubahan palet =
ubah file ini dulu, baru kode.

## 1. Identitas

- **Brand:** jemurku.app
- **Tagline:** Tahu hujan sebelum cucian basah.
- **Kepribadian:** peduli, lugas, jujur, sederhana.

## 2. Palet terkunci (Opsi A — Kunci identitas)

| Token | HEX | Pakai untuk |
|---|---|---|
| `--bg` | #f4f1ea | Background halaman |
| `--card` | #ffffff | Kartu |
| `--text` | #1c1c1c | Teks utama (kontras 15.1:1 — lolos) |
| `--muted` | #5f6368 | Teks sekunder (kontras 5.4:1 — lolos) |
| `--border` | #e2ddd2 | Garis kartu |
| `--accent` | #2d5a3d | Tombol utama, aksen tunggal |
| `--accent-dark` | #1e4029 | Hover |
| Status hijau bg/teks | #dcfce7 / #14532d | CEPAT |
| Status kuning bg/teks | #fef9c3 / #713f12 | NORMAL |
| Status oranye bg/teks | #ffedd5 / #7c2d12 | LAMBAT |
| Status merah bg/teks | #fee2e2 / #7f1d1d | TUNDA |

**Aturan kunci:**
- Satu aksen (`--accent`) di seluruh halaman. Tidak ada aksen kedua.
- Solid colors saja. **Nol gradient** (terutama ungu/biru neon).
- Kontras teks minimal 4.5:1 (hasil audit: semua ≥5.3:1).
- Pembelaan sadar: krem-hangat satu keluarga dengan palet generik AI; di sini
  keputusan fungsional (terbaca di bawah matahari, hangat untuk audiens rural),
  pembedanya komposisi + foto nyata, bukan warna.

## 3. Larangan eksplisit

- **Palet Shifunaa (#6C63FF ungu dkk) DILARANG masuk produk ini.** Itu identitas
  klien portofolio. Yang diadopsi dari Shifunaa hanya format dokumen & aturan
  tulis — nol warna.
- Dilarang: Inter sebagai keharusan (pakai system stack — cepat, offline-friendly),
  serif display, emoji sebagai ikon struktural (emoji hanya bila didampingi teks),
  shadow hitam pekat, CTA teks multi-baris di desktop.

## 4. Tipografi & bentuk

- Font: system stack (`system-ui, -apple-system, "Segoe UI", Roboto`).
- Hero suhu/angka: 800, raksasa (suhu 4rem, risiko 3.2rem). Judul seksi ≤8 kata.
- Radius: 14px kartu, 10px tombol/input. Satu skala, konsisten.
- Target sentuh ≥44px. Spacing ritme 8px (8/12/16/20/24).

## 5. Fotografi

- Natural, warm, candid. Objek nyata usaha (jemuran, tangan, HP di lapangan).
- Minimal 2 foto nyata di landing. Tanpa foto = slot berlabel, bukan ilustrasi div.

## 6. Copy rules (ringkas — lengkap di POLA.md)

- CTA kata kerja aktif + objek jelas: "Daftar via WhatsApp", "Coba Demo".
- Harga Rupiah format "Rp 500rb". Satu label per intent.
- Dilarang: klaim angka tanpa data, jargon teknis di hadapan user,
  tanda seru, kata hampa ("inovatif").
