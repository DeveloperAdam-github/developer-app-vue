// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { Capacitor } from '@capacitor/core';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBRDRhzyHbIE1XQv_woKGK6H2hu6ZtBt_M',
  authDomain: 'developerapp-a5743.firebaseapp.com',
  projectId: 'developerapp-a5743',
  storageBucket: 'developerapp-a5743.appspot.com',
  messagingSenderId: '89637228341',
  appId: '1:89637228341:web:1acd52904225ca7413067c',
  measurementId: 'G-WXNKD04G7B',
  databaseURL: 'https://developerapp-a5743.eur3.firebasedatabase.app',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const analytics = getAnalytics(app);
// const auth = getAuth();
const provider = new GoogleAuthProvider();

function whichAuth() {
  let auth;
  if (Capacitor.isNativePlatform()) {
    auth = initializeAuth(app, {
      persistence: indexedDBLocalPersistence,
    });
  } else {
    auth = getAuth(app);
  }
  return auth;
}

const auth = whichAuth();

export { provider, analytics, auth, db, app };
