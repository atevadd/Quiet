<template>
  <div class="error">
    <h1>Error 4<span>0</span>4</h1>
    <p>
      We have searched high and low but couldn't find what you're looking for.
      Let's find a better place for you to go.
    </p>
    <router-link :to="{ name: 'home' }" class="error__cta"
      >Quiet Home</router-link
    >
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "@/styles/views/_error.scss";
</style>
