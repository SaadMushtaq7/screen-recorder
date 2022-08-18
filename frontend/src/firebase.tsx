// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEC7PZg_yBEMdEbS49ziCsNKUl0CGSXrc",
  authDomain: "record-and-post.firebaseapp.com",
  projectId: "record-and-post",
  storageBucket: "record-and-post.appspot.com",
  messagingSenderId: "52475178499",
  appId: "1:52475178499:web:3afa7020bdbe26b05ea836",
  measurementId: "G-LBR28ZVFE9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
