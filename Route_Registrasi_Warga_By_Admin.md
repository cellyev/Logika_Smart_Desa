

### **Struktur Routing Per Resource Langsung**

```
/auth:
  - GET          /auth
  - POST         /auth/create
  - GET          /auth/[id]
  - PUT          /auth/[id]/update
  - DELETE       /auth/[id]/delete

/demografi-warga:
  - GET          /demografi-warga
  - POST         /demografi-warga/create
  - GET          /demografi-warga/[id]
  - PUT          /demografi-warga/[id]/update
  - DELETE       /demografi-warga/[id]/delete

/alamat-warga:
  - GET          /alamat-warga
  - POST         /alamat-warga/create
  - GET          /alamat-warga/[id]
  - PUT          /alamat-warga/[id]/update
  - DELETE       /alamat-warga/[id]/delete

/pekerjaan-warga:
  - GET          /pekerjaan-warga
  - POST         /pekerjaan-warga/create
  - GET          /pekerjaan-warga/[id]
  - PUT          /pekerjaan-warga/[id]/update
  - DELETE       /pekerjaan-warga/[id]/delete
```

### **Struktur Routing Berbasis `warga` + GET ALL**

```
/admin/warga:
  - GET          /admin/warga              ← get list semua warga
  - POST         /admin/warga/create       ← create warga
  - GET          /admin/warga/[id]         ← get detail warga
  - PUT          /admin/warga/[id]/update  ← update warga
  - DELETE       /admin/warga/[id]/delete  ← hapus warga + dependents

# endpoint untuk mengisi/memperbarui data tambahan per warga
  - POST         /admin/warga/[id]/demografi-warga/create
  - PUT          /admin/warga/[id]/demografi-warga/update
  - GET          /admin/warga/[id]/demografi-warga

  - POST         /admin/warga/[id]/alamat-warga/create
  - PUT          /admin/warga/[id]/alamat-warga/update
  - GET          /admin/warga/[id]/alamat-warga

  - POST         /admin/warga/[id]/pekerjaan-warga/create
  - PUT          /admin/warga/[id]/pekerjaan-warga/update
  - GET          /admin/warga/[id]/pekerjaan-warga

# endpoint tambahan untuk kebutuhan agregasi, analisis, audit
  - GET          /admin/demografi-warga
  - GET          /admin/alamat-warga
  - GET          /admin/pekerjaan-warga
```

