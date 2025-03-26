// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfLh5lHUUs5E9jlDyBZgA8iQ5xrRntC0M",
  authDomain: "wagewise-94eb0.firebaseapp.com",
  projectId: "wagewise-94eb0",
  storageBucket: "wagewise-94eb0.firebasestorage.app",
  messagingSenderId: "573466807828",
  appId: "1:573466807828:web:60c655609701c646b6e101"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
