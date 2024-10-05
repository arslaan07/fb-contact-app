import { getAdditionalUserInfo, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, db } from '../../config/firebase'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const SignInWithGoogle = () => {
    const navigate = useNavigate()
    const googleLogin = async () => {
        const provider = new GoogleAuthProvider
        signInWithPopup(auth, provider)
        .then(async (result) => {
            if(result) {
                console.log("User sign in successfull")
                toast.success("User Sign in Successfull !")
                const { displayName, email, uid } = result.user
                const userData = {
                    name: displayName,
                    email
                }
                const userRef = doc(db, "users", uid)
                const userDoc = await getDoc(userRef)
                if(!userDoc.exists()) {
                  await setDoc(userRef, userData)
                  console.log("New user document created")
                } else {
                  console.log("User document already exists")
                }
                
                navigate("/contacts")
            }
        })
        .catch((error) => {
            console.error(error)
            toast.error(error.message)
        })
    }
  return (
    <div>
      <div className='flex flex-col justify-center items-center mt-4'>
        <hr className='w-[70%] text-zinc-300 mb-1' />
        <h5 className='text-sm text-zinc-500 mb-1'>or you can sign in with</h5>
        <div className='max-w-[60%]'><img className='cursor-pointer'
        onClick={googleLogin}
        src="../../google.png" alt="" /></div>
      </div>
    </div>
  )
}

export default SignInWithGoogle
