import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { collection, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { toast } from 'react-toastify'
import { Container } from 'postcss'
const AddAndUpdateContacts = ({isOpen, onClose, isUpdate, contact}) => {
  const [formData, setFormData] = useState({
      name: "",
      email: ""
  })
  const [errors, setErrors] = useState({})
  useEffect(() => {
    if (isUpdate && contact && isOpen) {
      setFormData({
        name: contact.name || "",
        email: contact.email || ""
      });
    }
  }, [isOpen, isUpdate, contact]);
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }
  
  const addContactToUser = async (contactId) => {
  //  const unsubscribe =  auth.onAuthStateChanged(async user => {
    let user = auth.currentUser
      if(!user) {
        console.log("No user is logged in")
        return
      }
      console.log("user fetched", user)
      try {
        const userRef = doc(db, "users", user.uid)
        await updateDoc(userRef, {
          contacts: arrayUnion(contactId)
        })
        console.log("Contact linked to user successfully");
      } catch (error) {
        console.error("Contact linking to user failed", error)
      }
    }
  // }
    // return () => unsubscribe
  // }
  const updateContact = async (contact) => {
    try {
      const contactRef = doc(db, "contacts", contact.id)
      await updateDoc(contactRef, formData)
      console.log("contact updated successfully")
      toast.success("Contact Updated Successfully")
      addContactToUser(contact.id)
    } catch (error) {
      console.error(error)
      toast.error("Error in Updating Contact")

    }
  }
  const addContact = async (contact) => {
    try {
      const contactsRef = collection(db, "contacts")
      const addedContact = await addDoc(contactsRef, contact)
      toast.success("Contact Added Successfully")
      addContactToUser(addedContact.id)
    } catch (error) {
      console.error(error)
      toast.error("Error in Adding Contact")
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("form data: ", formData)
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
             autoFocus
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
