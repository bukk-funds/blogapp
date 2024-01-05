// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVb_6CnXzPTtngocm-AOsKAaDIMxALTCM",
  authDomain: "blog-app-ea8ab.firebaseapp.com",
  projectId: "blog-app-ea8ab",
  storageBucket: "blog-app-ea8ab.appspot.com",
  messagingSenderId: "1010088015783",
  appId: "1:1010088015783:web:b836d9a13dca1b89046882",
  measurementId: "G-3G0H6LLF9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
//export const storage = getStorage(app);