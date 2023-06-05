// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection,addDoc,getDocs,doc,deleteDoc,updateDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNMCMh-mzvVddRc8yRPVFX0ee9q8HOBFQ",
  authDomain: "projectcrud1.firebaseapp.com",
  projectId: "projectcrud1",
  storageBucket: "projectcrud1.appspot.com",
  messagingSenderId: "884719878797",
  appId: "1:884719878797:web:ae702b72a387af7a2798c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app,db,getFirestore,collection,addDoc,getDocs,doc,deleteDoc,updateDoc};