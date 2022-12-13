<template>
  <main class="login">
    <div class="login__form">
      <h1 class="heading"><router-link to="/">Quiett</router-link></h1>
      <p class="sub-heading">Welcome back, login to continue</p>
      <form @submit.prevent="loginUser">
        <AppInput
          type="email"
          label="Email"
          id="email"
          inputmode="email"
          required
          v-model="store.loginDetails.email" />
        <p class="login__forgot">
          <router-link :to="{ name: 'forgot' }">Forgot password?</router-link>
        </p>
        <AppInput
          type="password"
          inputmode="text"
          label="Password"
          id="password"
          required
          minlength="8"
          title="Password must be at least 8 Characters"
          v-model="store.loginDetails.password" />
        <AppButton
          :class="{ loading: store.isLoading }"
          id="login__cta"
          type="submit"
          >Login</AppButton
        >
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
import { useStore } from "../stores/store";
import axios from "axios";
import { useRouter } from "vue-router";

// STORE
const store = useStore();
// ROUTER
const router = useRouter();

// // Login User
const loginUser = () => {
  try {
    store.isLoading = true;
    axios
      .post("/login", store.loginDetails)
      .then((response) => {
        // Storing userdetails
        store.userDetails = response.data.data;
        store.token = response.data?.access_token;
        store.isLoggedIn = true;

        // remove the button laoding state
        store.isLoading = false;

        store.notification = "Login successful";

        // Redirect to homepage
        router.push({ name: "profile" });

        // clearing loginDetails
        store.loginDetails = {
          email: "",
          password: "",
        };
      })
      .catch((error) => {
        console.log(error);
        store.isLoading = false;
        if (error.response.data.status === "false") {
          store.notification = error.response.data.message;
        }
      });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/views/_login.scss";
</style>
