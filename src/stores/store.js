import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => {
    return {
      isLoggedIn: false,
      isLoading: false,
      registerDetails: {
        username: "",
        email: "",
        password: "",
      },
      loginDetails: {
        email: "",
        password: "",
      },
      userDetails: {},
      token: null,
      notification: null,
      hasError: true,
      anonymousMessage: "",
    };
  },
  getters: {},
  actions: {},
});
