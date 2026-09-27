# CEK-VISUAL.md — Checklist penilaian landing (oleh manusia, via HP)

Script tidak bisa menilai "terasa slop". Buka URL preview Vercel dari HP,
gulir 10 detik, jawab 5 pertanyaan ini. Satu jawaban "ya" = revisi sebelum merge.

1. **Kesan 3 detik:** tanpa membaca detail, apakah jelas ini "alat bantu jemur
   laundry"? (ya = lanjut; tidak = hero gagal)
2. **CTA tanpa scroll:** apakah tombol Daftar/Demo terlihat sebelum menggulir?
3. **Demo meyakinkan?** Apakah kartu demo menampilkan data cuaca nyata (bukan
   teks contoh)? Coba tekan "Buka versi lengkap".
4. **Jejak template:** apakah ada bagian yang terasa "seperti situs AI biasa"
   (kartu kembar tiga, gradient ungu, bahasa kaku)? Tunjuk bagiannya.
5. **Keterbacaan lapangan:** kecilkan brightness setengah — apakah judul dan
   status masih terbaca jelas?

Lolos = 5× "ya" (no. 4 dibalik: "tidak ada jejak template").
Catat hasil + tanggal di PR sebagai bukti review.
