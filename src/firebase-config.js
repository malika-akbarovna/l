import { initializeApp } from "firebase/app";
import { getFirestore} from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDW-uZaKrxk0VvP1bwNlSi1Eb0hDTaip4Y",
  authDomain: "movies-4fb7d.firebaseapp.com",
  projectId: "movies-4fb7d",
  storageBucket: "movies-4fb7d.appspot.com",
  messagingSenderId: "621261622567",
  appId: "1:621261622567:web:3249ebc207d87e76592d02"
};

 const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app)