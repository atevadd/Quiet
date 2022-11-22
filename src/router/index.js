import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Give a piece of your mind without trace | Quiet",
      },
    },
    {
      path: "/auth/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        title: "Login to continue | Quiet",
      },
    },
    {
      path: "/error",
      name: "error",
      component: () => import("../views/ErrorView.vue"),
      meta: {
        title: "Login to continue | Quiet",
      },
    },
    {
      path: "/auth/get-started",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
      meta: {
        title: "Quiet | Get started with Quiet",
      },
    },
    {
      path: "/home",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      meta: {
        title: "Quiet | Dashboard",
      },
    },
    {
      path: "/messages",
      name: "message",
      component: () => import("../views/MessageView.vue"),
      meta: {
        title: "Quiet | Messages",
      },
    },
    {
      path: "/:username",
      name: "username",
      component: () => import("../views/UsernameView.vue"),
      meta: {
        title: "Write a piece of your mind here without trace | Quiet",
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
