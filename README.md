# Logika Registrasi Warga – Backend Desa Digital

## BATCH 1 – Input Data Awal

User mengisi data ke beberapa koleksi:

- `warga`: akun autentikasi (email, username, password, telepon, desa)
- `demografi_warga`: data identitas pribadi (NIK, nama, tempat lahir, tanggal lahir, jenis kelamin, dll.)
- `alamat_warga`: alamat lengkap (jalan, RT/RW, dusun, desa, kecamatan, kabupaten, provinsi)
- `pekerjaan_warga`: informasi pekerjaan (jenis pekerjaan, tempat kerja, dsb.)

**Status awal:**  
- `status_akun`: `menunggu_verifikasi`  
- `status_demografi`: `menunggu_verifikasi`  
- `status_alamat`: `menunggu_verifikasi`

---

## BATCH 2 – Upload Dokumen dan OTP

User melakukan dua langkah:

1. Upload **foto KTP**
   - Disimpan dalam koleksi `dokumen_ktp`
   - Status: `status_ktp`: `dikirim`

2. Verifikasi nomor telepon melalui OTP (WhatsApp/SMS)
   - OTP dikelola di koleksi `otp_verifikasi_wa`
     - `user_id`: relasi ke `warga`
     - `kode_otp`
     - `expired_at`
     - `is_verified`
     - `attempt_count`
   - Status verifikasi: `otp_terverifikasi`: `true/false`

---

## BATCH 3 – Verifikasi Manual oleh Admin Desa

Admin desa melakukan:

1. Video call langsung dengan warga
2. Upload **swafoto warga memegang KTP**
   - Disimpan dalam koleksi `swafoto_ktp`
   - Status: `status_swafoto`: `dikirim` → `valid`

Jika semua validasi selesai:

- `status_akun`: `aktif`
- `status_demografi`: `valid`
- `status_alamat`: `valid`
- `status_ktp`: `valid`
- `status_swafoto`: `valid`
- Data warga dapat digunakan untuk login dan akses sistem

