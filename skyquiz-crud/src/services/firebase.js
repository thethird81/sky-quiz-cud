// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6TxUR7XtBxGsMOgf_q_DgvoW57xvXTYg",
  authDomain: "skyquiz-60d28.firebaseapp.com",
  projectId: "skyquiz-60d28",
  storageBucket: "skyquiz-60d28.appspot.com",
  messagingSenderId: "168999506599",
  appId: "1:168999506599:web:4003694bf59292ab458182",
  measurementId: "G-15XWVFSTL2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };