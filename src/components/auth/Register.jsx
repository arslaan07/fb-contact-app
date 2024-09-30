import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='w-[361px] min-h-[200px] mx-auto bg-white p-2
    rounded-md '>
        <h1 className='text-2xl font-medium text-center mb-2'>Register</h1>
      <form className='p-3'>
        <div className='flex flex-col'>
            <label htmlFor="name">Name</label>
            <input type="name" id='name' placeholder='name'
             className='border py-1 px-2 outline-none rounded-md shadow'/>
            <p className='h-[15px] text-red-600'></p>
        </div>
        <div className='flex flex-col'>
            <label htmlFor="email">Email</label>
            <input type="email" id='email' placeholder='email' 
            className='border py-1 px-2 outline-none rounded-md shadow'/>
            <p className='h-[15px] text-red-600'></p>
        </div>
        <div className='flex flex-col'>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' placeholder='password'
             className='border py-1 px-2 outline-none rounded-md shadow'/>
            <p className='h-[15px] text-red-600'></p>
        </div>
        <input type="submit" value="Submit"
         className='bg-blue-500 text-white px-2 
         py-1 font-medium rounded-lg shadow mt-2' />
      </form>
      <div className='flex justify-end gap-2 text-sm font-medium'>
        <p className='text-zinc-500'>Already registered </p>
        <Link to="/login" className='text-blue-600'>Login</Link>
      </div>
      
    </div>
  )
}

export default Register
