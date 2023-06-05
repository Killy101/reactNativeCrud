// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection,addDoc,getDocs,doc,deleteDoc,updateDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1V7YlTbO39LmJaEYxU7jxTF3hG3qDEm8",
  authDomain: "tarungaselect.firebaseapp.com",
  projectId: "tarungaselect",
  storageBucket: "tarungaselect.appspot.com",
  messagingSenderId: "61989142849",
  appId: "1:61989142849:web:69aede6d3ce552a5c4a1c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app,db,getFirestore,collection,addDoc,getDocs,doc,deleteDoc,updateDoc};