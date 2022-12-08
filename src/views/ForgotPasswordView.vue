<template>
  <main class="forgot-password">
    <div class="forgot-password__form">
      <h1 class="heading"><router-link to="/">Quiett</router-link></h1>
      <p class="sub-heading">Forgot password? Enter your email to reset</p>
      <form>
        <AppInput
          type="email"
          label="Email"
          inputmode="email"
          id="email"
          required />
        <AppButton
          :class="{ loading: store.isLoading }"
          id="forgot-password__cta"
          type="submit"
          >Reset password</AppButton
        >
      </form>
    </div>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import AppButton from "../components/AppButton.vue";
import AppInput from "../components/AppInput.vue";
import { useStore } from "../stores/store";

const store = useStore();
</script>

<style lang="scss" scoped>
@import "@/styles/views/_forgotpassword.scss";
</style>
