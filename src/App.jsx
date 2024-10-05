import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import ContactCard from './components/ContactCard';
import AddAndUpdateContacts from './components/AddAndUpdateContacts';
import NotFound from './components/NotFound';
import { onSnapshot, collection, doc, getDoc } from 'firebase/firestore';
import { auth, db } from './config/firebase';
import useDisclouse from './hooks/useDisclouse';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PathNotFound from './components/PathNotFound';
import { getAdditionalUserInfo } from 'firebase/auth';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclouse();
  const [user, setUser] = useState()

  useEffect(() => {
    const getContacts = async () => {
      try {
        auth.onAuthStateChanged(async (user) => {
          if (!user) {
            console.log("No user logged in");
            return;
          }
          console.log("User is logged in", user.uid);

          // Listen for real-time changes on the user document
          const userRef = doc(db, "users", user.uid);
          onSnapshot(userRef, (docSnap) => {
            const userData = docSnap.data();
            const contactIds = userData.contacts || [];
            console.log("Fetched contact IDs:", contactIds);

            // Fetch the contacts in real-time
            const contactsRef = collection(db, "contacts");
            onSnapshot(contactsRef, (snapshot) => {
              const contactsList = snapshot.docs.map(contact => ({
                ...contact.data(),
                id: contact.id
              }));
              const userContacts = contactsList.filter(contact => contactIds.includes(contact.id));
              userContacts.sort(function(a, b) {
                return a.name.localeCompare(b.name)
              })
              console.log("User contacts:", userContacts);
              setContacts(userContacts);
              setFilteredContacts(userContacts);
            });
          });
          let token = await user.getIdToken(true)
          document.cookie = `token=${token}; path=/`
          
        });

      } catch (error) {
        console.log("Error fetching contacts", error);
      }
    };

    getContacts();
  }, []);

  const handleSearch = (e) => {
    const filtered = contacts.filter(c => 
      c.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredContacts(filtered);
  };
  useEffect(() => {
    const handleStorageChange = e => {
      if(e.key === "isLoggedOut" && e.newValue === "true") {
        console.log("Detect logout from another tab")
        auth.signOut()
      }
    }
    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user)  // This will set user to null when logged out
    })
    
    // Cleanup function to unsubscribe when component unmounts
    return () => unsubscribe()
  }, []) // Empty dependency array

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path='/contacts' element={!user? <Navigate to="/" /> :<>
            <Searchbar onOpen={onOpen} handleSearch={handleSearch} />
            <div className='mt-4'>
              {filteredContacts.length > 0 ? (
                filteredContacts.map(c => (
                  <ContactCard key={c.id} c={c}
                    onOpen={onOpen} isOpen={isOpen} />
                ))
              ) : <NotFound />}
            </div>
            <AddAndUpdateContacts isOpen={isOpen} onClose={onClose} />
          </>} /> 
          <Route path='/register' element={user? <Navigate to="/contacts" /> : <Register />} />
          <Route path='/' 
          element={user? <Navigate to="/contacts" /> : <Login />} />
          <Route path='*' element={<PathNotFound />} />
        </Routes>
        
      </div>
      <ToastContainer position='bottom-center' />
    </>
  );
};

export default App;
