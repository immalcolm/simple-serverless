# Serverless Deployment via Vercel

## Converting from Express
To convert your Express.js app into a Vercel-compatible Serverless API, you need to:
1. Remove the Express server logic (like app.listen())
2. Export a **single handler** function that handles all the routing logic.
3. Use **one file per route** inside the /api folder, or build a mini Express app inside one handler.
s

## Notes
- Vercel gives you req and res similar to Node.js, so no need for a framework unless you really need routing middleware.
- You can still serve static files from /public — Vercel automatically does that.
- Each file in `/api` becomes an endpoint — so `/api/goals.js ` is `/api/goals`.
- Vercel prefers pure function handlers for best performance and cold-start speed.

## Folder structure
```
my-vercel-app/
├── api/
│   └── goals.js
├── public/
│   └── (your static files here)
├── package.json
└── vercel.json (optional)
```

## ⚠️ Tips
- Don't use `app.listen()` – Vercel handles that.
- **Always** export default function handler(req, res) for each route.
- Every file in `/api/` becomes a **route**.

## Understanding pathing in Vercel
**URL path:**
- When you access `/api/goals`, Vercel will call the handler in `api/goals.js`.
- If you access `/api/v1/goals`, you need the file at `/api/v1/goals.js`.

## What to put in `/public`

| File Type | Example Use                                     |
| --------- | ----------------------------------------------- |
| HTML      | Landing pages (e.g. `index.html`)               |
| CSS       | Custom stylesheets (`styles.css`)               |
| JS        | Frontend JavaScript (`app.js`)                  |
| Images    | Logos, photos, icons (`logo.png`, `banner.jpg`) |
| Fonts     | Web fonts (`.woff`, `.ttf`)                     |
| JSON      | Static data or config (`sample.json`)           |
| PDF       | Downloadable brochures or guides                |
| Favicon   | Site icon (`favicon.ico`)                       |

## Sample `/public` folder structure
```pgsql
public/
├── index.html
├── styles.css
├── app.js
├── images/
│   ├── logo.png
│   └── banner.jpg
└── favicon.ico
```
