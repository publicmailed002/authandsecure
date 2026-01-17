import { User } from "../model/user.model.js"
import bcrypt from 'bcryptjs'
import crypto from "crypto"
import dotenv from 'dotenv'
import { generateTokenandSetCookie } from "../utils/generateTokenandSetCookie.js"
import { sendPasswordResetEmail, sendVerificationEmail, sendWelecomEmails } from "../mailtrap/emails.js"

dotenv.config()

export const signup = async (req ,res)=>{
      const {email  , password , fullName} = req.body
      try{

          if(!email || !password || ! fullName){
               throw new Error('All Filed required')
          }

          const userAlreadyExiscte = await User.findOne({email});
          
          if(userAlreadyExiscte){
               return res.status(400).json({success:false , message : "User already exists"})
          }

          const hashedpassword = await bcrypt.hash(password ,10);
          const verificationToken = Math.floor(100000 + Math.random() *900000).toString()
          const user = new User({
               email,
               password:hashedpassword,
               fullName,
               verificationToken,
               verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 , // 24 hours

          })
          const savedUser = await user.save()

          //jwt 
           generateTokenandSetCookie(res,user._id);
           await sendVerificationEmail(user.email,verificationToken)

           res.status(201).json({
               success:true,
               message : "User create successfully",
               user:{
                    ...user._doc,
                    password:undefined
               }
           })

      }catch(error){

          res.status(400).json({success :false , message : error.message})

      }
}

export const verifyemails = async (req,res)=>{
    const {code} = req.body;

    try {
     const user = await User.findOne({
          verificationToken: code,
          verificationTokenExpiresAt:{$gt:Date.now()}
     })

     if(!user){

          return res.status(400).json({success:false , message : "Invalide or expired Verification code"})

     }

     user.isVerified = true;
     user.verificationToken = undefined;
     user.verificationTokenExpiresAt = undefined;

     await user.save();

     await sendWelecomEmails(user.email , user.fullName);

     res.status(201).json({
          success:true,
          message: 'Email verify successfully',
          user:{
               ...user._doc,
               password:undefined
          }
     })
      
    } catch (error) {
       
       console.log('error in verifyEmail' ,error);
       res.status(500).json({success:false,message : "Server Error"});
     
    }
}

export const login = async (req ,res)=>{

     const {email , password} = req.body;
     
     try {
          const user = await User.findOne({email});
          // responsive on the emails validation
          if(!user){
               return res.status(400).json({success:false , message : "Invalid Credentials"});
          }

          const isPasswordValid = await bcrypt.compare(password , user.password);
             // responsive on passowrd validation
          if(!isPasswordValid){
               return res.status(400).json({success:false , message:'Invalid Credentials'})
          }

          generateTokenandSetCookie(res ,user._id);

          user.lastLogin = new Date();
          await user.save();

          res.status(200).json({
               success:true,
               message:'Logged in successfully',
               user:{
                    ...user._doc,
                    password:undefined
               }
          })
     } catch (error) {
          console.log('Error in login' ,error)
          res.status(400).json({success:false  , message:error.message})
          
     }

}

export const logout = async (req ,res)=>{
     res.clearCookie('jwt');
     res.status(200).json({success:true , message : "Logged out successfully"})
}

export const forgetpassword = async (req ,res) =>{
    const { email } = req.body;

     try {
          
          const user = await User.findOne({ email });
          if(!user){
               return res.status(400).json({success:false , message : 'Invalid Credentials'})
          }

          const resetToken = crypto.randomBytes(20).toString('hex')
          const resetTokenExpriseAt = Date.now() + 1 *60 *60 *1000; //1h
          user.resetPasswordToken = resetToken;
          user.resetPasswordExpirestAt = resetTokenExpriseAt;

          await user.save();
          //send email reset
          await sendPasswordResetEmail(user.email , `${process.env.CLIENT_URL}/reset-password/${resetToken}`)

          res.status(200).json({success:true ,message : 'Password reset link sent to your email'})
     } catch (error) {
          console.log('Error in forgetpassword' ,error);
          res.status(400).json({success:false , message:error.message})
          
     }
}


