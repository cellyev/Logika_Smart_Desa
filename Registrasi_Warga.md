
## 🧾 Proses Registrasi Warga (Multi-Tahap) — SmartDesa

Registrasi warga pada sistem SmartDesa dilakukan secara **bertahap (multi-step/batch)** dengan kontrol verifikasi dan validasi yang ketat. Sistem ini mendukung pendekatan bertahap demi menjaga integritas data serta mempermudah pihak desa dalam memverifikasi identitas warga secara akurat.

---

### 🧩 Tahapan Registrasi

Registrasi dibagi ke dalam **3 batch utama**, dengan logika status sebagai berikut:

---

### ✅ **Batch 1 — Data Demografi & Autentikasi**

**Dilakukan oleh: Warga**

#### Langkah:

1. Warga mengisi **data demografi dasar** seperti:

   * Nama lengkap
   * NIK
   * Nomor KK
   * Tempat/tanggal lahir
   * Email
   * Nomor telepon
   * Username & password
   * dll

2. Sistem mengirimkan **kode OTP ke email** untuk verifikasi.

#### Logika Backend:

* Validasi data dilakukan menggunakan Zod (strict mode).
* OTP disimpan dengan TTL dan rate-limit.
* Jika email berhasil diverifikasi:

  * `email_terverifikasi = true`
  * `status = "menunggu_verifikasi"` *(belum bisa akses sistem sepenuhnya)*

#### Akses:

* Warga dapat login setelah email terverifikasi, namun akses sangat terbatas.
* Hanya dapat melihat data pribadi dan upload ulang foto KTP jika ditolak oleh admin_desa.

---

### ✅ **Batch 2 — Upload KTP**

**Dilakukan oleh: Warga**

#### Langkah:

1. Warga mengunggah foto/scan KTP.
2. Admin desa akan memverifikasi keaslian dan kesesuaian data.

#### Logika Backend:

* Validasi file: ukuran, format (`image/png`, `image/jpeg`, dll.)
* File disimpan di `galeri_gambar_ktp`, relasi ke warga.
* Update status KTP:

  * `status_ktp = "menunggu_verifikasi" | "aktif" | "ditolak"`
  * Tambahkan `catatan_verifikasi` jika ditolak.

#### Akses:

* Warga bisa login meskipun KTP belum disetujui, tetapi hanya bisa:

  * Melihat data sendiri
  * Mengedit dan mengunggah ulang KTP jika status `ditolak`

---

### ✅ **Batch 3 — Upload Swafoto Keluarga**

**Dilakukan oleh: Admin Desa**

#### Langkah:

1. Admin mengunggah swafoto keluarga untuk setiap warga berdasarkan KK.
2. Admin melakukan finalisasi verifikasi data.

#### Logika Backend:

* Jika **KTP disetujui** dan **swafoto keluarga berhasil diunggah**, maka:

  * `status = "aktif"`
  * Akun warga diaktifkan secara penuh.
