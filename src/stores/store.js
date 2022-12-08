import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => {
    return {
      isLoggedIn: false,
      isLoading: false,
      user: [],
      notification: null,
    };
  },
  getters: {},
  actions: {},
});
