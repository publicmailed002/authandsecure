import {create} from 'zustand';
import axios from 'axios';

const BAS_URL = 'http://localhost:3000/api/auth';
axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
     user:null,
     isAuthenticated: false,
     error:null,
     isLoading: false,
     isCheckingAuth: true,
     message: null,

     signup : async (email , password  , fullName) =>{
        set({isLoading:true ,error:null});
        try {

            const response = await axios.post(`${BAS_URL}/signup` , {email, password ,fullName});
            set({user:response.data.user ,isAuthenticated:true,isLoading:false})

            
        } catch (error) {

            set({error:error.response?.data?.message || 'Error singup' ,isLoading:false});
            throw error;
            
        }
     },
     login: async (email,password) =>{
       set({isLoading:true ,error:null});
       try {
           const response = await axios.post(`${BAS_URL}/login` ,{email,password});
           set({isAuthenticated:true,user:response.data.user ,error:null,isLoading:false})
       } catch (error) {
        set({error:error.response?.data?.message || "Error login" ,isLoading:false})
        throw error;
        
       }
     },
     logout: async () =>{
        set({isLoading:true,error:null})
         try {
             await axios.post(`${BAS_URL}/logout`);
             set({user:null ,isAuthenticated:false ,error:null ,isLoading:false});
         } catch (error) {
             set({error:'Error in logout' ,isLoading:false});
             throw error;
         }
     },
     verifyEmail : async (code) =>{

        set({isLoading:true,error:null});
        try {
            const response = await axios.post(`${BAS_URL}/verify-email`,{code})
            set({user:response.data.user , isAuthenticated:true,isLoading:false})
            return response.data;
        } catch (error) {
            set({error:error.response?.data?.message || 'Error verify email' ,isLoading:false});
            throw error;
            
        }

     },
     checkAuth : async () =>{
        set({isCheckingAuth:true ,error:null});
        try {
            const response = await axios.get(`${BAS_URL}/check-auth`)
            set({user:response.data.user ,isAuthenticated:true ,isCheckingAuth:false})
            
        } catch (error) {
            set({error:null , isCheckingAuth:false ,isAuthenticated:false})
            
        }

     },
     forgetPaswword :async (email)=>{
        set({isLoading:true ,error:null ,message:null})
        try {
            const  response = await axios.post(`${BAS_URL}/forget-password`,{email})
            set({message:response.data.message ,isLoading:false})
        } catch (error) {
            set({
                isLoading:false,
                error:error.response?.data?.message || 'Error sending reset password email'
            })
            throw error;
            
        }

     },
     resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${BAS_URL}/reset-password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
		}
	},
     
}));