const REACT_APP_API_KEY="AIzaSyCORaLFYEvY0IDgv4uZgg51MFsurrOcXZw"
const REACT_APP_AUTH_DOMAIN="svelt-crud-ac125.firebaseapp.com"
const REACT_APP_PROJECT_ID= "svelt-crud-ac125"
const REACT_APP_STORAGE_BUCKET="svelt-crud-ac125.appspot.com"
const REACT_APP_MESSAGING_SENDER_ID="480820209874"
const REACT_APP_APP_ID= "1:480820209874:web:099955ba0ab21022eaa50b"

// Import the functions you need from the SDKs you need
import { initializeApp }  from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { v4 } from 'uuid'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Acciones de firebase
export const db = getFirestore(app)
export const storage = getStorage(app)

export async function uploadFile(file){
 const storageRef = ref(storage, v4())
 await uploadBytes(storageRef, file)
 const url = await getDownloadURL(storageRef)
 return url
}

