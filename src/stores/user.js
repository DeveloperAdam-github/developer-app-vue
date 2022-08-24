import { updateProfile } from 'firebase/auth';
import { defineStore } from 'pinia';
import { db, auth } from '../firebase';
import {
  addDoc,
  collection,
  doc,
  setDoc,
  getFirestore,
} from 'firebase/firestore';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

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
    async writeUserData(data) {
      await setDoc(doc(db, 'uniqueLinks', data.email), {
        uniqueLink: data.email,
      });
    },
    async updateDisplayNameOnRegister(displayName) {
      updateProfile(auth.currentUser, {
        displayName: displayName,
      })
        .then(() => {
          console.log('is this working yet please say yes?');
          this.user.displayName = displayName;
          console.log(this.user, 'IS THE DISPLAY NAME UPDATED??!!🔥');
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
      await this.writeUserData(result.user);
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
      await this.writeUserData(result.user);
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
