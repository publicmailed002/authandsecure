import app from '../backend/server.js';
import { coonectionDb } from '../backend/db/connectDB.js';

// Initialize database connection for serverless
if (process.env.NODE_ENV === 'production') {
    coonectionDb();
}

// Export for Vercel serverless functions
export default app;
