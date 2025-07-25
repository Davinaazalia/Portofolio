# 🤖 Cara Setup Google Gemini API untuk Chatbot

## Langkah-langkah Setup:

### 1. Dapatkan API Key GRATIS
1. Buka: https://makersuite.google.com/app/apikey
2. Login dengan akun Google kamu
3. Klik "Create API Key"
4. Copy API key yang dihasilkan

### 2. Konfigurasi di Project
1. Buka file `.env` di root project
2. Ganti `AIzaSyDemo_Key_Replace_With_Your_Real_Key` dengan API key asli kamu:
   ```
   VITE_GEMINI_API_KEY=AIzaSyABC123YourRealAPIKeyHere
   ```

### 3. Restart Development Server
```bash
# Stop server (Ctrl+C)
# Kemudian jalankan lagi:
npm run dev
```

### 4. Test Chatbot
- Buka website di browser
- Klik robot chatbot di pojok kanan bawah
- Header chatbot akan menunjukkan "🤖 AI Mode" jika berhasil
- Coba tanya sesuatu dan lihat respons AI yang cerdas!

## Status Mode:
- **🤖 AI Mode**: Menggunakan Google Gemini API (respons cerdas)
- **📝 Demo Mode**: Menggunakan preset responses (jawaban tetap)

## Troubleshooting:
- Pastikan API key benar dan aktif
- Cek console browser untuk error messages
- API key harus dimulai dengan "AIzaSy..."
- Restart development server setelah mengubah .env

## Keamanan:
- Jangan commit file `.env` ke git
- File `.env` sudah ada di `.gitignore`
- API key Gemini gratis dengan limit harian yang cukup
