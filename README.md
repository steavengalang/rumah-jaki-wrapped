# Open House Rumah Jaki Wrapped

Quiz interaktif untuk mengetahui personality kamu di Open House Rumah Jaki! 🏠

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## Features

- 🎮 15 pertanyaan quiz interaktif
- 🤖 AI-powered personality analysis (Groq)
- 📱 Responsive design
- 🔐 Google OAuth login
- 📊 Yearly history tracking
- 📥 Download hasil sebagai gambar
- 🎉 Confetti celebration

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS v4
- **Animation**: Framer Motion
- **Database**: Prisma + SQLite
- **Auth**: NextAuth.js
- **AI**: Groq API

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/rumah-jaki-wrapped.git
cd rumah-jaki-wrapped
npm install
```

### 2. Setup Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
# Groq API
GROQ_API_KEY=your-groq-api-key

# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 3. Setup Database

```bash
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## License

MIT
