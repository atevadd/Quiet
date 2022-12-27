import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";
import { setCookie } from "../assets/js/helper";

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
        username: "",
        password: "",
      },
      userDetails: {},
      token: null,
      notification: null,
      hasError: true,
      anonymousMessage: {
        message: "",
        image: [],
      },
      allMessages: [],
      isFocus: false,
      focus: {
        date: null,
        message: null,
      },
      forgotPasswordDetails: {
        email: "",
        token: "",
        otp: "",
      },
      resetPassword: {
        password: "",
        newPassword: "",
      },
      feedbackIsActive: false,
      groupModalIsActive: false,
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

      // Clearing app cookies
      // storing user details in cookie
      setCookie("user", null, 0);
      setCookie("login-token", null, 5);
      setCookie("isLoggedIn", false, 0);
    },
  },
});
