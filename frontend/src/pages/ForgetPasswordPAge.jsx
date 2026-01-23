import React, { useState } from 'react'
import {motion} from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import Input from '../components/Input';
import { ArrowLeft, Loader, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgetPasswordPAge = () => {

    const [email ,setEmail] = useState("");
    const [isSubmitted , setisSubmitted] = useState(false);

    const {isLoading , forgetPaswword} = useAuthStore();

    const handleSubmite = async (e) =>{
        e.preventDefault();
		await forgetPaswword(email);
		setisSubmitted(true);
    }
  return (
   <motion.div
    initial={{opacity:0 , y:20}}
    animate={{opacity:1 , y:0}}
    transition={{duration:0.5}}
    className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl overflow-hidden'
   >
    <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-linear-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>Forget Password</h2>

        {!isSubmitted ? (
            <form onSubmit={handleSubmite}>
                <p className='text-gray-300 mb-6 text-center'>Enter your email address and we'll send you a link to reset your password</p>

                <Input
                 icon={Mail}
                 type='email'
                 placeholder='Email addresse'
                 value={email}
                 onChange={(e) =>setEmail(e.target.value)}
                 required
                />
                <motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
							type='submit'
						>
							{isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Send Reset Link"}
						</motion.button>

            </form>
        ) :(
            <div className='text-center'>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 500, damping: 30 }}
							className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'
						>
							<Mail className='h-8 w-8 text-white' />
						</motion.div>
						<p className='text-gray-300 mb-6'>
							If an account exists for {email}, you will receive a password reset link shortly.
						</p>
					</div>
        )}

    </div>
    <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex  justify-center'>
        <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<Link to={"/login"} className='text-sm text-green-400 hover:underline flex items-center'>
					<ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
				</Link>
			</div>

    </div>

   </motion.div>
  )
}

export default ForgetPasswordPAge
