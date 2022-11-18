<template>
  <main class="login">
    <div class="login__form">
      <h1><router-link to="/">Quiet</router-link></h1>
      <p>Welcom back, login to continue</p>
      <form>
        <AppInput type="email" label="Email" id="email" />
        <AppInput type="password" label="Password" id="password" />
        <AppButton id="login__cta" type="submit">Login</AppButton>
      </form>
    </div>
  </main>
</template>

<script setup>
import AppButton from "../components/AppButton.vue";
import AppInput from "../components/AppInput.vue";
</script>

<style lang="scss" scoped>
@import "@/styles/views/_login.scss";
</style>
