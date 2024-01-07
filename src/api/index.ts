// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA7_D5ahpfBhTbnIjyPup7ZF2mm588hJ4k',
  authDomain: 'it-scks-suggestions.firebaseapp.com',
  projectId: 'it-scks-suggestions',
  storageBucket: 'it-scks-suggestions.appspot.com',
  messagingSenderId: '852678836092',
  appId: '1:852678836092:web:938fbcf7d5e30d2d94aef9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
