<template>
  <main class="forgot-password">
    <div class="forgot-password__form">
      <h1 class="heading"><router-link to="/">Quiet</router-link></h1>
      <p class="sub-heading">Forgot password? Enter your email to reset</p>
      <form>
        <AppInput type="email" label="Email" id="email" required />
        <AppButton id="forgot-password__cta" type="submit"
          >Reset password</AppButton
        >
      </form>
    </div>
  </main>
</template>

<script setup>
import AppButton from "../components/AppButton.vue";
import AppInput from "../components/AppInput.vue";
</script>

<style lang="scss" scoped>
@import "@/styles/views/_forgotpassword.scss";
</style>
