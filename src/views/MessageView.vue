<template>
  <div>
    <div class="message" v-if="allMessages.length > 0">
      <header>
        <h1>Your messages</h1>
        <p>
          Here are the messages you have received from friends, family,
          co-workers and all.
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

            <div class="menu">
              <!-- Focus icon -->
              <i
                class="uil uil-focus"
                id="focus"
                @click="openFocus(message.created_at, message.message)"
                title="Click to focus message"></i>
              <i
                class="uil uil-trash-alt delete"
                @click="deleteMessage(message.id)"></i>
            </div>
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
        <h1>You have not received a message</h1>
      </div>
    </div>

    <FocusModal
      message="Yoooooooooooo"
      date="Sat, 17 Dec 2022 06:54:06 GMT"
      v-show="store.isFocus" />
  </div>
</template>

<script setup>
import moment from "moment";
import { useStore } from "../stores/store";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import FocusModal from "../components/FocusModal.vue";
import axios from "axios";

const store = useStore();

const { allMessages } = storeToRefs(store);

// Open focus mode
const openFocus = (date, message) => {
  // Set the focus message and date to clicked message
  store.focus.date = date;
  store.focus.message = message;

  // Open focus modal
  store.isFocus = true;
};
// get messages on page enter
store.getAllMessages();

// Get user messages every 5 seconds
onMounted(() => {
  setInterval(() => {
    store.getAllMessages();
  }, 60000);
});

// Delete message
const deleteMessage = (messageId) => {
  if (confirm("Are you sure you want to delete this message")) {
    axios
      .delete(`/message/${messageId}`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      })
      .then((response) => {
        store.getAllMessages();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/views/_message.scss";
</style>
