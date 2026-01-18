import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const verfiToken = (req ,res ,next) =>{

    const token = req.cookies.jwt
    if(!token) return res.status(400).json({success:false , message : 'Unauthorized - no Token provided'})
    try {
     
        const decode = jwt.verify(token , process.env.JWT_SECRET);
        if(!decode) return res.status(400).json({success:false, message: 'Unauthorized - Invalid token'})

        req.userId = decode.userId
        next()
        
    } catch (error) {
        console.log("Error in verifyToken" ,error);
        return res.status(400).json({success:false  , message:'Server error'})
        
    }
}