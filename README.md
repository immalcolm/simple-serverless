# Serverless Deployment via Vercel

## Converting from Express
To convert your Express.js app into a Vercel-compatible Serverless API, you need to:
1. Remove the Express server logic (like app.listen())
2. Export a **single handler** function that handles all the routing logic.
3. Use **one file per route** inside the /api folder, or build a mini Express app inside one handler.
s

## When to use Vercel Serverless
- Building fast, single-purpose API endpoints
- Working with Next.js or static frontend
- Deploying with zero config
- You're okay with stateless functions and external DBs

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

## State Management Pitfall
| 🔥 Express                                      | 🌩️ Serverless (Vercel)                                    |
| ----------------------------------------------- | ---------------------------------------------------------- |
| Memory is persistent                            | Memory is ephemeral (resets per request)                   |
| `let goals = [...]` will hold across requests   | `let goals = [...]` resets each time                       |
| You can use in-memory caching like Redis easily | You **must** use external storage (DB, KV) for persistence |

## Routing Structure
| 🔥 Express                               | 🌩️ Vercel Serverless                                  |
| ---------------------------------------- | ------------------------------------------------------ |
| Centralized in `app.js` or `routes/*.js` | **File-based** routing per HTTP path                   |
| `app.get('/goals/:id', handler)`         | `api/goals/[id].js`                                    |
| Middleware chains (e.g., `app.use()`)    | You need to call middlewares manually in each function |

## Server Lifecycle
| 🔥 Express                       | 🌩️ Serverless (Vercel)                                                    |
| -------------------------------- | -------------------------------------------------------------------------- |
| One long-lived Node server       | Cold start per request                                                     |
| Can reuse global objects         | Must reinit everything each time                                           |
| Easy to use WebSockets, sessions | Harder or unsupported (WebSockets need edge function setup or workarounds) |

## Deployment flow
| 🔥 Express                               | 🌩️ Vercel                         |
| ---------------------------------------- | ---------------------------------- |
| You deploy a server to a VM/container    | You deploy functions as files      |
| Manual server management                 | Automatic, no infra needed         |
| You need to manage `pm2`, `nginx`, ports | Vercel handles deployment and URLs |

## Testing & Debugging
| 🔥 Express                           | 🌩️ Serverless                                             |
| ------------------------------------ | ---------------------------------------------------------- |
| Easy to run with `node` or `nodemon` | Requires `vercel dev`, cold starts                         |
| Can inspect with Postman easily      | Can do the same, but file-based paths must match API calls |

## Summary 
| Category       | Express                          | Vercel Serverless                         |
| -------------- | -------------------------------- | ----------------------------------------- |
| **Routing**    | Centralized                      | File-based                                |
| **State**      | Persistent                       | Stateless (per request)                   |
| **Deployment** | Manual (or Docker)               | Automatic via CLI or Git                  |
| **Scaling**    | Needs infra setup                | Scales automatically                      |
| **Cold Start** | No                               | Yes (especially on first call)            |
| **Sessions**   | Native                           | Must use token-based auth                 |
| **WebSockets** | Built-in                         | Workaround needed (Edge Functions)        |
| **Best For**   | Complex backends, legacy support | Lightweight APIs, JAMstack, microservices |
