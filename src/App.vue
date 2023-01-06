<script setup>
import BaseNavbar from "./components/BaseNavbar.vue";
import AppNotification from "./components/AppNotification.vue";
import AppLoader from "./components/AppLoader.vue";
import { getCookie } from "./assets/js/helper";
import { useStore } from "./stores/store";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const store = useStore();
const router = useRouter();

// to check for user details in cookies
const isLoggedIn = () => {
  if (getCookie("isLoggedIn") === "true") {
    const user = JSON.parse(getCookie("user"));
    const token = getCookie("login-token");

    // Storing userdetails in store
    store.userDetails = user;
    store.token = token;
    store.isLoggedIn = true;
  }
};

// Checking if a user is already logged in
isLoggedIn();

onMounted(() => {
  setTimeout(() => {
    store.preloaderIsActive = false;
  }, 2000);
});
</script>

<template>
  <div id="page">
    <div class="preloader" v-show="store.preloaderIsActive">
      <img src="@/assets/q-logo.png" alt="" />
    </div>
    <BaseNavbar />
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <AppNotification />
    <AppLoader />
  </div>
</template>

<style lang="scss">
@import "@/styles/main.scss";

#page {
  width: 100%;
  min-height: 100vh;
  background-color: $brand-color;

  & > header {
    align-items: flex-start;
  }
}

.container {
  @include mobile {
    width: 90%;
  }
  @include tablet {
    width: 90%;
  }
  @include laptop {
    width: 90%;
  }
  @include desktop {
    width: 90%;
  }
}

.center {
  margin-inline: auto;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.1s ease-out;
}
.page-enter-to {
  opacity: 1;
  // transform: translateY(0px);
}
.page-enter-from {
  opacity: 0;
  // transform: translateY(1000px);
}
.page-leave-to {
  opacity: 0;
}
.page-leave-from {
  opacity: 1;
}

// preloader styling
.preloader {
  position: fixed;
  inset: 0;
  height: 100vh;
  max-height: 100vh;
  background-color: $brand-color;
  z-index: 99999999;
  display: grid;
  place-content: center;

  img {
    transform: scale(0.5);
    animation: in-out 1s ease alternate infinite;
  }
}
</style>
