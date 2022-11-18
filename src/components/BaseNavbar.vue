<template>
  <header class="container center" id="navbar" v-if="route.name !== 'login'">
    <div class="logo">
      <router-link to="/">Quiet</router-link>
    </div>

    <nav class="nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link :to="{ name: 'login' }">Login</router-link></li>
        <li><router-link :to="{ name: 'login' }">Register</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

console.log(route, router);
</script>

<style lang="scss" scoped>
@import "@/styles/layout/_navbar.scss";
</style>
