# 💰 Money Personal Tracking

Aplikasi pencatatan keuangan pribadi berbasis web (PWA) dengan dukungan Android native via **Capacitor**. Dibangun menggunakan **React 19**, **Vite 8**, dan **Tailwind CSS v4**.

## ✨ Fitur

- **Manajemen Dompet** — Tambah, edit, dan hapus dompet dengan tipe kustom
- **Pencatatan Mutasi** — Catat pemasukan (credit) dan pengeluaran (debit)
- **Kategori Mutasi** — Pilih kategori yang tersedia atau buat kategori baru
- **Filter & Paginasi** — Filter mutasi berdasarkan tanggal dan limit, dengan navigasi halaman
- **Dashboard** — Lihat ringkasan saldo dompet dalam carousel, aksi cepat, dan riwayat mutasi terbaru
- **Laporan** — Halaman laporan (placeholder, siap dikembangkan)
- **PWA** — Dapat diinstal sebagai aplikasi standalone di perangkat
- **Android Native** — Dibungkus dengan Capacitor untuk deployment ke Android

## 🖼️ Tampilan Aplikasi

| Halaman | Deskripsi |
|---------|-----------|
| **Dashboard** (`/`) | Greeting, carousel dompet, tombol aksi cepat (pemasukan/pengeluaran), riwayat mutasi |
| **Mutasi** (`/mutation`) | Daftar mutasi dengan filter tanggal & paginasi |
| **Tambah Mutasi** (`/mutation/add`) | Form tambah mutasi dengan pilihan dompet, kategori, tipe, nominal, keterangan |
| **Dompet** (`/wallet`) | Daftar semua dompet |
| **Tambah Dompet** (`/wallet/add`) | Form tambah dompet dengan preview saldo |
| **Edit Dompet** (`/wallet/:id`) | Edit atau hapus dompet |
| **Laporan** (`/report`) | Halaman laporan (placeholder) |

## 🛠️ Tech Stack

