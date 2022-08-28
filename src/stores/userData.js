import { defineStore } from 'pinia';
import { db, auth, app, storage, provider } from '../firebase';
import {
  addDoc,
  collection,
  doc,
  setDoc,
  getFirestore,
  getDoc,
  arrayUnion,
  updateDoc,
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
    email: '',
    showModal: false,
    pills: [],
    socials: [],
    projects: [],
  }),
  getters: {},
  actions: {
    async getAllUserData() {
      const user = auth.currentUser;
      const docRef = doc(db, `users/${user.uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log('Document data:', docSnap.data());
        this.heroImage = docSnap.data().heroImage;
        this.headerLine = docSnap.data().headerLine;
        this.email = docSnap.data().email;
        if (docSnap.data().pills) {
          this.pills = docSnap.data().pills;
        }
        if (docSnap.data().socials) {
          this.socials = docSnap.data().socials;
        }
        if (docSnap.data().projects) {
          this.projects = docSnap.data().projects;
        }
      } else {
        // doc.data() will be undefined in this case
        // console.log('No such document!');
      }
    },
    async uploadHeroPicture(image) {
      const user = auth.currentUser;
      const path = `uploads/${user.uid}/heroImage`;
      const storageRef = ref(storage, path);

      // console.log(user, 'can we see the uid here???');

      try {
        await uploadString(storageRef, image.base64String, 'base64');
        const imageUrl = await getDownloadURL(storageRef);
        const userDocRef = doc(db, `users/${user.uid}`);

        // console.log(imageUrl, 'image Url');
        // console.log(userDocRef, 'the user doc ref?');

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
    async uploadEmail(email) {
      console.log(email, 'email');
      const user = auth.currentUser;
      const userDocRef = doc(db, `users/${user.uid}`);

      await setDoc(
        userDocRef,
        {
          email: email,
        },
        { merge: true }
      );
      console.log('maybe this has worked?');
      this.email = email;
      this.showModal = false;
    },
    async uploadPill(pill) {
      console.log(pill, 'email');
      const user = auth.currentUser;
      const userDocRef = doc(db, `users/${user.uid}`);

      await setDoc(
        userDocRef,
        {
          pills: arrayUnion(pill),
        },
        { merge: true }
      );
      console.log('maybe this has worked?');
      this.pills.push(pill);
      this.showModal = false;
    },
    async uploadSocial(social, platform) {
      console.log(social, 'email');
      const user = auth.currentUser;
      const userDocRef = doc(db, `users/${user.uid}`);

      await setDoc(
        userDocRef,
        {
          socials: arrayUnion({
            link: social,
            platform: platform,
          }),
        },
        { merge: true }
      );
      console.log('maybe this has worked?');
      this.socials.push({ link: social, platform: platform });
      this.showModal = false;
    },
    async uploadProject(projectName, link, description, image) {
      const user = auth.currentUser;
      const path = `uploads/${user.uid}/project/${projectName}`;
      const storageRef = ref(storage, path);

      console.log(
        projectName,
        'the project name?',
        link,
        'the link',
        description,
        'the desc',
        image,
        'the image?'
      );

      try {
        await uploadString(storageRef, image.base64String, 'base64');
        const imageUrl = await getDownloadURL(storageRef);
        const userDocRef = doc(db, `users/${user.uid}`);

        console.log(imageUrl, 'image Url');
        console.log(userDocRef, 'the user doc ref?');

        await setDoc(
          userDocRef,
          {
            projects: arrayUnion({
              projectName: projectName,
              link: link,
              description: description,
              imageUrl: imageUrl,
            }),
          },
          { merge: true }
        );
        console.log('maybe this has worked?');
        this.projects.push({
          projectName: projectName,
          link: link,
          description: description,
          imageUrl: imageUrl,
        });
        this.showModal = false;
        return true;
      } catch (error) {
        console.log(error, 'errorrrrrr');
      }
    },
    toggleModalView(value) {
      console.log(value, 'lol');
      this.showModal = value;
    },
    resetData() {
      this.heroImage = null;
      this.headerLine = null;
      this.showModal = false;
    },
  },
});
