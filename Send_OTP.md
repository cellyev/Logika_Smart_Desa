# SEND OTP

1. **Normalisasi & Validasi Email**
   Setelah (`1. req body email`), lakukan validasi format email dan normalisasi (trim, lowercase) untuk menghindari duplikasi entri.

2. **Penghitungan Ulang & Invalidasi OTP Lama**
   Sebelum langkah “generate otp”, sebaiknya kamu secara eksplisit **invalidasi** (hapus atau tandai tidak berlaku) semua kode OTP lama yang belum expired, sehingga hanya benar‑benar ada satu kode aktif per user.

3. **Throttle / Cooldown Pengiriman**

   * Pada langkah “5. check apakah kode otp yang ada sudah lebih dari 1 menit”, ini bagus untuk mencegah spam request.
   * Bisa ditambahkan juga **batasan jumlah request per jam** atau per hari (misal max 3 request/jam) menggunakan counter terpisah, sehingga user tidak bisa terus‑menerus mem‐spam tombol “kirim ulang”.

4. **Hashing OTP di Database**
   Simpan OTP dalam bentuk **hash** (misal HMAC-SHA256 + salt) agar jika databasenya bocor, kode OTP tidak langsung bisa dipakai.

5. **Audit Logging**
   Catat setiap percobaan kirim OTP dan percobaan verifikasi (timestamp, IP, user agent) untuk memudahkan investigasi jika terjadi abuse.

6. **Response Uniformity**
   Untuk menghindari user enumeration (mengetahui apakah email terdaftar atau tidak), berikan response yang sama (“Jika email valid, kami telah mengirim kode OTP…”) walau email tak ditemukan.

7. **Penanganan Lockout**
   Kamu sudah punya `email_otp_locked_until`, tapi pastikan:

   * Setelah unlock, counter `email_otp_attempts` direset.
   * Kamu juga bisa tambahkan field `email_otp_last_attempt_at` untuk melihat kapan terakhir percobaan dilakukan.

8. **Expiry dan Cleanup**

   * Pastikan OTP hanya berlaku misal **5–10 menit**.
   * Jalankan cleanup job (cron) untuk menghapus record OTP yang sudah kedaluwarsa.

9. **Pengiriman Email**

   * Queue-kan pengiriman (misal via message queue) sehingga kalau email server overload, user tidak merasakan delay time-out.
   * Sertakan metadata di email (timestamp, user IP, dsb.) agar user bisa memeriksa jika ada yang mencurigakan.

---

## Rangkuman Perbaikan Logika

```text
1. Validasi & normalisasi email
2. Cari user
3. Cek verifikasi email
4. Cegah user enumeration dengan response uniform
5. Cek lockout (email_otp_locked_until)
6. Cek rate‐limit (per menit & per jam)
7. Invalidasi OTP lama
8. Generate & hash OTP, simpan dengan expiry (5–10 menit)
9. Kirim OTP via queue/email service
10. Audit log: kirim & pengecekan OTP
```


