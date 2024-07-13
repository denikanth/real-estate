// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-5e361.firebaseapp.com",
  projectId: "mern-estate-5e361",
  storageBucket: "mern-estate-5e361.appspot.com",
  messagingSenderId: "660496136974",
  appId: "1:660496136974:web:862b0d5ffd35ca1ae8b55f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);