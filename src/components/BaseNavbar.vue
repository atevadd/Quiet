<template>
  <header class="container center" id="navbar" v-if="checkRoute">
    <div class="logo">
      <router-link to="/">Quiett</router-link>
    </div>

    <nav class="nav" :class="{ active: store.menuIsActive }" ref="nav">
      <ul>
        <!-- <li><router-link to="/">Home</router-link></li> -->
        <li v-show="!store.isLoggedIn">
          <router-link :to="{ name: 'register' }">Get started</router-link>
        </li>
        <li v-show="!store.isLoggedIn">
          <router-link :to="{ name: 'login' }">Login</router-link>
        </li>
        <li v-show="store.isLoggedIn">
          <router-link :to="{ name: 'profile' }">Home</router-link>
        </li>
        <li v-show="store.isLoggedIn">
          <router-link :to="{ name: 'message' }">Messages</router-link>
        </li>
        <li v-show="store.isLoggedIn">
          <router-link
            :to="{ name: 'groups' }"
            :class="[
              route?.path.includes('groups') ? 'router-link-exact-active' : '',
            ]"
            >Groups</router-link
          >
        </li>
        <li v-show="store.isLoggedIn">
          <button @click="logoutUser">Logout</button>
        </li>
      </ul>
    </nav>

    <!-- Mobile menu toggle -->
    <button ref="toggle" class="menu-toggle">
      <i class="uil uil-bars"></i> Menu
    </button>
  </header>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../stores/store";

// PINIA STORE
const store = useStore();

// ROUTE OBJECT
const route = useRoute();

// ROUTER OBJECT
const router = useRouter();

const logoutUser = () => {
  store.loaderIsActive = true;

  setTimeout(() => {
    store.logout();

    // redirecting user to the login page
    router.push({ name: "login" });

    store.loaderIsActive = false;
  }, 3000);
};

const checkRoute = computed(() => {
  if (
    route.name !== "login" &&
    route.name !== "register" &&
    route.name !== "error" &&
    route.name !== "contact" &&
    route.name !== "forgot" &&
    route.name !== "resetOtp" &&
    route.name !== "resetPassword" &&
    route.name !== "send-group-message"
  ) {
    return true;
  } else {
    return false;
  }
});

// Mobile menu
const nav = ref(null);
const toggle = ref(null);

onMounted(() => {
  window.addEventListener("mousedown", (e) => {
    const clickedEl = e.target;

    // check if the menu toggle button is clicked
    if (toggle.value?.contains(clickedEl)) {
      // Check if the menu is active
      if (store.menuIsActive == true) {
        store.menuIsActive = false;
      } else {
        store.menuIsActive = true;
      }
    } else {
      if (nav.value?.contains(clickedEl)) {
        clickedEl.click();
      }
      store.menuIsActive = false;
    }
  });
});
</script>

<style lang="scss" scoped>
@import "@/styles/layout/_navbar.scss";
</style>
