# AUDIT.md — Laporan audit kode & tampilan (2026-09-27)

Metode: baca penuh 7 file + `node --check` + cek ID silang JS↔HTML (34 ID) +
hitung kontras WCAG + uji logika 6 skenario. Tanpa ubah file (plan mode).

## Hasil cek (lolos)

- Sintaks 5 file JS valid. ID silang lengkap. Kontras 7 pasangan ≥5.3:1.
- Skenario: cerah→cepat, hujan→tunda, ambang→tunda, geser ambang→batal tunda.
- WMO tak dikenal → "Kondisi tidak diketahui".

## Temuan (diperbaiki di Fase 0/1, status)

| ID | Temuan | Perbaikan | Status |
|---|---|---|---|
| F-1 | `null <= 60` = true di JS → alasan "Kelembapan null%" | Guard data-tak-lengkap di hitungEstimasi + status unknown | Dijadwalkan Fase 1 |
| F-2 | Notifikasi + bunyi spam tiap refresh 20 mnt | Flag dedup per event (reset saat aman) | Dijadwalkan Fase 1 |
| F-3 | nextHours jatuh ke jam basi bila current.time terbaru | Default start ke entri terakhir | Dijadwalkan Fase 1 |
| F-4 | Tombol disabled tak terlihat; tanpa :focus-visible | 2 rule CSS | Fase 0/1 |
| F-5 | `precipitation_probability_max` null → "null%" di kartu harian | Fallback "–" | Dijadwalkan Fase 1 |
| F-6 | Lemak kecil (field precip tak dipakai; hourly over-fetch) | Biarkan (biaya nol) | Diterima |

## Catatan UI (ui-ux-pro-max)

Lolos: mobile-first, sentuh ≥44px, aria-live + role=alert, status tidak
warna-saja, tanpa gradient neon. Emoji hanya didampingi teks (diterima sadar).
