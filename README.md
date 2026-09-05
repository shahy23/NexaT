# NexaTech Website

A modern, responsive multi-page website for NexaTech, a fictional software company, built with React + Vite.

## Pages
- Home
- About
- Services
- Projects / Portfolio (with category filtering)
- Team
- Contact (with form validation)

## Getting Started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually https://nexa-t-phi.vercel.app/).

## Build for production

```bash
npm run build
npm run preview
```

## Notes

- Navigation between pages is handled with React state (in `src/App.jsx`) rather than `react-router-dom`, so there are no extra routing dependencies to install. If you'd like real URL-based routing, swap in `react-router-dom` and split each page into its own route.
- Icons are from [lucide-react](https://lucide.dev/).
- Fonts (Sora, Inter, JetBrains Mono) are loaded from Google Fonts via CSS `@import` in `src/App.jsx`.
- Project and team images are placeholder photos from Unsplash and Pravatar — swap in your own assets before shipping to a client.
