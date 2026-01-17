# Auth and Secure Login System

A Node.js/Express authentication system with secure login, JWT tokens, and email verification via Mailtrap.

## Features
- User registration and login
- JWT authentication
- Password encryption with bcryptjs
- Email verification via Mailtrap
- Cookie-based session management
- MongoDB integration

## Setup

### Environment Variables
Create a `.env` file based on `.env.example`:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_FROM=your_email
MAILTRAP_TOKEN=your_mailtrap_token
```

### Installation
```bash
npm install
cd backend && npm install
```

### Development
```bash
npm run dev
```

### Deployment on Vercel
1. Push to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## API Routes
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/verify-email` - Verify email

## Tech Stack
- Node.js/Express
- MongoDB + Mongoose
- JWT
- Bcryptjs
- Mailtrap Email Service
