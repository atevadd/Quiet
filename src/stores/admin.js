import { defineStore } from "pinia";
import axios from "axios";
export const useAdminStore = defineStore("admin", {
  state: () => {
    return {
      isAdmin: false,
      allUsers: [],
    };
  },
  actions: {
    getAllUsers() {
      axios
        .get("/admin/getAllUsers")
        .then((response) => {
          console.log(response);

          if (response.data.status === "true") {
            this.allUsers = response.data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