| Teknologi | Versi |
|-----------|-------|
| [React](https://react.dev/) | ^19.2.7 |
| [Vite](https://vitejs.dev/) | ^8.0.16 |
| [Tailwind CSS](https://tailwindcss.com/) | ^4.3.1 |
| [React Router](https://reactrouter.com/) | ^8.0.0 |
| [Capacitor](https://capacitorjs.com/) | ^6.2.1 |
| [Swiper](https://swiperjs.com/) | ^12.2.0 |
| [Lucide React](https://lucide.dev/) | ^1.21.0 |
| [indonesia-datetime](https://www.npmjs.com/package/indonesia-datetime) | ^1.0.1 |

## 📁 Struktur Proyek

```
src/
├── main.jsx                          # Entry point React + BrowserRouter
├── App.jsx                           # Routing utama
├── App.css                           # Import Tailwind CSS
├── index.html                        # Template HTML
├── manifest.json                     # PWA manifest
├── .env.example                      # Contoh environment variables
├── components/
│   ├── Header.jsx                    # Header dengan tombol back & judul
│   ├── Navbar.jsx                    # Bottom navigation (Home, Mutasi, Report)
│   └── NotFoundPage.jsx              # Halaman 404
├── features/
│   ├── MainMenu/
│   │   ├── Page.jsx                  # Dashboard utama
│   │   ├── components/
│   │   │   ├── WalletCard.jsx        # Kartu dompet dengan gradient
│   │   │   ├── WalletCardSkeleton.jsx # Skeleton loading untuk kartu dompet
│   │   │   ├── WalletCarousel.jsx    # Swiper carousel untuk kartu dompet
│   │   │   └── EmptyWalletCard.jsx   # CTA tambah dompet jika kosong
│   │   └── entities/
│   │       └── wallet_entity.js      # Entity class Wallet
│   ├── Mutation/
│   │   ├── Page.jsx                  # Daftar mutasi dengan filter & paginasi
│   │   └── AddPage.jsx               # Form tambah mutasi
│   ├── Wallet/
│   │   ├── Page.jsx                  # Daftar dompet
│   │   ├── AddPage.jsx               # Form tambah dompet
│   │   └── EditPage.jsx              # Form edit & hapus dompet
│   └── Report/
│       └── Page.jsx                  # Halaman laporan (placeholder)
└── services/
    ├── api.js                        # HTTP client dengan Bearer token
    ├── WalletService.js              # Service untuk API dompet
    └── MutationService.js            # Service untuk API mutasi
```

## 🚀 Cara Menjalankan

### Prasyarat

- Node.js >= 18
- npm atau pnpm

### Instalasi

```bash
# Clone repositori
git clone https://github.com/Ridhonurr/Money-Personal-Tracking.git
cd Money-Personal-Tracking/app

# Install dependencies
npm install
```

### Konfigurasi Environment

Buat file `.env` di folder `src/` berdasarkan `.env.example`:

```env
VITE_API_URL=https://yourbackend.com/api
VITE_API_KEY=your_secret_key
```

### Development

```bash
npm start
```

Aplikasi akan berjalan di `http://localhost:5173`.

### Build

```bash
npm run build
```

Hasil build akan berada di folder `dist/`.

## 📱 Build Android

Pastikan Android SDK dan Gradle sudah terinstal.

```bash
# Build production + sync ke Android + compile APK debug
npm run build:android

# Build production + sync ke Android + compile APK release
npm run build:android:release
```

### Perintah Capacitor Lainnya

```bash
npm run sync              # Sync web assets ke Capacitor
npm run sync:android      # Sync khusus Android
npm run open:android      # Buka project Android di Android Studio
npm run init:android      # Inisialisasi project Android (pertama kali)
```

## 📚 Context Management untuk AI

Proyek ini dilengkapi dengan file konteks yang dirancang agar mudah dipahami oleh AI coding assistant (seperti Cline) dan developer baru:

| File | Deskripsi |
|------|-----------|
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Arsitektur proyek, stack, struktur folder, data flow, session management, routing |
| [`API.md`](./API.md) | Dokumentasi lengkap semua endpoint REST API (request/response shape) |
| [`src/types.js`](./src/types.js) | JSDoc type definitions untuk semua entity dan payload |
| [`src/features/Authentication/CONTEXT.md`](./src/features/Authentication/CONTEXT.md) | Konteks fitur autentikasi |
| [`src/features/MainMenu/CONTEXT.md`](./src/features/MainMenu/CONTEXT.md) | Konteks fitur dashboard utama |
| [`src/features/Mutation/CONTEXT.md`](./src/features/Mutation/CONTEXT.md) | Konteks fitur mutasi/transaksi |
| [`src/features/Wallet/CONTEXT.md`](./src/features/Wallet/CONTEXT.md) | Konteks fitur manajemen dompet |
| [`src/features/Report/CONTEXT.md`](./src/features/Report/CONTEXT.md) | Konteks fitur laporan |

File-file ini mendokumentasikan:
- **Tujuan** setiap fitur
- **Data flow** dan state management
- **Dependencies** antar modul
- **Edge cases** yang perlu ditangani
- **Response shape** API untuk setiap endpoint

## 🔌 API Endpoints


Aplikasi ini mengonsumsi REST API dengan autentikasi Bearer token.

### Wallet

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/wallet` | Daftar semua dompet |
| GET | `/wallet/:id` | Detail dompet |
| GET | `/wallet/card` | Dompet untuk ditampilkan di kartu |
| GET | `/wallet/type` | Daftar tipe dompet |
| POST | `/wallet/add` | Tambah dompet baru |
| PUT | `/wallet/:id` | Update dompet |
| DELETE | `/wallet/:id` | Hapus dompet |

### Mutation

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/mutation?start=&end=&limit=&page=` | Daftar mutasi dengan filter |
| GET | `/mutation/last` | Mutasi terbaru |
| GET | `/mutation/category` | Daftar kategori mutasi |
| POST | `/mutation/add` | Tambah mutasi baru |

## 🧩 Komponen Utama

### `Header`
Komponen header dengan tombol back dan judul.
- **Props:** `back` (path navigasi), `title` (judul halaman)

### `Navbar`
Bottom navigation bar tetap dengan 3 tab: Home, Mutasi, Report.
- Menyorot tab aktif dengan warna hijau

### `WalletCard`
Kartu dompet dengan gradient hijau gelap, menampilkan label dan saldo terformat.

### `WalletCarousel`
Carousel berbasis Swiper.js untuk menampilkan kartu dompet dengan dot pagination.

### `WalletCardSkeleton`
Placeholder loading dengan animasi pulse untuk kartu dompet.

### `EmptyWalletCard`
Tombol CTA dengan border dashed untuk navigasi ke halaman tambah dompet.

## 📄 Lisensi

ISC
