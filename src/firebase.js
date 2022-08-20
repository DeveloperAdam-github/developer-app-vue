// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
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
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
// const storage = firebase.storage();
const provider = new GoogleAuthProvider();

export { provider, analytics, auth };
