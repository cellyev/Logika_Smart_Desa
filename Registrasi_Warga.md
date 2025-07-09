# Logika Registrasi Warga – Backend Desa Digital

### **BATCH 1 – Input Data Awal**

* **User mengisi data:**

  * `warga`: akun autentikasi + info dasar (email, password, username, telepon)
  * `demografi_warga`: data pribadi (NIK, nama, tempat lahir, dll.)
  * `alamat_warga`: alamat lengkap sesuai KTP atau domisili
  * `pekerjaan_warga`: pekerjaan saat ini

* **Status awal:** `menunggu_verifikasi`

---

### **BATCH 2 – Upload Dokumen Identitas**

* **User upload:** foto **KTP**
* Kirim **OTP** via **WhatsApp / SMS** ke nomor yang didaftarkan
* Verifikasi **OTP** berhasil → status tetap `menunggu_verifikasi`

---

### **BATCH 3 – Verifikasi Manual oleh Admin**

* **Admin desa:**

  * melakukan **video call**
  * mengunggah **swafoto warga dengan KTP**
* Jika lolos:

  * Status seluruh data menjadi `aktif`
  * Menandai semua step sebelumnya sebagai sudah diverifikasi
  * Data aman digunakan untuk login dan akses fitur sistem
