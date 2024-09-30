import React from 'react'
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";

const Searchbar = ({onOpen, handleSearch}) => {
  
  return (
    <div className='flex items-center relative w-[361px] mx-auto'>
        <FiSearch
        className='w-6 h-6 absolute left-2 text-white'/>
        <input onChange={(e) => handleSearch(e)} type="text" className='text-white flex-grow rounded-md 
        pl-9 bg-transparent border-white border h-10
        outline-none' placeholder='Search Contact'/>
        <AiFillPlusCircle onClick={onOpen} className='w-14 h-14 text-white ml-2 cursor-pointer'/>
    </div>
  )
}

export default Searchbar
