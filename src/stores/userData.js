import { defineStore } from 'pinia';
import { db, auth, app, storage, provider } from '../firebase';
import {
  addDoc,
  collection,
  doc,
  setDoc,
  getFirestore,
  getDoc,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
} from 'firebase/storage';

export const useUserDataStore = defineStore({
  id: 'userData',
  state: () => ({
    heroImage: '',
    headerLine: '',
    showModal: false,
  }),
  getters: {},
  actions: {
    async getAllUserData() {
      const user = auth.currentUser;
      const docRef = doc(db, `users/${user.uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        this.heroImage = docSnap.data().heroImage;
        this.headerLine = docSnap.data().headerLine;
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    },
    async uploadHeroPicture(image) {
      const user = auth.currentUser;
      const path = `uploads/${user.uid}/heroImage`;
      const storageRef = ref(storage, path);

      console.log(user, 'can we see the uid here???');

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
        this.heroImage = imageUrl;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadHeaderLine(headerLine) {
      console.log(headerLine, 'headerLine');
      const user = auth.currentUser;
      const userDocRef = doc(db, `users/${user.uid}`);

      await setDoc(
        userDocRef,
        {
          headerLine: headerLine,
        },
        { merge: true }
      );
      console.log('maybe this has worked?');
      this.headerLine = headerLine;
      this.showModal = false;
    },
  },
});
