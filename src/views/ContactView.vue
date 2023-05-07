<template>
  <main class="contact">
    <div class="contact__container" v-if="!store.feedbackIsActive">
      <h1><router-link to="/">Quiett</router-link></h1>
      <p>
        Write a piece of your mind to
        <span class="name">{{ route.params.username }}</span> without trace🤐
      </p>

      <form class="contact__form" @submit.prevent="checkRoute()">
        <textarea
          id="contact-textarea"
          :placeholder="`Write a message to ${route.params?.username}...`"
          v-model="store.anonymousMessage.message"></textarea>

        <!-- Upload image component -->
        <UploadImage />

        <AppButton id="contact__btn" :class="{ loading: store.isLoading }"
          ><span>Send message</span> <i class="uil uil-message"></i
        ></AppButton>
      </form>
    </div>

    <div class="feedback__container" v-else>
      <h1>
        <span class="name">{{ route.params.username }}</span> has recieved your
        response.
      </h1>
      <p>Sign up to get your own feedback.</p>
      <router-link :to="{ name: 'profile' }" class="cta" id="register-btn"
        >Get started on Quiett</router-link
      >
    </div>
  </main>
</template>

<script setup>
import AppButton from "../components/AppButton.vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { useStore } from "../stores/store";
import UploadImage from "../components/UploadImage.vue";

// PAGE ROUTE
const route = useRoute();

// STORE
const store = useStore();

// Send personal message
const sendMessage = () => {
  if (store.anonymousMessage.message === "") {
    store.notification = "Message cannot be blank";
  } else {
    // LOADING IS TRUE
    store.isLoading = true;

    const form = new FormData();

    form.append("username", route.params?.username);
    form.append("message", store.anonymousMessage.message);

    store.anonymousMessage.image.forEach((image) => {
      form.append("image[]", image, image.name);
    });

    const newAxios = axios.create({
      baseURL: "https://quiett.com.ng/api/v1",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });

    // API CALL
    newAxios
      .post("/send_message", form)
      .then((response) => {
        store.isLoading = false;
        store.anonymousMessage.message = "";

        // Checking if the request was successful and displaying a message
        if (response.data.status === "true") {
          store.notification = response.data.message;
          store.feedbackIsActive = true;
        }
      })
      .catch((error) => {
        console.log(error);
        store.isLoading = false;
      });
  }
};

// Send group message
const sendGroupMessage = () => {
  if (store.anonymousMessage.message === "") {
    store.notification = "Message cannot be blank";
  } else {
    // LOADING IS TRUE
    store.isLoading = true;

    // Creating the formdata instance
    const form = new FormData();

    // appending the anonymous message
    form.append("message", store.anonymousMessage.message);

    // Appending each image to the form data
    store.anonymousMessage.image.forEach((image) => {
      form.append("image[]", image, image.name);
    });

    // Creating a new axios instance
    const newAxios = axios.create({
      baseURL: "https://quiett.com.ng/api/v1",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });

    newAxios
      .post(`/${store.userDetails?.username}/${route.params.groupName}`, form)
      .then((response) => {
        store.isLoading = false;
        store.anonymousMessage.message = "";

        // Checking if the request was successful and displaying a message
        if (response.data.status === "true") {
          store.notification = response.data.message;
          store.feedbackIsActive = true;
        }
      })
      .catch((error) => {
        console.log(error);
        store.isLoading = false;
      });
  }
};

// Check what route this is
const checkRoute = () => {
  if (route.name == "contact") {
    return sendMessage();
  } else {
    return sendGroupMessage();
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/views/_contact.scss";
</style>
