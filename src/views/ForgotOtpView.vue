<template>
  <main class="reset-otp">
    <div class="reset-otp__container">
      <h1 class="heading"><router-link to="/">Quiet</router-link></h1>
      <p class="sub-heading">Enter OTP sent to your email address</p>
      <form @submit.prevent="handleOnComplete">
        <VOtpInput
          id="otp"
          ref="otpInput"
          input-classes="otp-input"
          separator="-"
          :num-inputs="4"
          :should-auto-focus="true"
          :placeholder="['*', '*', '*', '*']"
          @on-complete="handleOnComplete" />
        <AppButton
          id="forgot-password__cta"
          :class="{ loading: store.isLoading }"
          type="submit"
          >Verify otp</AppButton
        >
      </form>
    </div>
  </main>
</template>

<script setup>
import AppButton from "../components/AppButton.vue";
import VOtpInput from "vue3-otp-input";
import { ref } from "vue";
import { useStore } from "../stores/store";
import { useRouter } from "vue-router";

// OTP INPUT
const otpInput = ref(null);

// router
const router = useRouter();

const store = useStore();

// On OTP input complete
const handleOnComplete = (value) => {
  store.forgotPasswordDetails.otp = Number(value);

  store.isLoading = true;
  // check the otp and token
  setTimeout(() => {
    if (store.forgotPasswordDetails.otp !== store.forgotPasswordDetails.token) {
      otpInput.value.clearInput();

      // display notification
      store.notification = "OTP is not correct";

      store.isLoading = false;
    } else {
      router.push({ name: "resetPassword" });
      store.isLoading = false;
    }
  }, 3000);
};
</script>

<style lang="scss">
.otp-input {
  width: 50px;
  height: 50px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: none;
  outline: none;
  text-align: center;
  font-family: $mont;
  background-color: $brand-color;

  &:focus {
    outline: 2px solid $text-color-white;
  }
}

/* Background colour of an input field with value */
.otp-input.is-complete {
  // background-color: #fff;
  background-color: $brand-color;
  outline: 2px solid $secondary-color;
  color: $text-color-white;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>

<style lang="scss" scoped>
@import "@/styles/views/_otp.scss";
</style>
