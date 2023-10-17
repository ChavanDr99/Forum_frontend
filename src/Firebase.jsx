// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTEnVV57wTNXQ0vM_LnEaBNRfL16tWmIA",
  authDomain: "forum1-85408.firebaseapp.com",
  projectId: "forum1-85408",
  storageBucket: "forum1-85408.appspot.com",
  messagingSenderId: "1005283359225",
  appId: "1:1005283359225:web:2be8df8287035c93fe6528",
  measurementId: "G-DVC30LQSBF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
