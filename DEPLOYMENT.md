# Frontend Deployment Guide for Vercel

## Prerequisites
- Frontend code should be in the `/frontend` directory ✓
- Backend deployed separately or running on a server
- Node.js 18+ installed locally

## Setup Steps

### 1. Environment Variables
Set the following environment variable in your Vercel project dashboard:

```
VITE_API_URL = https://your-backend-api-url.com
```

Replace `https://your-backend-api-url.com` with your actual backend URL (could be another Vercel deployment, Heroku, or your own server).

### 2. Local Development
```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:5173` and proxy API calls to `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```

This creates a `dist` folder with optimized static files.

### 4. Deploy to Vercel
The `vercel.json` at the root of your project is configured to:
- Build the frontend from the `/frontend` directory
- Output to `/frontend/dist`
- Serve as a static site with proper SPA routing (any route not matching `/api/*` goes to `index.html`)
- Route `/api/*` requests to your backend

### 5. Important Notes

- **API URL Configuration**: The frontend uses `VITE_API_URL` environment variable. Make sure it's set in Vercel's environment variables.
- **CORS**: Your backend should accept requests from your Vercel domain. Configure CORS properly.
- **Cookies**: Make sure your backend sets `SameSite=None; Secure` for cookies to work across domains.
- **Backend**: Ensure your backend is also deployed and accessible at the URL you set in `VITE_API_URL`.

### 6. Vercel Dashboard Configuration

1. Connect your GitHub/GitLab repository to Vercel
2. In Project Settings → Environment Variables, add:
   - Key: `VITE_API_URL`
   - Value: Your backend API URL
3. In Project Settings → Build & Development, ensure:
   - Build Command: `npm run build --prefix frontend` (or set in vercel.json)
   - Output Directory: `frontend/dist`
4. Deploy!

## Troubleshooting

- **404 on routes**: Check that the Vercel config routes are redirecting non-API routes to `index.html` ✓
- **API calls failing**: Verify `VITE_API_URL` is set correctly and backend is accessible
- **CORS errors**: Configure CORS on your backend to accept your Vercel domain
- **Build fails**: Run `npm install` and `npm run build` locally to debug
