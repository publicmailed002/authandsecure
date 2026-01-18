import express from "express"
import { login , signup , logout, verifyemails, forgetpassword, resetPassword, checkAuth  } from "../controller/auth.controller.js";
import { verfiToken } from "../middleware/verfiToken.js";




const router = express.Router();



router.get('/check-auth' ,verfiToken,checkAuth)
router.post('/signup' ,signup)
router.post('/login' ,login)
router.post('/logout' ,logout)
router.post('/verify-email',verifyemails)
router.post('/forget-password',forgetpassword)
router.post('/reset-password/:token',resetPassword)


export default router;