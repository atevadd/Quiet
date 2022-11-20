<template>
  <main class="login">
    <div class="login__form">
      <h1 class="heading"><router-link to="/">Quiet</router-link></h1>
      <p class="sub-heading">Welcome back, login to continue</p>
      <form>
        <AppInput type="email" label="Email" id="email" required />
        <p class="login__forgot">
          <router-link to="/">Forgot password?</router-link>
        </p>
        <AppInput type="password" label="Password" id="password" required />
        <AppButton id="login__cta" type="submit">Login</AppButton>
      </form>
      <p class="login__signup">
        New to Quiet?
        <router-link :to="{ name: 'register' }">Get started</router-link>
      </p>
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
