<template>
  <main class="reset-password">
    <div class="reset-password__form">
      <h1 class="heading"><router-link to="/">Quiet</router-link></h1>
      <p class="sub-heading">Create your new password</p>
      <form>
        <AppInput type="password" label="New password" id="password" required />
        <AppInput
          type="password"
          label="Confirm password"
          id="c-password"
          required />
        <AppButton id="forgot-password__cta" type="submit"
          >Create new password</AppButton
        >
      </form>
    </div>
  </main>
</template>

<script setup>
import AppInput from "../components/AppInput.vue";
import AppButton from "../components/AppButton.vue";
</script>

<style lang="scss" scoped>
@import "@/styles/views/_newpassword.scss";
</style>
