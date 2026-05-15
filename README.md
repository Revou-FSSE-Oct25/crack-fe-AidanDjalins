[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/-nyOcXJT)

# Chinoss CoffeeSpace — Frontend

## Project Overview

This is the frontend for Chinoss CoffeeSpace, a coffeeshop web application built with Next.js. It connects to a NestJS backend deployed on Railway with a PostgreSQL database on Supabase. The app allows customers to browse the menu, view locations on an interactive map, submit inquiries and event bookings, and manage their account. An admin dashboard is available for managing products.

---

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- UI Components: shadcn/ui
- Forms: React Hook Form + Zod
- Auth: JWT stored in cookies via js-cookie
- Map: Leaflet 
- Notifications: Sonner (toast)
- Package Manager: pnpm

---

## Folder Structure

```
app/
  about/
  admin/
  contact/
  events/
  locations/
  login/
  menu/
  profile/
  components/
    Header.tsx
    Footer.tsx
    HeroBanner.tsx
    Explore.tsx
    About.tsx
    Locations.tsx
    Contact.tsx
    Map.tsx
  context/
    AuthContext.tsx
  lib/
    apiClient.ts
  globals.css
  layout.tsx
  page.tsx
public/
  images/
  icons/
data/
  menu.ts
```

---

## Pages

- `/` — Homepage with hero, explore section, about, locations map, and contact CTA
- `/menu` — Full product menu with category filtering, pagination, and product detail modal
- `/about` — Company story and values
- `/locations` — Interactive Leaflet map with all branch locations and info cards
- `/events` — Event hosting showcase with FAQ and booking CTA
- `/contact` — Contact form with conditional event booking fields
- `/login` — Login and register with tab switcher
- `/profile` — User profile, inquiry history with view, edit, and delete
- `/admin` — Admin-only product management dashboard (CRUD)

---

## Features

- JWT authentication stored in cookies, persists across page refreshes
- Route protection on `/profile` and `/admin`, redirects unauthenticated users
- Admin role detection, shows Admin nav link only to admin users
- Contact form maps to backend inquiry types (QUESTION, COMPLAINT, EVENT)
- Event inquiry shows additional date field when selected
- URL query param `?type=event` pre-fills the contact form inquiry type
- Menu fetches products from backend with category tabs derived dynamically
- Locations map and cards both fetch from backend
- Profile page shows user inquiries with edit and delete functionality
- Admin dashboard allows creating, updating, and deleting products

---

## Environment Variables

Create a `.env.local` file at the project root:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.up.railway.app
```

For local development:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open `http://localhost:3000` in your browser.

---

## Deployment

The frontend is deployed on Vercel. Set the `NEXT_PUBLIC_API_URL` environment variable in the Vercel dashboard to point to the Railway backend URL.

After deploying the frontend, update the `FRONTEND_URL` environment variable on Railway to the Vercel URL so CORS works correctly.

---

## Backend

The backend repository is at: `crack-be-AidanDjalins`

Built with NestJS, Prisma, PostgreSQL (Supabase), deployed on Railway.

---

## Design

- Primary color: `#B21600` (Chinoss Red)
- Accent color: `#F5F0EB` (Cream)
- Fonts: Playfair Display (headings), Montserrat (body)
- Design language: Minimal, editorial, warm