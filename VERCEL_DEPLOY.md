# Deploy to Vercel - Step by Step Guide

## Prerequisites
- GitHub account with your code repository
- Vercel account (free tier works)
- Backend deployed elsewhere (Render, Railway, Heroku, or your own server)

## Step 1: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Click "Import"

## Step 2: Configure Environment Variables

In the Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add this variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-backend-url.com` (replace with your actual backend URL)
   - **Environments:** Check all (Production, Preview, Development)
3. Click "Save"

## Step 3: Deploy Settings (Usually Auto-Configured)

Vercel should auto-detect from `vercel.json`:
- **Build Command:** (auto-detected)
- **Output Directory:** `frontend/dist`
- **Root Directory:** (leave blank)

## Step 4: Deploy!

Click "Deploy" and wait for completion. Your frontend will be live at:
```
https://your-project-name.vercel.app
```

## Troubleshooting

### 1. Build Fails
**Error:** `npm ERR!` in build logs
- **Solution:** Delete `node_modules` and `package-lock.json`, run `npm install` locally and push code again

### 2. "Cannot GET /"
**Problem:** Frontend shows 404 errors on page refresh
- **Solution:** This is fixed in `vercel.json`. Ensure it's in the root directory with correct routes.

### 3. API Calls Return 400/401
**Problem:** Backend errors when frontend makes requests
- **Check:**
  - Is `VITE_API_URL` environment variable set in Vercel?
  - Does your backend accept requests from your Vercel domain?
  - Is your backend online and accessible?

**To test your backend URL:**
```bash
curl https://your-backend-url.com/api/auth/check-auth
```

### 4. CORS Errors in Console
**Problem:** `Access to XMLHttpRequest blocked by CORS`
- **Solution:** Your backend must set CORS headers. Contact your backend developer to enable CORS for your Vercel domain.

## Local Development

To test locally before deploying:

```bash
# Install dependencies
cd frontend
npm install

# Start dev server (runs on http://localhost:5173)
npm run dev
```

API calls will proxy to `http://localhost:3000` (configured in `vite.config.js`)

## Environment Files

- **`.env.local`** - Local development (uses localhost)
- **`vercel.json`** - Vercel deployment configuration
- Set `VITE_API_URL` in Vercel dashboard for production

## Key Files

- `frontend/vite.config.js` - Dev server proxy config
- `frontend/package.json` - Build scripts
- `vercel.json` - Deployment configuration (handles SPA routing)

## Deployment Checklist

- [ ] GitHub repository is public or Vercel has access
- [ ] `vercel.json` is in the root directory
- [ ] `VITE_API_URL` is set in Vercel environment variables
- [ ] Backend is deployed and accessible
- [ ] Backend CORS allows your Vercel domain
- [ ] `npm run build` works locally without errors
- [ ] All environment variables are configured in Vercel dashboard

## Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Vite Docs:** https://vitejs.dev
- **React Router:** https://reactrouter.com
