<template>
  <main class="forgot-password">
    <div class="forgot-password__form">
      <h1 class="heading"><router-link to="/">Quiett</router-link></h1>
      <p class="sub-heading">Forgot password? Enter your email to reset</p>
      <form @submit.prevent="sendPasswordOtp">
        <AppInput
          type="email"
          label="Email"
          inputmode="email"
          id="email"
          v-model="store.forgotPasswordDetails.email"
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
import axios from "axios";
import { useRouter } from "vue-router";

// APP STATE
const store = useStore();

// ROUTER OBJECT
const router = useRouter();

// SEND FORGOT PASSWORD OTP
const sendPasswordOtp = () => {
  try {
    // set button loading state to true
    store.isLoading = true;

    if (store.forgotPasswordDetails.email === "") {
      store.notification = "please enter your email";
    } else {
      // API call
      axios
        .post("/forgot_password", {
          email: store.forgotPasswordDetails.email,
        })
        .then((response) => {
          console.log(response);

          store.isLoading = false;

          if (response.data.status === "true") {
            store.forgotPasswordDetails.email = response.data.email;
            store.forgotPasswordDetails.token = response.data.token;

            // CREATING A NOTIFICATION
            store.notification = response.data.message;

            router.push({ name: "resetOtp" });
          } else if (response.data.status === "false") {
            store.notification = response.data.message;
          }
        })
        .catch((error) => {
          store.isLoading = false;
          console.log(error);
        });
    }
  } catch (error) {}
};
</script>

<style lang="scss" scoped>
@import "@/styles/views/_forgotpassword.scss";
</style>
