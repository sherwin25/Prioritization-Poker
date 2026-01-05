# Prioritization Poker

A real-time multiplayer estimation tool for product teams, built with Next.js and Supabase Realtime.

## Features
- **Instant Lobbies**: No signup required. Generate a code and share it.
- **Real-time Sync**: See who joins and votes instantly.
- **Privacy First**: Votes are hidden until reveal.
- **Responsive UI**: Glassmorphism design with mobile support.

## Setup

1.  **Clone & Install**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Copy `.env.template` to `.env.local` and add your Supabase credentials.
    ```bash
    cp .env.template .env.local
    ```
    *You need a Supabase project with Realtime enabled.*

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000).

## Tech Stack
- Next.js 14 (App Router)
- Supabase (Realtime Presence & Channels)
- Tailwind CSS
- Framer Motion
