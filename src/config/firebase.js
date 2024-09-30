// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnOFmcGIIRneRMjO7Z1RbO2Di-ESX21_0",
  authDomain: "contacts-app-f9822.firebaseapp.com",
  projectId: "contacts-app-f9822",
  storageBucket: "contacts-app-f9822.appspot.com",
  messagingSenderId: "609974596936",
  appId: "1:609974596936:web:c567ed147cdc7512636f7d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)