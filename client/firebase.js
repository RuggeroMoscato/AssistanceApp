import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAp9SOTl75Do6CBesKoF4xtTvOgjXjiTIo",
  authDomain: "assistanceapp-d20c3.firebaseapp.com",
  projectId: "assistanceapp-d20c3",
  storageBucket: "assistanceapp-d20c3.firebasestorage.app",
  messagingSenderId: "593471601463",
  appId: "1:593471601463:web:e90ae542b06473beb5b8b2",
  measurementId: "G-269BX9Z9L6"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
export const authInstance = getAuth(firebaseApp)