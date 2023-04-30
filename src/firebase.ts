// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBE9NSyOpEers9wnIUyq3QPe2d5IybTjg8",
  authDomain: "bartermate-38ea0.firebaseapp.com",
  projectId: "bartermate-38ea0",
  storageBucket: "bartermate-38ea0.appspot.com",
  messagingSenderId: "366711616686",
  appId: "1:366711616686:web:a2509886864564c25b693f",
  measurementId: "G-575GMCERY2"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export default app; 