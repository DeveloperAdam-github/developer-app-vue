import { defineStore } from 'pinia';

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    darkMode: JSON.parse(localStorage.getItem('darkMode')),
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {
    setDarkModeToggle() {
      this.darkMode = !this.darkMode;

      if (this.darkMode === true) {
        localStorage.setItem('darkMode', true);
      }

      if (this.darkMode === false) {
        localStorage.setItem('darkMode', false);
      }
    },
  },
});
