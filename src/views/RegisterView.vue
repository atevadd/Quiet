<template>
  <main class="register">
    <div class="register__form">
      <h1 class="heading"><router-link to="/">Quiet</router-link></h1>
      <p class="sub-heading">Create an account to get started</p>
      <form>
        <AppInput type="text" label="Username" id="user-name" required />
        <AppInput type="email" label="Email" id="user-name" required />
        <AppInput type="password" label="Password" id="password" required />
        <AppButton id="register__cta" type="submit">Get started</AppButton>
      </form>
    </div>
  </main>
</template>

<script setup>
import AppButton from "../components/AppButton.vue";
import AppInput from "../components/AppInput.vue";
</script>

<style lang="scss" scoped>
@import "@/styles/views/_register.scss";
</style>
