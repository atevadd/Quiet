import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { verifyUser } from "../assets/js/helper";
import { useStore } from "../stores/store";
import { getCookie } from "../assets/js/helper";
import { useAdminStore } from "../stores/admin";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Give a piece of your mind without trace | Quiett",
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        title: "Login to continue | Quiett",
      },
      beforeEnter(to, from) {
        // const store = useStore();

        if (getCookie("isLoggedIn") === "true") {
          return { name: "profile" };
        } else {
          return true;
        }
      },
    },
    {
      path: "/forgot-password",
      name: "forgot",
      component: () => import("../views/ForgotPasswordView.vue"),
      meta: {
        title: "Forgot password | Quiett",
      },
      beforeEnter(to, from) {
        // const store = useStore();

        if (getCookie("isLoggedIn") === "true") {
          return { name: "profile" };
        } else if (
          getCookie("isLoggedIn") === "false" &&
          from.name === undefined
        ) {
          return { name: "login" };
        } else {
          return true;
        }
      },
    },
    {
      path: "/otp",
      name: "resetOtp",
      component: () => import("../views/ForgotOtpView.vue"),
      meta: {
        title: "Reset Password OTP | Quiett",
      },
      beforeEnter(to, from) {
        // const store = useStore();

        if (getCookie("isLoggedIn") === "true") {
          return { name: "profile" };
        } else if (
          getCookie("isLoggedIn") === "false" &&
          from.name == undefined
        ) {
          return { name: "login" };
        } else {
          return true;
        }
      },
    },
    {
      path: "/new-password",
      name: "resetPassword",
      component: () => import("../views/ResetPasswordView.vue"),
      meta: {
        title: "Reset password | Quiett",
      },
      beforeEnter(to, from) {
        // const store = useStore();

        if (getCookie("isLoggedIn") === "true") {
          return { name: "profile" };
        } else if (
          getCookie("isLoggedIn") === "false" &&
          from.name == undefined
        ) {
          return { name: "login" };
        } else {
          return true;
        }
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "error",
      component: () => import("../views/ErrorView.vue"),
      meta: {
        title: "Sorry, this page could not be found | Quiett",
      },
    },
    {
      path: "/get-started",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
      meta: {
        title: "Get started with Quiett | Quiett",
      },
    },
    {
      path: "/home",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      meta: {
        title: "Dashboard | Quiett",
      },
      beforeEnter(to, from) {
        // const store = useStore();

        if (getCookie("isLoggedIn") === "true") {
          return true;
        } else {
          return { name: "login" };
        }
      },
    },
    {
      path: "/messages",
      name: "message",
      component: () => import("../views/MessageView.vue"),
      meta: {
        title: "Messages | Quiett",
      },
      beforeEnter(to, from) {
        const store = useStore();

        if (getCookie("isLoggedIn") === "true") {
          return true;
        } else {
          return { name: "login" };
        }
      },
    },
    {
      path: "/:username",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
      meta: {
        title: "Write a piece of your mind here without trace | Quiett",
      },
      beforeEnter: async (to, from) => {
        if ((await verifyUser(to.params?.username)) === true) {
          return true;
        } else {
          console.log("does not exist");
          return { name: "error" };
        }
      },
    },
    {
      path: "/admin",
      name: "home-admin",
      component: () => import("../views/admin/HomeView.vue"),
      meta: {
        title: "Admin Dashboard | Quiett",
      },
      beforeEnter: () => {
        const adminStore = useAdminStore();

        if (adminStore.isAdmin) {
          return true;
        } else {
          return { name: "login" };
        }
      },
    },
    {
      path: "/admin/users",
      name: "users-admin",
      component: () => import("../views/admin/UsersView.vue"),
      meta: {
        title: "All users | Admin Dashboard | Quiett",
      },
      beforeEnter: () => {
        const adminStore = useAdminStore();

        if (adminStore.isAdmin) {
          return true;
        } else {
          return { name: "login" };
        }
      },
    },
    {
      path: "/admin/:username/messages",
      name: "admin-messages",
      component: () => import("../views/admin/MessageView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta?.title;
  }

  next();
});

export default router;
