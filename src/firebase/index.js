import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

const {
  VITE_FIREBASE_API_KEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_MESSAGING_SENDER_ID,
  VITE_APP_ID,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app); // Initialize Authentication and get a reference to the service
export const db = getFirestore(app); // Initialize Cloud Firestore and get a reference to the service

export const signInAnonymouslyWithFirebase = async () => {
  return await signInAnonymously(auth);
};

export const onAuthStateChangedListener = (listenerCallback) =>
  onAuthStateChanged(auth, listenerCallback);

export const readCollectionFromFirestore = async (dbName) => {
  return await getDocs(collection(db, dbName));
};

export const readCollectionFromFirestoreBasedOnId = async (dbName, id) => {
  return await getDoc(doc(db, dbName, id));
};

export const readNestedCollectionFromFirestore = (dbName, id, nestDbName) => {
  return collection(db, dbName, id, nestDbName);
};

export const createUserInformationInFireStore = async (
  dbName,
  uid,
  displayName,
  status
) => {
  return await setDoc(doc(db, dbName, uid), {
    name: displayName,
    status: status,
  });
};
