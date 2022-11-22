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
        title: "Quiet | Give a piece of your mind without trace",
      },
    },
    {
      path: "/auth/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        title: "Quiet | login to continue",
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
      path: "/profile",
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
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta?.title;
  }

  next();
});

export default router;
