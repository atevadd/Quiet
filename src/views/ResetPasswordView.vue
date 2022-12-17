<template>
  <main class="reset-password">
    <div class="reset-password__form">
      <h1 class="heading"><router-link to="/">Quiet</router-link></h1>
      <p class="sub-heading">Create your new password</p>
      <form @submit.prevent="createNewPassword">
        <AppInput
          type="password"
          label="New password"
          inputmode="text"
          id="password"
          v-model="store.resetPassword.password"
          required />
        <AppInput
          type="password"
          label="Confirm password"
          inputmode="text"
          id="c-password"
          v-model="store.resetPassword.newPassword"
          required />
        <AppButton
          id="forgot-password__cta"
          :class="{ loading: store.isLoading }"
          type="submit"
          >Create new password</AppButton
        >
      </form>
    </div>
  </main>
</template>

<script setup>
import AppInput from "../components/AppInput.vue";
import AppButton from "../components/AppButton.vue";
import { useStore } from "../stores/store";
import { useRouter } from "vue-router";
import axios from "axios";

// APP STATE
const store = useStore();

// ROUTER OBJECT
const router = useRouter();

const createNewPassword = () => {
  try {
    if (
      store.resetPassword.password === "" ||
      store.resetPassword.newPassword === ""
    ) {
      store.notification = "Password field cannot be empty";
    } else {
      if (store.resetPassword.password !== store.resetPassword.newPassword) {
        store.notification = "Passwords do not match!";
      } else {
        store.isLoading = true;

        axios
          .post("/new_password", {
            email: store.forgotPasswordDetails.email,
            password: store.resetPassword.password,
          })
          .then((response) => {
            store.isLoading = false;
            // console.log(response);

            if (response.data.status === "true") {
              // Clearing the forgot password details
              store.forgotPasswordDetails = {
                email: "",
                token: "",
                otp: "",
              };

              // Clearing the resetpassword data
              store.resetPassword = {
                password: "",
                newPassword: "",
              };

              // display success message
              store.notification = "Password changed sucessfully";

              // Redirect to login after change
              router.push({ name: "login" });
            }
          })
          .catch((error) => {
            store.isLoading = false;
            // console.log(error.message);

            if (error.message === "Network Error") {
              store.notification = "Check your internet connection";
            }
          });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/views/_newpassword.scss";
</style>
