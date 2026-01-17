import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'


dotenv.config()
export const coonectionDb = async () =>{
  
     try{
       
        const conncte = await mongoose.connect(process.env.MONGO_DBURL)
        console.log('conection sucure hosting is : ' ,conncte.connection.host)
     }catch(error){
        console.error('Error connection :' ,error.message);
     }


}