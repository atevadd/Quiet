<template>
  <header
    class="container center"
    id="navbar"
    v-if="
      route.name !== 'login' &&
      route.name !== 'register' &&
      route.name !== 'error' &&
      route.name !== 'contact' &&
      route.name !== 'forgot'
    ">
    <div class="logo">
      <router-link to="/">Quiett</router-link>
    </div>

    <nav class="nav">
      <ul>
        <!-- <li><router-link to="/">Home</router-link></li> -->
        <li>
          <router-link :to="{ name: 'register' }">Get started</router-link>
        </li>
        <li><router-link :to="{ name: 'login' }">Login</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style lang="scss" scoped>
@import "@/styles/layout/_navbar.scss";
</style>
