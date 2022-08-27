import {
  updateProfile,
  getAuth,
  initializeAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { defineStore } from 'pinia';
import { db, auth, app, storage, provider } from '../firebase';
import {
  addDoc,
  collection,
  doc,
  setDoc,
  getFirestore,
} from 'firebase/firestore';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
} from 'firebase/storage';

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
    updateProfilePicture(imageUrl) {
      updateProfile(auth.currentUser, {
        photoURL: imageUrl,
      })
        .then(() => {
          this.user.imageUrl = imageUrl;
          console.log(this.user.imageUrl, 'IS THE DISPLAY IMAGE URL UPDATED🔥');
        })
        .catch((err) => {
          console.log(err);
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
      // if (Capacitor.isNativePlatform()) {
      //   const response = await GoogleAuth.signIn();
      //   console.log(response, 'the resposne if it wroks?');
      //   this.user = response;
      // } else {
      //   signInWithPopup(auth, provider).then((result) => {
      //     console.log(result);
      //     this.user = result.user;
      //     this.writeUserData(result.user);
      //   });
      // }
      // signInWithPopup(auth, provider)
      //   .then((result) => {
      //     console.log(result);
      //     this.user = result.user;
      //     this.writeUserData(result.user);
      //   })
      //   .catch((error) => {
      //     console.log(error, 'why google no work');
      //   });
      // DOESNT WORK???
      console.log('BEFORE BEFORE firebase google result???????');
      const result = await FirebaseAuthentication.signInWithGoogle();
      console.log(result, 'firebase google result???????');
      this.user = result.user;
      await this.writeUserData(result.user);
    },
    logout() {
      this.user = null;
      console.log(this.user, 'hello clicked');
    },
    async uploadPicture(image) {
      // console.log(image, 'whats image?');
      const user = auth.currentUser;
      const path = `uploads/${user.uid}/profile`;
      const storageRef = ref(storage, path);
      // console.log(user, ' the user');
      // console.log(path, 'the path?');
      // console.log(storageRef, 'the storage ref?');

      try {
        await uploadString(storageRef, image.base64String, 'base64');
        const imageUrl = await getDownloadURL(storageRef);
        const userDocRef = doc(db, `users/${user.uid}`);

        console.log(imageUrl, 'image Url');
        console.log(userDocRef, 'the user doc ref?');

        await setDoc(userDocRef, {
          imageUrl,
        });
        this.updateProfilePicture(imageUrl);
        return true;
      } catch (error) {
        console.log(error, 'errorrrrrr');
      }
    },
    clearErrorMessage() {
      console.log('clearing the error message');
      this.error = '';
    },
  },
});
