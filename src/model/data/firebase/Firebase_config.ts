import { initializeApp } from "firebase/app";
import { FirebaseConfig } from "../../../interface/type";
import { getAnalytics } from "firebase/analytics";
import { collection, Firestore, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_API_FB_KEY || 'AIzaSyDl4-QqV8EU5PO34jMGrT0Q1u4t6QN7Dsw',
  authDomain: import.meta.env.VITE_AUTH_DOMAIN || 'senecahackathonregistration.firebaseapp.com',
  projectId: import.meta.env.VITE_PROJECT_ID || 'senecahackathonregistration',
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET || 'senecahackathonregistration.appspot.com',
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID || '17328393836',
  appId: import.meta.env.VITE_APP_ID || '1:17328393836:web:2e4dba9eea78cf90221249',
  measurementId: import.meta.env.VITE_MEASUREMENT_ID || 'G-5QWBY15E71',
};

const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const participantCollection = collection(db, "Participants");
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { db, participantCollection, analytics, auth };
