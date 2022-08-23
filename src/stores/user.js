import { signInWithPopup, getAuth, updateProfile } from 'firebase/auth';
import { defineStore } from 'pinia';
import { provider, app } from '../firebase';
import {
  addDoc,
  collection,
  doc,
  setDoc,
  getFirestore,
} from 'firebase/firestore';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
// import { getFirestore} from '@capacitor-firebase/app'
import { getDatabase, set, ref } from 'firebase/database';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null,
    loading: false,
    error: '',
    uniqueLink: '',
  }),
  getters: {},
  actions: {
    writeUserData(data) {
      const db = getFirestore(app);
      setDoc(
        doc,
        (db, 'uniqueLinks', data.uid),
        {
          uniqueLink: data.uid,
        },
        console.log('logging.....its done')
      );
    },
    async updateDisplayNameOnRegister(displayName) {
      const auth = getAuth();
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      })
        .then(() => {
          this.user.displayName = displayName;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async createUserWithEmailAndPassword(displayName, email, password) {
      const result = await FirebaseAuthentication.createUserWithEmailAndPassword(
        {
          displayName,
          email,
          password,
        }
      ).catch((err) => {
        console.log('error mate', err.code);
        this.error = err.code;
      });
      this.user = result.user;
      this.uniqueLink = result.user.uid;
      await this.updateDisplayNameOnRegister(displayName);
      this.writeUserData(this.user);
    },
    async signInWithEmailAndPassword(email, password) {
      const result = await FirebaseAuthentication.signInWithEmailAndPassword({
        email,
        password,
      });
      this.user = result.user;
      this.uniqueLink = result.user.uid;
    },
    async signInWithGoogle() {
      const result = await FirebaseAuthentication.signInWithGoogle();
      console.log(result);
      this.user = result.user;
      this.writeUserData(this.user);
    },
    logout() {
      this.user = null;
      console.log(this.user, 'hello clicked');
    },
    clearErrorMessage() {
      console.log('clearing the error message');
      this.error = '';
    },
  },
});
