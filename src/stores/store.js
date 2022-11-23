import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => {
    return {
      isLoggedIn: false,
      user: [],
    };
  },
  getters: {},
  actions: {},
});
