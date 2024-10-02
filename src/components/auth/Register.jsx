import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { Children, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../../config/firebase'
import { setDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'

const Register = () => {
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  const handleChange = e => {
    const { name, value } = e.target
    setRegisterFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }
  const handleRegister = async (e) => {
    e.preventDefault()
    const { email, name, password } = registerFormData
    try {
     await createUserWithEmailAndPassword(auth, email, password)
     const user = auth.currentUser
     console.log(user)
     console.log("User Registered Successfully")
     const userData = {
      name: name,
      email: user.email
     }
     if(!user) return
      const userRef = doc(db, "users", user.uid)
      await setDoc(userRef, userData)
     toast.success("User Registration Successfull !")
     navigate("/login")
    } catch (error) {
      console.error("Error registering the user", error)
      toast.error(error.message)
    }
  }
  return (
    <div className='w-[361px] min-h-[200px] mx-auto bg-white p-2
    rounded-md '>
        <h1 className='text-2xl font-medium text-center mb-2'>Register</h1>
      <form className='p-3' onSubmit={handleRegister}>
        <div className='flex flex-col'>
            <label htmlFor="name">Name</label>
            <input onChange={handleChange} name='name' type="name" id='name' placeholder='name'
             className='border py-1 px-2 outline-none rounded-md shadow'/>
            <p className='h-[15px] text-red-600'></p>
        </div>
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
        <p className='text-zinc-500'>Already registered </p>
        <Link to="/" className='text-blue-600'>Login</Link>
      </div>
      
    </div>
  )
}

export default Register
