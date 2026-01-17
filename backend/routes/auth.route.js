import express from "express"
import { login , signup , logout, verifyemails, forgetpassword, resetPassword  } from "../controller/auth.controller.js";




const router = express.Router();


router.post('/signup' ,signup)
router.post('/login' ,login)
router.post('/logout' ,logout)
router.post('/verify-email',verifyemails)
router.post('/forget-password',forgetpassword)
router.post('/reset-password/:token',resetPassword)


export default router;