import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC_THLl0JAKonJM5eRNyXg-FtDdM-eZcfs",
  authDomain: "quiz-devi.firebaseapp.com",
  projectId: "quiz-devi",
  storageBucket: "quiz-devi.appspot.com",
  messagingSenderId: "528811926728",
  appId: "1:528811926728:web:7b702c1b1611b58cfa31fd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {
  db,
}