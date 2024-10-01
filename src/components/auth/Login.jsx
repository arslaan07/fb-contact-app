import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth } from '../../config/firebase'

const Login = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  const handleChange = e => {
    const { name, value } = e.target
    setLoginFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = loginFormData
    try {
      await signInWithEmailAndPassword(auth, email, password)
      const user = auth.currentUser
      console.log(user)
      if(!user) return
      console.log("User signed in succesfully")
      toast.success("User Login Successfull !")
      navigate("/")
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }
  return (
    <div className='w-[361px] min-h-[200px] mx-auto bg-white p-2
    rounded-md '>
        <h1 className='text-2xl font-medium text-center mb-2'>Login</h1>
      <form className='p-3' onSubmit={handleLogin}>
        <div className='flex flex-col'>
            <label htmlFor="email">Email</label>
            <input onChange={handleChange} name='email' type="email" id='email' placeholder='email' 
            className='border py-1 px-2 outline-none rounded-md shadow'/>
            <p className='h-[15px] text-red-600'></p>
        </div>
        <div className='flex flex-col'>
            <label htmlFor="password">Password</label>
            <input onChange={handleChange} name='password' type="password" id='password' placeholder='password'
             className='border py-1 px-2 outline-none rounded-md shadow'/>
            <p className='h-[15px] text-red-600'></p>
        </div>
        <input type="submit" value="Submit"
         className='bg-blue-500 text-white px-2 
         py-1 font-medium rounded-lg shadow mt-2 cursor-pointer' />
      </form>
      <div className='flex justify-end gap-2 text-sm font-medium'>
        <p className='text-zinc-500'>New user </p>
        <Link to="/register" className='text-blue-600'>Register Here</Link>
      </div>
      
    </div>
  )
}

export default Login
