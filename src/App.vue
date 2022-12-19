<script setup>
import BaseNavbar from "./components/BaseNavbar.vue";
import AppNotification from "./components/AppNotification.vue";
import AppLoader from "./components/AppLoader.vue";

import { onMounted } from "vue";
import { getCookie } from "./assets/js/helper";
import { useStore } from "./stores/store";

const store = useStore();

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

onMounted(() => {});
</script>

<template>
  <div id="page">
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
</style>
