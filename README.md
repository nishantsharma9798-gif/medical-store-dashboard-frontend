# Medical Store Frontend

React + TypeScript + Vite frontend for the Medical Store module of the client multi-app dashboard.

## Stack

- React 18 + Vite + TypeScript
- Tailwind CSS
- TanStack React Query (server state)
- Zustand (auth/UI state)
- React Hook Form + Zod (forms/validation)
- Axios (with auto token-refresh interceptor)
- html5-qrcode (camera barcode scanning) + keyboard-wedge USB/BT scanner support

## Getting started

```bash
npm install
cp .env.example .env   # set VITE_API_URL to your backend
npm run dev
```

## Folder structure

```
public/
  images/       -> drop your own images here (see public/images/README.md for exact filenames)
src/
  api/          -> axios instance + one file per backend module (auth, medicines, inventory, suppliers, invoices, alerts)
  components/
    ui/         -> base building blocks (button, input, card, badge)
    shared/     -> composed reusable pieces (DataTable, ScannerInput, ProtectedRoute, AppShell)
  features/
    home/       -> public landing page (HomePage)
    auth/       -> Login, Signup, Forgot/Reset password (AuthLayout is the shared split-screen wrapper)
    admin/, dashboard/, medical/*  -> rest of the app, one folder per screen group
  hooks/        -> useAuth, usePermission
  lib/          -> query client, cn/format utilities
  routes/       -> AppRoutes.tsx — all route definitions live here
  store/        -> authStore (Zustand)
  types/        -> shared TypeScript interfaces
```

## Pages

| Route | Page | Notes |
|---|---|---|
| `/` | Home | Public landing page — hero, features, CTA |
| `/login` | Login | Split-screen with image, links to signup/forgot |
| `/signup` | Signup | Creates a new business (Client) + its first Client Admin |
| `/forgot-password` | Forgot password | Sends reset link to email |
| `/reset-password?token=...` | Reset password | Link from the reset email lands here |
| `/dashboard` onward | App | Protected, requires login |

`signup`, `forgot-password`, and `reset-password` call backend endpoints that aren't
built yet (`/api/v1/auth/signup`, `/api/v1/auth/forgot-password`, `/api/v1/auth/reset-password`) —
add these to the FastAPI backend before going live; the frontend is already wired to call them.

## Images

`public/images/` already has original, ready-to-use images (generated in-house, no copyright
concerns) — `logo.png`, `hero-bg.jpg`, `auth-bg.jpg`, and three feature-card images. The app
works out of the box with these. Want your own branding instead? Just replace the file with
the same filename — nothing in the code needs to change.

## Auth flow

- Login returns a short-lived access token (kept in memory via Zustand, never localStorage) and sets an
  httpOnly refresh-token cookie from the backend.
- Axios interceptor attaches the access token to every request and auto-refreshes on a 401, retrying the
  original request once.
- `ProtectedRoute` guards routes by role (`super_admin`, `client_admin`, `staff`). `usePermission().can()`
  additionally checks granular staff permissions for specific actions.

## Scanner entry

`ScannerInput` supports two modes out of the box:
1. USB/Bluetooth barcode scanners, which act as keyboard input — just keep the text field focused.
2. Phone/laptop camera scanning via `html5-qrcode`, toggled with the "Use camera" button.

## Status

Super Admin screens are stubbed minimally and are **not** the current priority — the active build focus is
the Client Dashboard and the Medical Store module (inventory, suppliers, alerts, invoices, profit & loss).

## Environment variables

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the FastAPI backend |

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```
