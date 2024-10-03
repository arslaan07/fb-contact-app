import React from 'react'
import { Link } from 'react-router-dom'
import { MdArrowBack } from "react-icons/md";
const PathNotFound = () => {
  return (
    <div className='w-[361px]  mx-auto bg-white p-2
    rounded-md flex flex-col justify-center items-center '>
      <h1 className='text-2xl font-medium'>404, Not Found !</h1>
      <div className='flex text-xl mt-2'>
        <MdArrowBack className='self-center mr-0.5 ' />
        <Link to={"/"} className="font-medium">Go Back</Link>
      </div>
      
    </div>
  )
}

export default PathNotFound
