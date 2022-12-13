<template>
  <div class="message" v-if="allMessages.length > 0">
    <header>
      <h1>Your messages</h1>
      <p>
        Here are the messages you have recieved from friends, family, co-workers
        and all.
      </p>
    </header>
    <div class="message__container">
      <div
        class="message__item"
        v-for="message in allMessages"
        :key="message.id">
        <div class="message-info">
          <!-- <span>Anonymous</span> -->
          <span>&bull;</span>
          <span class="date"
            >{{ moment(message.created_at).format("ll") }} -
            {{ moment(message.created_at).format("LT") }}</span
          >
        </div>
        <p class="message__recieved">
          {{ message.message }}
        </p>
      </div>
    </div>
  </div>

  <!-- empty state -->
  <div class="empty" v-else>
    <div class="empty__container">
      <img src="@/assets/img/response-3d.png" alt="" />
      <h1>You have recieved no message</h1>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { useStore } from "../stores/store";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

const store = useStore();

const { allMessages } = storeToRefs(store);

// Get user messages every 5 seconds
onMounted(() => {
  setInterval(() => {
    store.getAllMessages();
  }, 60000);
});
</script>

<style lang="scss" scoped>
@import "@/styles/views/_message.scss";
</style>
