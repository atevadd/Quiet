import { defineStore } from "pinia";
import axios from "axios";
export const useAdminStore = defineStore("admin", {
  state: () => {
    return {
      isAdmin: true,
      allUsers: [],
      stats: {
        group: 0,
        messages: 0,
        users: 0,
      },
      recentUsers: [],
    };
  },
  actions: {
    getAllUsers() {
      axios
        .get("/admin/getAllUsers")
        .then((response) => {
          if (response.data.status === "true") {
            this.allUsers = response.data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getStats() {
      axios
        .get("/admin/userStats")
        .then((response) => {
          if (response.data.status === "true") {
            (this.stats.users = response.data.total_user),
              (this.stats.messages = response.data.total_messages),
              (this.stats.group = response.data.total_group);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCurrentUsers() {
      axios
        .get("/admin/recentUsers")
        .then((response) => {
          // console.log(response);
          this.recentUsers = response.data?.reverse();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
