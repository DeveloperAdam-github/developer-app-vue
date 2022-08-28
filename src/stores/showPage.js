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

export const useShowPageStore = defineStore({
  id: 'showPage',
  state: () => ({
    isLoading: true,
    imageUrl: '',
    photoUrl: '',
    heroImage: '',
    headerLine: '',
    displayName: '',
    pills: [],
    socials: [],
    projects: [],
    showModal: false,
  }),
  getters: {},
  actions: {
    async getAllUserData(uid) {
      const docRef = doc(db, `users/${uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        this.heroImage = docSnap.data().heroImage;
        this.headerLine = docSnap.data().headerLine;
        this.imageUrl = docSnap.data().imageUrl;
        this.photoUrl = docSnap.data().photoUrl;
        this.displayName = docSnap.data().displayName;
        if (docSnap.data().pills) {
          this.pills = docSnap.data().pills;
        }
        if (docSnap.data().socials) {
          this.socials = docSnap.data().socials;
        }
        if (docSnap.data().projects) {
          this.projects = docSnap.data().projects;
        }
        this.isLoading = false;

        console.log(this.isLoading, 'why this no update?');
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    },
  },
});
