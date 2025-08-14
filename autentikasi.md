

Saat ini sistem autentikasi yang ada menggabungkan beberapa peran dalam satu akun, misalnya:

1. **User biasa**
2. **User biasa + admin desa**
3. **User biasa + admin dinas**
4. **User biasa + petugas dinas**

Namun, saya merancang autentikasi baru dengan membedakan peran secara tegas:

1. **Warga**
2. **Admin desa**
3. **Admin dinas**
4. **Petugas dinas**

Perbedaan ini saya buat agar setiap peran fokus pada fungsinya masing-masing. Contohnya:

* Jika login sebagai **admin desa**, maka hanya mendapatkan fitur admin desa.
* Jika login sebagai **warga**, maka hanya mendapatkan fitur warga.
* Jika login sebagai **admin dinas**, maka hanya mendapatkan fitur admin dinas.
* Jika login sebagai **petugas dinas**, maka hanya mendapatkan fitur petugas dinas.

Dengan cara ini, satu akun tidak akan memegang dua peran sekaligus. Misalnya, **warga + admin desa** tidak akan digabung, karena secara logis itu berarti seorang warga “memegang” akun admin desa, yang berisiko menimbulkan konflik peran dan keamanan data.

Selain itu:

* **Warga** memiliki data demografi seperti KK dan KTP yang memang diperlukan untuk layanan warga.
* **Admin desa** tidak membutuhkan data warga seperti KK/KTP, karena perannya administratif.
* **Admin dinas** juga tidak masuk akal jika berbasis akun warga.
* **Petugas dinas** bisa berasal dari daerah mana saja, tidak harus dari desa tempat mereka bertugas.

Rencananya, saya juga ingin memisahkan **route login** agar lebih rapi:

* **Warga dan admin desa** → `/login`
* **Admin dinas dan petugas dinas** → `/login-dinas`

Alasan pemisahan ini belum sepenuhnya saya tentukan, tetapi kemungkinan besar untuk memisahkan alur autentikasi dan otorisasi, sekaligus mempermudah pengelolaan sesi dan hak akses masing-masing jenis pengguna.


