import React, { useState } from 'react'
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import AddAndUpdateContacts from './AddAndUpdateContacts';
import useDisclouse from '../hooks/useDisclouse';
import { toast } from 'react-toastify';
const ContactCard = ({c}) => {
  const { isOpen, onOpen, onClose } = useDisclouse()

  const deleteContact = async (id) => {
    try {
      const contactRef = doc(db, "contacts", id)
      await deleteDoc(contactRef)
      console.log("contact deleted successfully")
      toast.success("Contact Deleted Successfully")
    } catch (error) {
      console.log("error in deleting contact", error)
      toast.error("Error in Deleting Contact")
    }
  }
  return (
    <>
    <div className='bg-yellow w-[360px] h-[64px] mx-auto
            flex items-center rounded-lg justify-between p-2 mb-3'>
              <div className='flex items-center gap-1'>
              <HiOutlineUserCircle className='w-12 h-12 text-orange'/>
              <div>
                <h1 className='font-medium text-xl leading-5'>{c.name}</h1>
                <h2 className='font-medium text-sm'>{c.email}</h2>
              </div>
              </div>
              <div className='flex '>
              <RiEditCircleLine onClick={onOpen} className='w-8 h-8 mr-1 cursor-pointer'/>
              <IoMdTrash onClick={() => deleteContact(c.id)} className='w-8 h-8 text-purple cursor-pointer'/>
              </div>
            </div>
            <AddAndUpdateContacts 
            isUpdate 
            isOpen={isOpen}
             onClose={onClose}
             contact={c} />
            </>
  )
}

export default ContactCard
