<template>
  <main class="profile">
    <h1>{{ store.userDetails?.username }}'s profile</h1>
    <ProfileShare :username="store.userDetails?.username" />
    <p class="profile__messages">
      <router-link :to="{ name: 'message' }"
        >View messages <i class="uil uil-arrow-right"></i
      ></router-link>
    </p>
  </main>
</template>

<script setup>
import { useStore } from "../stores/store";
import { onMounted } from "vue";
import ProfileShare from "../components/ProfileShare.vue";

// STORE
const store = useStore();

// On page mounted get user messages
onMounted(() => {
  store.getAllMessages();
});
</script>

<style lang="scss" scoped>
@import "@/styles/views/_profile.scss";
</style>
