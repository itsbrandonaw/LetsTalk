// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh_8AFrM0-hVKLr9h2iHMVLs5ib9YiJzQ",
  authDomain: "orbitalauthenticate.firebaseapp.com",
  projectId: "orbitalauthenticate",
  storageBucket: "orbitalauthenticate.appspot.com",
  messagingSenderId: "914776419036",
  appId: "1:914776419036:web:252a9964a1213a0fd82219",
  measurementId: "G-R4XWWZP409"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const authentication = getAuth(app);
export const database = getFirestore(app);