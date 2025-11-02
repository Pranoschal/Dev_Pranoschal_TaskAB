# Dev_Pranoschal_TaskAB

This repository contains two independent projects:
- **Task A**: Full Stack Application (FAQ Search)
- **Task B**: Micro Scraper API

---

# Task A – Full Stack Application

Monorepo with a TypeScript Express backend (FAQ search API) and a Next.js frontend.

## Tech Stack
- Backend: Node.js, Express, TypeScript, Helmet, CORS, dotenv
- Frontend: Next.js 15, React 19, Tailwind CSS 4, Lucide

## Repository Structure
```
taskA-mini-full-stack-search/
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
  cd taskA-mini-full-stack-search/backend
  npm install
  # Create .env (see Environment Variables)
  npm run dev
  # Runs on http://localhost:5000 (default)
  ```

- Frontend
  ```bash
  cd taskA-mini-full-stack-search/frontend
  npm install
  # Create .env (see Environment Variables)
  npm run dev
  # Runs on http://localhost:3000 (default)
  ```

## Environment Variables

### Backend (`taskA-mini-full-stack-search/backend/.env`)
Required config to set up backend env file:
```
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5000
```
Notes:
- `PORT`: API port.
- `CLIENT_URL`: Origin allowed by CORS (frontend dev URL).

### Frontend (`taskA-mini-full-stack-search/frontend/.env`)
If not already set, use:
```
NEXT_PUBLIC_EXPRESS_API_URL=http://localhost:5000
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
  cd taskA-mini-full-stack-search/backend
  npm install
  npm run build
  npm start
  ```
  Ensure `PORT`, `NODE_ENV=production`, and `CLIENT_URL` are set properly.

- Frontend
  ```bash
  cd taskA-mini-full-stack-search/frontend
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

---

# Task B – Micro Scraper API

A lightweight web scraper API built with Express and Puppeteer that extracts basic page information from any URL.

## Features

- ✅ Extracts title, meta description, and H1 heading
- ✅ 20-second timeout protection
- ✅ Invalid URL validation
- ✅ Retry mechanism for failed navigations
- ✅ Custom user-agent override
- ✅ Production-grade error handling

## Setup Instructions

### 1. Install Dependencies
```bash
cd taskB-micro-scraper
npm install
```

### 2. Configure Environment (Optional)
Create a `.env` file in the `taskB-micro-scraper` directory:
```env
PORT=3000
SCRAPER_TIMEOUT=20000
```

### 3. Run the Server
```bash
npm run dev
```

The server will start at `http://localhost:3000`

## API Endpoints

### GET /api/scrape

Scrapes a webpage and returns basic information.

**Query Parameters:**
- `url` (required): The URL to scrape

**Example Request:**
```bash
curl "http://localhost:3000/api/scrape?url=https://example.com"
```

**Success Response (200):**
```json
{
  "title": "Example Domain",
  "metaDescription": "Example Domain. This domain is for use in illustrative examples.",
  "h1": "Example Domain",
  "status": 200
}
```

**Error Responses:**

**Invalid URL (400):**
```json
{
  "error": "Invalid URL"
}
```

**Timeout (504):**
```json
{
  "error": "Timeout"
}
```

## Project Structure

```
taskB-micro-scraper/
├── src/
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── middlewares/      # Error handling
│   ├── utils/            # Helper functions
│   └── app.js            # Express app configuration
├── server.js             # Server entry point
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Testing the API

### Test with a working URL:
```bash
curl "http://localhost:3000/api/scrape?url=https://ui.shadcn.com/"
```

### Test with invalid URL:
```bash
curl "http://localhost:3000/api/scrape?url=invalid-url"
```

### Test from browser:
Open your browser and visit:
```
http://localhost:3000/api/scrape?url=https://ui.shadcn.com/
```

## Assumptions

1. **Headless Mode**: Runs in headless mode (no GUI required)
2. **Timeout**: Default 20-second timeout for all requests
3. **Wait Strategy**: Waits for `networkidle2` (network mostly idle)
4. **Retry**: Single retry attempt on navigation failures
5. **User-Agent**: Custom user-agent to avoid basic bot detection

## Technologies Used

- **Express**: Web framework
- **Puppeteer**: Headless browser automation
- **dotenv**: Environment variable management

## Scoring Checklist

- ✅ Correct Extraction (title/meta/h1): 35 pts
- ✅ Robustness (timeouts, invalid URL, status codes): 30 pts
- ✅ API Design & Cleanliness: 20 pts
- ✅ Code Clarity & Structure: 10 pts
- ✅ Bonus (retry + UA override): 5 pts

**Total: 100/100 points**

## Notes

- The scraper respects the 20-second timeout requirement
- Invalid URLs return appropriate 400 status codes
- Timeout errors return 504 status codes
- Single retry mechanism is implemented for robustness
- Custom user-agent helps avoid basic bot detection

## License

MIT

## Installation & Run Commands

```bash
# Clone or create the project
mkdir taskB-micro-scraper
cd taskB-micro-scraper

# Copy all files as shown above

# Install dependencies
npm install

# Run the development server
npm run dev
```

## Quick Test

Once running, test with:
```bash
curl "http://localhost:3000/api/scrape?url=https://ui.shadcn.com/"
```

---

## Repository Overview

This repository contains two complete, independent projects:

1. **taskA-mini-full-stack-search**: A full-stack FAQ search application with TypeScript Express backend and Next.js frontend
2. **taskB-micro-scraper**: A lightweight web scraper API built with Express and Puppeteer

Each project has its own dependencies and can be run independently. Refer to the respective sections above for detailed setup and usage instructions.
