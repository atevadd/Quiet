<template>
  <div class="notification" v-show="store.notification !== null">
    {{ store.notification }}
  </div>
</template>

<script setup>
import { useStore } from "../stores/store";
import { watch } from "vue";
import { computed } from "vue";

// PINIA STORE
const store = useStore();

// computed to be able to watch the store
const message = computed(() => {
  return store.notification;
});

// Watch the notifcation for any change
watch(message, () => {
  setTimeout(() => {
    store.notification = null;
  }, 4000);
});
</script>

<style lang="scss" scoped>
@import "@/styles/components/_notification.scss";
</style>
