// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection,addDoc,getDocs,doc,deleteDoc,updateDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCive-iBl0SAzjdX0cfawoJfUbaV9JzEnQ",
  authDomain: "ikawbahala-69ee3.firebaseapp.com",
  projectId: "ikawbahala-69ee3",
  storageBucket: "ikawbahala-69ee3.appspot.com",
  messagingSenderId: "915861592997",
  appId: "1:915861592997:web:97dd3a5f33b4c73f0d264c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app,db,getFirestore,collection,addDoc,getDocs,doc,deleteDoc,updateDoc};