import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {addDoc,collection,getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBXIpBXS1PN6ZV1ckm7ieRgMzarRwIgTGk",
  authDomain: "olx-clone-a7701.firebaseapp.com",
  projectId: "olx-clone-a7701",
  storageBucket: "olx-clone-a7701.appspot.com",
  messagingSenderId: "37688589661",
  appId: "1:37688589661:web:01864e260766d9884b7cb4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db=getFirestore(app);
const storage = getStorage(app)

export {auth,googleProvider,db,storage,addDoc,collection}