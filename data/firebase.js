import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite"; // Importing getFirestore from Firebase

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-IGp4EPlpaun1BUXQPU8NUXYcdnlEkJQ",
  authDomain: "woodzone-12dca.firebaseapp.com",
  projectId: "woodzone-12dca",
  storageBucket: "woodzone-12dca.appspot.com",
  messagingSenderId: "931912621570",
  appId: "1:931912621570:web:f33ad5fc20d8109397d11b",
  measurementId: "G-3J3D4H6KXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Accessing Firestore using getFirestore

export default db;
