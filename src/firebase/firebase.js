import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCz6xUDdcVsRDwQVKmpUnkGTHc8hi3SYQ8",
  authDomain: "pruebatecnica2-ae99d.firebaseapp.com",
  projectId: "pruebatecnica2-ae99d",
  storageBucket: "pruebatecnica2-ae99d.appspot.com",
  messagingSenderId: "847765308403",
  appId: "1:847765308403:web:efb1b117d9287b0d4b4886"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db