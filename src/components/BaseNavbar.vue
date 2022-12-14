<template>
  <header
    class="container center"
    id="navbar"
    v-show="
      route.name !== 'login' &&
      route.name !== 'register' &&
      route.name !== 'error' &&
      route.name !== 'contact' &&
      route.name !== 'forgot' &&
      route.name !== 'resetOtp' &&
      route.name !== 'resetPassword'
    ">
    <div class="logo">
      <router-link to="/">Quiett</router-link>
    </div>

    <nav class="nav">
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
          <router-link to="#" @click="logoutUser">Logout</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
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
</script>

<style lang="scss" scoped>
@import "@/styles/layout/_navbar.scss";
</style>
