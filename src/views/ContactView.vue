<template>
  <main class="contact">
    <div class="contact__container">
      <h1><router-link to="/">Quiett</router-link></h1>
      <p>
        Write a piece of your mind to
        <span class="name">{{ route.params.username }}</span> without trace🤐
      </p>

      <form class="contact__form">
        <textarea
          id="contact-textarea"
          :placeholder="`Write a message to ${route.params?.username}`"></textarea>

        <AppButton id="contact__btn"
          ><span>Send message</span> <i class="uil uil-message"></i
        ></AppButton>
      </form>
    </div>
  </main>
</template>

<script setup>
import AppButton from "../components/AppButton.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style lang="scss" scoped>
@import "@/styles/views/_contact.scss";
</style>
