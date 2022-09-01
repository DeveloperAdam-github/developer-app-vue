import {
  updateProfile,
  getAuth,
  initializeAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithCredential,
  deleteUser,
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
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { useUserDataStore } from './userData';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null,
    loading: false,
    error: '',
    uniqueLink: '',
    heroImage: '',
    userData: ['heroImage'],
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
        photoUrl: imageUrl,
        imageUrl: imageUrl,
      })
        .then(() => {
          this.user.imageUrl = imageUrl;
          this.user.photoUrl = imageUrl;
          console.log(this.user.imageUrl, 'IS THE DISPLAY IMAGE URL UPDATED🔥');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async updateDisplayNameOnRegister(displayName) {
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
          const docRef = doc(db, `users/${userCredential.user.uid}`);
          setDoc(
            docRef,
            {
              displayName: displayName,
            },
            { merge: true }
          );
        })
        .catch((error) => {
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    },
    async signInWithEmailAndPassword(email, password) {
      const userDataStore = useUserDataStore();
      const result = await FirebaseAuthentication.signInWithEmailAndPassword({
        email,
        password,
      });
      this.user = result.user;
      this.uniqueLink = result.user.uid;
      await userDataStore.getAllUserData();
    },
    async signInWithGoogle() {
      if (Capacitor.isNativePlatform()) {
        const response = await GoogleAuth.signIn();
        console.log(response, 'the resposne if it wroks?');
        this.user = response;
      } else {
        const response = await GoogleAuth.signIn();
        this.user = response;
        console.log(response, 'the login google response');
      }
    },
    logout() {
      const userDataStore = useUserDataStore();
      this.user = null;
      console.log(this.user, 'hello clicked');
      userDataStore.resetData();
    },
    deleteAccount() {
      const user = auth.currentUser;
      deleteUser(user)
        .then(() => {
          console.log('account deleted?');
          this.user = null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async uploadPicture(image) {
      // console.log(image, 'whats image?');
      const user = auth.currentUser;
      const path = `uploads/${user.uid}/profile`;
      const storageRef = ref(storage, path);

      try {
        await uploadString(storageRef, image.base64String, 'base64');
        const imageUrl = await getDownloadURL(storageRef);
        const userDocRef = doc(db, `users/${user.uid}`);

        console.log(imageUrl, 'image Url');
        console.log(userDocRef, 'the user doc ref?');

        await setDoc(
          userDocRef,
          {
            imageUrl: imageUrl,
            photoUrl: imageUrl,
          },
          { merge: true }
        );

        console.log(userDocRef, 'should be an updated user doc?');

        this.updateProfilePicture(imageUrl);
        return true;
      } catch (error) {
        console.log(error, 'errorrrrrr');
      }
    },
    async uploadHeroPicture(image) {
      const user = auth.currentUser;
      const path = `uploads/${user.uid}/heroImage`;
      const storageRef = ref(storage, path);

      try {
        await uploadString(storageRef, image.base64String, 'base64');
        const imageUrl = await getDownloadURL(storageRef);
        const userDocRef = doc(db, `users/${user.uid}`);

        console.log(imageUrl, 'image Url');
        console.log(userDocRef, 'the user doc ref?');

        await setDoc(
          userDocRef,
          {
            heroImage: imageUrl,
          },
          { merge: true }
        );

        console.log(userDocRef, 'should be an updated user doc?');
        this.userData = imageUrl;
        console.log(this.userData.heroImage, 'IS THE HERO IMAGE URL UPDATED🔥');
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    clearErrorMessage() {
      console.log('clearing the error message');
      this.error = '';
    },
  },
});
