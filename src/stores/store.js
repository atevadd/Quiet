import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";

export const useStore = defineStore("store", {
  state: () => {
    return {
      isLoggedIn: false,
      isLoading: false,
      loaderIsActive: false,
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
      allMessages: [],
      isFocus: false,
      focus: {
        date: null,
        message: null,
      },
    };
  },
  getters: {},
  actions: {
    getAllMessages() {
      axios
        .get(`/message/${this.userDetails?.username}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          if (response.data.status === "true") {
            this.allMessages = response.data.data?.reverse();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout() {
      // Clearing the uer details
      this.userDetails = {};

      // Clearing the user access token
      this.token = {};

      // setting the logged in state to false
      this.isLoggedIn = false;

      // Show the user a success message
      this.notification = "Logout Successful";
    },
  },
});
