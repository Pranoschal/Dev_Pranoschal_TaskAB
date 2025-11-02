# Task A – Full Stack Application

Monorepo with a TypeScript Express backend (FAQ search API) and a Next.js frontend.

## Tech Stack
- Backend: Node.js, Express, TypeScript, Helmet, CORS, dotenv
- Frontend: Next.js 15, React 19, Tailwind CSS 4, Lucide

## Repository Structure
```
.
├── backend/      # Express API (TypeScript)
└── frontend/     # Next.js app (App Router)
```

## Prerequisites
- Node.js 18+ (recommend LTS)
- npm 9+

## Quick Start (Development)
Open two terminals:

- Backend
  ```bash
  cd backend
  npm install
  # Create .env (see Environment Variables)
  npm run dev
  # Runs on http://localhost:5000 (default)
  ```

- Frontend
  ```bash
  cd frontend
  npm install
  # Create .env (see Environment Variables)
  npm run dev
  # Runs on http://localhost:3000 (default)
  ```

## Environment Variables

### Backend (`backend/.env`)
Required config to set up backend env file:
```
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5000
```
Notes:
- `PORT`: API port.
- `CLIENT_URL`: Origin allowed by CORS (frontend dev URL).

### Frontend (`frontend/.env`)
If not already set, use:
```
NEXT_PUBLIC_EXPRESS_API_URL=http://localhost:3001
```
Notes:
- `NEXT_PUBLIC_EXPRESS_API_URL`: Public base URL for the backend API used by the frontend.

## Available Scripts

### Backend
- `npm run dev` – Start dev server with tsx watch.
- `npm run build` – TypeScript build to `dist/`.
- `npm start` – Start the built server.
- `npm run type-check` – TypeScript noEmit check.

### Frontend
- `npm run dev` – Next.js dev server.
- `npm run build` – Production build.
- `npm start` – Start production server.
- `npm run lint` – Lint.

## Production

- Backend
  ```bash
  cd backend
  npm install
  npm run build
  npm start
  ```
  Ensure `PORT`, `NODE_ENV=production`, and `CLIENT_URL` are set properly.

- Frontend
  ```bash
  cd frontend
  npm install
  npm run build
  npm start
  ```
  Ensure `NEXT_PUBLIC_EXPRESS_API_URL` points to your deployed backend.

## API Overview

- `POST /api/search`
  - Request:
    ```json
    {
      "query": "trust badges"
    }
    ```
  - Response (example):
    ```json
    {
      "results": [{ "id": "1", "title": "...", "body": "..." }],
      "summary": "Found 1 result ...",
      "sources": ["1"]
    }
    ```

- `GET /health` – Health check.

## Notes
- CORS is configured on the backend; set `CLIENT_URL` to your frontend origin.
- For local dev: frontend at `http://localhost:3000`, backend at `http://localhost:5000`.


## Frontend Architecture Project Structure
```
src/
├── app/                # Next.js App Router
│   ├── api/           # API route handlers
│   ├── layout.tsx     # Root layout
│   ├── page.tsx       # Home page
│   └── globals.css    # Global styles
├── components/         # React components
│   ├── search/        # Search-specific components
│   └── ui/            # Reusable UI components (shadcn/ui)
├── lib/               # Utility functions
│   ├── utils.ts       # Helper utilities
│   └── search.ts      # Search logic
└── types/             # TypeScript type definitions
```


## Backend Architecture Project Structure
```
src/
├── config/          # Environment configuration
├── controllers/     # Request handlers
├── services/        # Business logic
├── types/          # TypeScript interfaces
├── middleware/     # Express middleware
├── routes/         # API routes
└── server.ts       # Application entry point
```

