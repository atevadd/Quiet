<script setup></script>

<template>
  <main class="container center">
    <h1>Give a piece of your mind without a trace</h1>
    <p class="center">
      Recieve and also give feedbacks about anything anonymously, have fun with
      friends, family, collegues, or anyone through a single link.
    </p>
    <div class="cta">
      <router-link to="/" class="cta__link primary">Get started</router-link>
      <router-link :to="{ name: 'login' }" class="cta__link secondary"
        >Login</router-link
      >
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import "@/styles/views/_home.scss";
</style>
