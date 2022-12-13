<template>
  <main class="contact">
    <div class="contact__container">
      <h1><router-link to="/">Quiett</router-link></h1>
      <p>
        Write a piece of your mind to
        <span class="name">{{ route.params.username }}</span> without trace🤐
      </p>

      <form class="contact__form" @submit.prevent="sendMessage">
        <textarea
          id="contact-textarea"
          :placeholder="`Write a message to ${route.params?.username}`"
          v-model="store.anonymousMessage"></textarea>

        <AppButton id="contact__btn" :class="{ loading: store.isLoading }"
          ><span>Send message</span> <i class="uil uil-message"></i
        ></AppButton>
      </form>
    </div>
  </main>
</template>

<script setup>
import AppButton from "../components/AppButton.vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { useStore } from "../stores/store";

// PAGE ROUTE
const route = useRoute();

// STORE
const store = useStore();

const sendMessage = () => {
  if (store.anonymousMessage === "") {
    store.notification = "Message cannot be blank";
  } else {
    // LOADING IS TRUE
    store.isLoading = true;

    // API CALL
    axios
      .post("/send_message", null, {
        params: {
          username: route.params?.username,
          message: store.anonymousMessage,
        },
      })
      .then((response) => {
        store.isLoading = false;
        store.anonymousMessage = "";

        // Checking if the request was successful and displaying a message
        if (response.data.status === "true") {
          store.notification = response.data.message;
        }
      })
      .catch((error) => {
        console.log(error);
        store.isLoading = false;
      });
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/views/_contact.scss";
</style>
