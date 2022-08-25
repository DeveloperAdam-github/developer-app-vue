import {
  updateProfile,
  getAuth,
  initializeAuth,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { defineStore } from 'pinia';
import { db, auth, app } from '../firebase';
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
        uniqueLink: data.uid,
      });
    },
    async updateDisplayNameOnRegister(displayName) {
      const currentUser = await FirebaseAuthentication.getCurrentUser();
      // const currentUserToken = await FirebaseAuthentication.getIdToken();
      // console.log(currentUser, 'the current user');
      // console.log(currentUserToken, 'the current user token?');

      console.log(auth.currentUser, '<<<<<<<< will this show now?');

      await updateProfile(auth.currentUser, {
        displayName: displayName,
      })
        .then(() => {
          this.user.displayName = displayName;
          console.log(
            this.user.displayName,
            'IS THE DISPLAY NAME UPDATED??!!🔥'
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createUserWithEmailAndPasswordFn(displayName, email, password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          this.user = userCredential.user;
          console.log(userCredential, 'does this work???');
          this.writeUserData(userCredential.user.uid);
          this.updateDisplayNameOnRegister(displayName);
        })
        .catch((error) => {
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    },
    // async createUserWithEmailAndPassword(displayName, email, password) {
    //   const result = await FirebaseAuthentication.createUserWithEmailAndPassword(
    //     {
    //       email,
    //       password,
    //     }
    //   ).catch((err) => {
    //     console.log('error mate', err.code);
    //     this.error = err.code;
    //   });
    //   this.user = result.user;
    //   this.uniqueLink = result.user.uid;
    //   await this.writeUserData(result.user);
    //   await this.updateDisplayNameOnRegister(displayName);
    // },
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
