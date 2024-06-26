// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
/* import { getAnalytics } from "firebase/analytics"; */
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlfQxAV01MKSUnffMtmq6bTksAcXSNuSA",
  authDomain: "generation-group-eshop.firebaseapp.com",
  projectId: "generation-group-eshop",
  storageBucket: "generation-group-eshop.appspot.com",
  messagingSenderId: "551318279692",
  appId: "1:551318279692:web:44d464660b5437ef994029",
  measurementId: "G-LWZBK7E1JY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getFirestore(app);
