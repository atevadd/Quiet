<script setup></script>

<template>
  <main class="container center">
    <!-- <img src="@/assets/img/meta.png" alt="" hidden /> -->

    <h1>Give a piece of your mind without trace</h1>
    <p class="center">
      Recieve and give feedback about anything anonymously, have fun with
      friends, family, collegues, or anyone through a single link.
      <img src="@/assets/q-logo.png" alt="" />
    </p>
    <div class="cta">
      <router-link :to="{ name: 'register' }" class="cta__link primary"
        >Get started</router-link
      >
      <router-link :to="{ name: 'login' }" class="cta__link secondary"
        >Login</router-link
      >
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import "@/styles/views/_home.scss";
</style>
