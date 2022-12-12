import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { verifyUser } from "../assets/js/helper";

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
    },
    {
      path: "/forgot-password",
      name: "forgot",
      component: () => import("../views/ForgotPasswordView.vue"),
      meta: {
        title: "Login to continue | Quiett",
      },
    },
    {
      path: "/otp",
      name: "resetOtp",
      component: () => import("../views/ForgotOtpView.vue"),
      meta: {
        title: "Reset Password OTP | Quiett",
      },
    },
    {
      path: "/new-password",
      name: "resetPassword",
      component: () => import("../views/ResetPasswordView.vue"),
      meta: {
        title: "Reset password | Quiett",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "error",
      component: () => import("../views/ErrorView.vue"),
      meta: {
        title: "Login to continue | Quiett",
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
    },
    {
      path: "/messages",
      name: "message",
      component: () => import("../views/MessageView.vue"),
      meta: {
        title: "Messages | Quiett",
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
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta?.title;
  }

  next();
});

export default router;
