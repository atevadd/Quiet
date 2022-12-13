import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";

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
      allMessages: [],
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
          console.log(response);
          if (response.data.status === "true") {
            this.allMessages = response.data.data?.reverse();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
