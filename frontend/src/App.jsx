import { Children, useEffect, useState } from 'react'
import FloatingShaps from './components/FloatingShaps'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import EmailVerificationPage from './pages/EmailVerificationPage'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/useAuthStore'
import DashboardPage from './pages/DashboardPage'



//protect routes that require authentication
const ProtactedRoute = ({children}) =>{

  const {isAuthenticated ,user} = useAuthStore();
  
  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }
  if(!user.isVerified){
    return <Navigate to="/verify-email" repalce />
  }
  return children;

}





//redricted the authenticated users to gthe home page
const RedirectAuthentictedUsers = ({children}) =>{
      
  const {isAuthenticated ,user} = useAuthStore();

  if(isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />

  }
  return children;

}
 
function App() {

    const {checkAuth ,isCheckingAuth ,isAuthenticated ,user} = useAuthStore();
    useEffect(()=>{
        checkAuth()
    },[checkAuth])
  return (
    <>
      <div className='min-h-screen bg-linear-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
        <FloatingShaps color="bg-green-500" size="w-64 h-64" top='-5%' left='10%' delay={0} />
        <FloatingShaps color="bg-emerald-500" size="w-48 h-48" top='70%' left='80%' delay={5} />
        <FloatingShaps color="bg-lim-500" size="w-32 h-32" top='40%' left='-10%' delay={2} />
        <Routes>

           <Route  path='/' element={<ProtactedRoute><DashboardPage/></ProtactedRoute>} />
           <Route  path='/signup' element={<RedirectAuthentictedUsers><SignUpPage/></RedirectAuthentictedUsers>} />
           <Route  path='/login' element={<RedirectAuthentictedUsers><LoginPage/></RedirectAuthentictedUsers>} />
           <Route  path='/verify-email' element={<EmailVerificationPage/>} />

        </Routes>
        <Toaster/>
      </div>
    </>
  )
}

export default App
