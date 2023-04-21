// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAf-Mojr9PpqBkVv42t4phnNxg3O4MH3dY",
    authDomain: "formulario-restaurante.firebaseapp.com",
    projectId: "formulario-restaurante",
    storageBucket: "formulario-restaurante.appspot.com",
    messagingSenderId: "486346780018",
    appId: "1:486346780018:web:2ade0e04eb900e543bc1eb"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
