import React, { useState } from 'react'
import Modal from './Modal'
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { toast } from 'react-toastify'
const AddAndUpdateContacts = ({isOpen, onClose, isUpdate, contact}) => {
  const [formData, setFormData] = useState(
    isUpdate ?
    {
      name: contact.name,
      email: contact.email
    } : 
    {
      name: "",
      email: ""
  })
  const [errors, setErrors] = useState({})
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }
  const updateContact = async (contact) => {
    try {
      const contactRef = doc(db, "contacts", contact.id)
      await updateDoc(contactRef, formData)
      console.log("contact updated successfully")
      toast.success("Contact Updated Successfully")
    } catch (error) {
      console.error(error)
      toast.success("Error in Updating Contact")

    }
  }
  const addContact = async (contact) => {
    try {
      const contactsRef = collection(db, "contacts")
      await addDoc(contactsRef, contact)
      console.log("contact added successfully")
      toast.success("Contact Added Successfully")
    } catch (error) {
      console.error(error)
      toast.success("Error in Adding Contact")

    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let errors = {}
    if(formData.name.trim() === '') {
      errors.name = 'Name is required'
    }
    if(formData.email.trim() === '') {
      errors.email = 'Email is required'
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    setErrors(errors)
    if(Object.keys(errors).length > 0) return 
    if(isUpdate) {
      updateContact(contact)
    } else {
      addContact(formData)
    }
    onClose()
    setFormData({
      name: "",
      email: ""
    })
  }
  return (
    <div>
      <Modal onClose={onClose} isOpen={isOpen}>
        <form onSubmit={handleSubmit}>
        <div className='m-2'>
        <div className="mb-1">
            <label htmlFor="name" className=''>Name</label>
            <input 
            type="text"
             name='name'
             onChange={handleChange}
             value={formData.name}
             className='h-10 w-80 border p-2' />
             <p className='text-red-500 h-[15px]'>{errors.name}</p>
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input
             type="email"
             name='email'
             onChange={handleChange}
             value={formData.email}
            className='h-10 w-80 border p-2' />
           <p className='text-red-500 h-[15px]'>{errors.email}</p>

        </div>
        <button className='bg-dark-yellow px-3 py-2 rounded-lg
        mt-3 float-right'>{isUpdate ? "Update Contact" : "Add Contact" }</button>
        </div>
        </form>   
      </Modal>
    </div>
  )
}

export default AddAndUpdateContacts
