// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, getDocs, collection, addDoc, deleteDoc, updateDoc, doc} from 'firebase/firestore'
import { getAuth } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByXEuKdNAQqroPLwcS3gAyIKWU9aEVbs0",
  authDomain: "reservationsapp-cfc5a.firebaseapp.com",
  projectId: "reservationsapp-cfc5a",
  storageBucket: "reservationsapp-cfc5a.appspot.com",
  messagingSenderId: "505313937031",
  appId: "1:505313937031:web:62455c1957e42f14385a22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const db = getFirestore(app)
 export const authorisation = getAuth(app)
 export { db, getDocs, collection, addDoc, app, deleteDoc, updateDoc, doc };