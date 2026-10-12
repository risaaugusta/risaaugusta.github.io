# Personal Profile

Satu halaman profil personal menggunakan Next.js App Router, TypeScript, dan CSS biasa.

## Menjalankan project

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Struktur

```text
app/
  globals.css   # Design system dan layout responsif
  layout.tsx    # Root layout, metadata, dan bahasa halaman
  page.tsx      # Seluruh section profil dalam satu halaman
public/         # Aset statis (tambahkan foto atau ilustrasi di sini)
```

Sesuaikan nama, bio, statistik, proyek, alamat email, dan tautan sosial di `app/page.tsx`, serta metadata di `app/layout.tsx`.
