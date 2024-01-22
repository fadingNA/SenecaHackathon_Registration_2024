import { initializeApp } from 'firebase/app';
import { FirebaseConfig } from '../../../interface/type';
import { getAnalytics } from 'firebase/analytics';
import { collection, Firestore, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig: FirebaseConfig = {
  apiKey: 'AIzaSyDl4-QqV8EU5PO34jMGrT0Q1u4t6QN7Dsw',
  authDomain: 'senecahackathonregistration.firebaseapp.com',
  projectId: 'senecahackathonregistration',
  storageBucket: 'senecahackathonregistration.appspot.com',
  messagingSenderId: '17328393836',
  appId: '1:17328393836:web:2e4dba9eea78cf90221249',
  measurementId: 'G-5QWBY15E71',
};

const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const participantCollection = collection(db, 'Participants');
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { db, participantCollection, analytics, auth };
