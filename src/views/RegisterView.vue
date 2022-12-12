<template>
  <main class="register">
    <div class="register__form">
      <h1 class="heading"><router-link to="/">Quiett</router-link></h1>
      <p class="sub-heading">Create an account to get started</p>
      <form @submit.prevent="registerUser">
        <AppInput
          type="text"
          label="Username"
          id="username"
          inputmode="text"
          :valid="store.hasError"
          v-model="store.registerDetails.username"
          @blur="validateUser"
          autocomplete="off"
          required />
        <AppInput
          type="email"
          label="Email"
          id="email"
          inputmode="email"
          v-model="store.registerDetails.email"
          required />
        <AppInput
          type="password"
          label="Password"
          inputmode="text"
          id="password"
          v-model="store.registerDetails.password"
          required />
        <AppButton
          :class="{ loading: store.isLoading }"
          id="register__cta"
          type="submit"
          >Get started</AppButton
        >
      </form>
      <p class="register__alt-text">
        Already a user? <router-link :to="{ name: 'login' }">Login</router-link>
      </p>
    </div>
  </main>
</template>

<script setup>
import AppButton from "../components/AppButton.vue";
import AppInput from "../components/AppInput.vue";
import { useStore } from "../stores/store";
import axios from "axios";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

// Register User
const registerUser = () => {
  try {
    store.isLoading = true;
    axios
      .post("/register", store.registerDetails)
      .then((response) => {
        // Remove the loading state from the button
        store.isLoading = false;
        store.notification = "Account has been created";
        // Redirect to login page
        router.push({ name: "login" });
        // Clear the register details
        store.registerDetails = {
          username: "",
          email: "",
          password: "",
        };
      })
      .catch((error) => {
        store.isLoading = false;

        if (
          error.response.status === 400 ||
          error.response.data.status === "false"
        ) {
          store.notification = error.response.data.message?.email[0];
        } else if (error.response.status === 500) {
          store.notification = "Username is taken";
        }
      });
  } catch (error) {
    console.log(error);
  }
};

// Validate user
// This is called when the username field is blurred
const validateUser = () => {
  try {
    if (store.registerDetails.username) {
      axios
        .get(`/${store.registerDetails.username}`)
        .then((response) => {
          if (response.data.status === "false") {
            store.notification = response.data.message;
            store.hasError = true;
          } else if (response.data.status === "true") {
            store.hasError = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      store.hasError = true;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/views/_register.scss";
</style>
