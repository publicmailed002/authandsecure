import express from 'express'
import dotenv from 'dotenv'
import { coonectionDb } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js'

dotenv.config()

const app = express();

app.use(express.json())

app.use('/api/auth', authRoutes)

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
})

// For local development only
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
        console.log('Server is running on PORT:', PORT)
        coonectionDb();
    })
}

export default app