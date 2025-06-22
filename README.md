## Setup dan Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/Raphonkzy/FileHub-API.git
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Database PostgreSQL

#### Opsi A: Menggunakan Database Lokal
1. Install PostgreSQL
2. Buat database baru:
```sql
CREATE DATABASE filehub_db;
```

3. Buat tabel videos:
```sql
USE filehub_db;

CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    video_url TEXT NOT NULL,
    title TEXT
);
```

#### Opsi B: Menggunakan Supabase (Recommended)
1. Buka [Supabase](https://supabase.com/) dan buat akun
2. Buat project baru
3. Di SQL Editor, jalankan query berikut:
```sql
CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    video_url TEXT NOT NULL,
    title TEXT
);
```
4. Dapatkan connection string dari Connect (berada di sebelah nama project) -> Session Pooler -> View parameters.

### 4. Konfigurasi Environment Variables

Buat file `.env` di root directory:
```env
DB_HOST=your_database_host
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
PORT=3000
```

**Contoh untuk Supabase:**
```env
DB_HOST=aws-0-ap-southeast-1.pooler.supabase.com
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres.xxxxxxxxxxxxx
DB_PASSWORD=your_password
PORT=3000
```

**Contoh untuk PostgreSQL lokal:**
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=filehub_db
DB_USER=postgres
DB_PASSWORD=your_password
PORT=3000
```

### 5. Jalankan Server

#### Mode Development (dengan auto-reload):
```bash
npm run dev
```

#### Mode Production:
```bash
npm start
```

API akan berjalan di: `http://localhost:3000`

## Verifikasi Setup

Buka browser atau gunakan curl untuk mengakses:
```
http://localhost:3000
```

Jika berhasil, Anda akan melihat response seperti ini:
```json
{
  "message": "FileHub API is running!",
  "version": "1.0.0",
  "endpoints": {
    "GET /api/videos": "Get all videos",
    "GET /api/videos/:id": "Get video by ID",
    "GET /api/videos/search?query=": "Search videos",
    "POST /api/videos": "Create new video",
    "PUT /api/videos/:id": "Update video",
    "DELETE /api/videos/:id": "Delete video"
  }
}
```

## Struktur Database

```sql
CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    video_url TEXT NOT NULL,
    title TEXT
);
```

**Keterangan kolom:**
- `id`: Primary key (auto increment)
- `video_url`: URL video (wajib diisi)
- `title`: Judul video (opsional)

## API Endpoints

Base URL: `http://localhost:3000/api`

### 1. Mendapatkan Semua Video
- **URL:** `GET /api/videos`
- **Deskripsi:** Mengambil semua data video yang tersimpan
- **Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "video_url": "https://example.com/video1.mp4",
      "title": "Video Contoh"
    }
  ],
  "count": 1
}
```

### 2. Mendapatkan Video Berdasarkan ID
- **URL:** `GET /api/videos/:id`
- **Parameter:** `id` (integer) - ID video yang ingin diambil
- **Contoh:** `GET /api/videos/1`
- **Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "video_url": "https://example.com/video1.mp4",
    "title": "Video Contoh"
  }
}
```

### 3. Membuat Video Baru
- **URL:** `POST /api/videos`
- **Content-Type:** `application/json`
- **Body:**
```json
{
  "video_url": "https://example.com/video.mp4",
  "title": "Judul Video Saya"
}
```
- **Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "video_url": "https://example.com/video.mp4",
    "title": "Judul Video Saya"
  },
  "message": "Video created successfully"
}
```

### 4. Mengupdate Video
- **URL:** `PUT /api/videos/:id`
- **Parameter:** `id` (integer) - ID video yang ingin diupdate
- **Content-Type:** `application/json`
- **Body:**
```json
{
  "video_url": "https://example.com/updated-video.mp4",
  "title": "Judul Video yang Diperbarui"
}
```
- **Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "video_url": "https://example.com/updated-video.mp4",
    "title": "Judul Video yang Diperbarui"
  },
  "message": "Video updated successfully"
}
```

### 5. Menghapus Video
- **URL:** `DELETE /api/videos/:id`
- **Parameter:** `id` (integer) - ID video yang ingin dihapus
- **Contoh:** `DELETE /api/videos/1`
- **Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "video_url": "https://example.com/video.mp4",
    "title": "Video yang Dihapus"
  },
  "message": "Video deleted successfully"
}
```

### 6. Mencari Video
- **URL:** `GET /api/videos/search?query=kata_kunci`
- **Parameter:** `query` (string) - Kata kunci pencarian
- **Deskripsi:** Mencari video berdasarkan URL atau judul (pencarian parsial)
- **Contoh:** `GET /api/videos/search?query=tutorial`
- **Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "video_url": "https://example.com/tutorial-video.mp4",
      "title": "Tutorial Programming"
    }
  ],
  "count": 1
}
```

## Error Responses

Semua error response menggunakan format standar:
```json
{
  "success": false,
  "error": "Pesan error"
}
```

**HTTP Status Codes:**
- `200` - Berhasil
- `201` - Data berhasil dibuat
- `400` - Bad Request (data tidak valid)
- `404` - Data tidak ditemukan
- `500` - Internal Server Error

**Contoh Error Responses:**
```json
// Video tidak ditemukan
{
  "success": false,
  "error": "Video not found"
}

// video_url wajib diisi
{
  "success": false,
  "error": "video_url is required"
}

// Query pencarian wajib diisi
{
  "success": false,
  "error": "Search query is required"
}
```

## Testing API

### Menggunakan curl

#### 1. Membuat video baru:
```bash
curl -X POST http://localhost:3000/api/videos \
  -H "Content-Type: application/json" \
  -d '{"video_url": "https://example.com/test-video.mp4", "title": "Video Test"}'
```

#### 2. Mendapatkan semua video:
```bash
curl http://localhost:3000/api/videos
```

#### 3. Mendapatkan video spesifik:
```bash
curl http://localhost:3000/api/videos/1
```

#### 4. Mengupdate video:
```bash
curl -X PUT http://localhost:3000/api/videos/1 \
  -H "Content-Type: application/json" \
  -d '{"video_url": "https://example.com/updated-video.mp4", "title": "Judul Baru"}'
```

#### 5. Menghapus video:
```bash
curl -X DELETE http://localhost:3000/api/videos/1
```

#### 6. Mencari video:
```bash
curl "http://localhost:3000/api/videos/search?query=tutorial"
```

### Menggunakan Postman atau Thunder Client

1. **Import Collection**: Buat collection baru di Postman
2. **Base URL**: `http://localhost:3000`
3. **Headers**: Untuk POST/PUT requests, tambahkan `Content-Type: application/json`

#### Contoh Request di Postman:

**POST** `/api/videos`
```json
{
  "video_url": "https://youtube.com/watch?v=example",
  "title": "Tutorial JavaScript"
}
```

**PUT** `/api/videos/1`
```json
{
  "video_url": "https://youtube.com/watch?v=updated",
  "title": "Tutorial JavaScript - Updated"
}
```