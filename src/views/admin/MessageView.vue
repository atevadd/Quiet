<template>
  <div class="admin container center">
    <div class="admin__message">
      <header>
        <h1>
          Messages received by
          <span class="name">{{ route.params?.username }}</span>
        </h1>
      </header>

      <div class="admin__message-group">
        <div class="admin__message__item" v-for="message in 5" :key="message">
          <div class="message-info">
            <!-- <span>Anonymous</span> -->
            <span>&bull;</span>
            <span class="date"
              >{{ moment(message.created_at).format("ll") }}wewewe
              {{ moment(message.created_at).format("LT") }}wewewe</span
            >

            <!-- Focus icon -->
            <i
              class="uil uil-focus"
              id="focus"
              @click="openFocus(message.created_at, message.message)"
              title="Click to focus message"></i>
          </div>
          <p class="message__recieved">{{ message.message }} hello</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import moment from "moment";

import { useAdminStore } from "../../stores/admin";
import { useStore } from "../../stores/store";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import FocusModal from "../../components/FocusModal.vue";

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

// the route object
const route = useRoute();
</script>

<style lang="scss" scoped>
@import "../../styles/views/admin/message";
</style>
