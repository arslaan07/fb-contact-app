import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
const Modal = ({children, onClose, isOpen}) => {
  return (
    <>
    {isOpen && 
    <>
    <div className='py-3 px-2 min-h-[240px] w-[348px] bg-white fixed top-1/2
    left-1/2 -translate-x-[50%] -translate-y-[50%] z-50 rounded-lg'>
      <AiOutlineClose onClick={onClose}  className=' text-2xl cursor-pointer float-right'/>

       {children} 
    </div>
    <div className='backdrop-blur h-screen w-screen top-0 
    absolute z-40'></div>
    </>
    }
    </>
  )
}

export default Modal
