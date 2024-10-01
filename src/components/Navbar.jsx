import React from 'react'
import { auth } from '../config/firebase'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const user = auth.currentUser
  const handleLogout = async () => {
    try {
      await auth.signOut()
      console.log("User logged out successfully")
      toast.success("User Logout Successfull !")
      navigate("/login")
    } catch (error) {
      console.error("User logout failed")
      toast.error(error.message)
    }
  }
  return (
    <div className='flex justify-between items-center px-2
    w-[361px] h-[60px] bg-white mx-auto rounded-lg text-xl
    font-bold my-4'>
      <div className='flex '>
        <img src="/firebase.png" alt="" className='mr-2'/>
        Firebase Contact App
      </div>
      {user && <button onClick={handleLogout} className='text-sm bg-red-500
      px-1.5 py-1 rounded-lg text-white'>Logout</button>
      }
    </div>
  )
}

export default Navbar
