import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Searchbar from './components/Searchbar'
import ContactCard from './components/ContactCard';
import AddAndUpdateContacts from './components/AddAndUpdateContacts';
import NotFound from './components/NotFound';
import { onSnapshot, collection, getDocs } from 'firebase/firestore'
import { db } from './config/firebase'
import useDisclouse from './hooks/useDisclouse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';


const App = () => {
  const [contacts, setContacts] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const { isOpen, onOpen, onClose } = useDisclouse()
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts")
        onSnapshot(contactsRef, (snapshot) => {
          const contactsList = snapshot.docs.map(contact => ({
            ...contact.data(),
            id: contact.id
          }))
          setContacts(contactsList)
          setFilteredContacts(contactsList)
        }) 
      } catch (error) {
        console.log("eror fetching contacts", error)
      }
    }
    getContacts()
  }, [])
  
  const handleSearch = (e) => {
    const filtered = contacts.filter(c => 
      c.name.toLowerCase().includes(e.target.value.toLowerCase()))
      setFilteredContacts(filtered)
  }
  return (
    <>
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<>
          <Searchbar onOpen={onOpen} handleSearch={handleSearch}/>
        <div className='mt-4'>
        {
          filteredContacts.length > 0 ? ( filteredContacts.map(c => (
            <ContactCard key={c.id} c={c}
             onOpen={onOpen} isOpen={isOpen} />
          ))) : <NotFound />
        }
        </div>
        <AddAndUpdateContacts isOpen={isOpen} onClose={onClose}/>
        </>}/>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        </Routes>
    </div>
    <ToastContainer position='bottom-center' />
    </>
    
  ) 
}

export default App
