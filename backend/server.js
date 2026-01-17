import express from 'express'
import dotenv from 'dotenv'
import { coonectionDb } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js'

dotenv.config()




const app  = express();

app.use(express.json())


app.use('/api/auth',authRoutes)

app.listen(process.env.PORT , () =>{

    console.log('Server is ruuning on PORT:',process.env.PORT)
    coonectionDb();
})