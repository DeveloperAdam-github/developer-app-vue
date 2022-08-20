import { signInWithPopup } from 'firebase/auth';
import { defineStore } from 'pinia';
import { auth, provider } from '../firebase';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null,
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {
    signInWithGoogle() {
      signInWithPopup(auth, provider).then((result) => {
        console.log(result);
        this.user = result.user;
      });
    },
  },
});
