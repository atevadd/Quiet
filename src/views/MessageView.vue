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
          <div class="images" v-if="message.image !== null">
            <vue-easy-lightbox
              :visible="visible"
              :imgs="lightbxImgs"
              :index="index"
              :min-zoom="0.8"
              :scroll-disabled="false"
              :loop="true"
              @hide="hideLightbox"></vue-easy-lightbox>

            <img
              alt=""
              v-for="(path, index) in splitImages(message.image)"
              :key="index"
              :src="path"
              @click="showMultiple(index, splitImages(message.image))" />
          </div>
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

    <FocusModal v-show="store.isFocus" />
  </div>
</template>

<script setup>
import moment from "moment";
import { useStore } from "../stores/store";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import FocusModal from "../components/FocusModal.vue";
import axios from "axios";

import VueEasyLightbox from "vue-easy-lightbox";

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
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

const splitImages = (images) => {
  // console.log(images);

  if (images == null) {
    console.log("it is null");
    return [];
  } else {
    if (images?.includes("|")) {
      const imgs = images?.split("|");

      const fullImagePaths = imgs.map(
        (path) => "https://quiett.com.ng/img/" + path
      );
      return fullImagePaths;
    } else if (!images?.includes("|")) {
      const imagePath = images?.split();

      // console.log("this here", imagePath);

      const fullImagePaths = imagePath.map(
        (path) => "https://quiett.com.ng/img/" + path
      );

      // console.log(fullImagePaths);
      return fullImagePaths;
    } else if (images == null) {
      return "";
    }
  }
};

// lightbox props
const visible = ref(false);
const lightbxImgs = ref([]);
const index = ref(0);

const showMultiple = (i, images) => {
  lightbxImgs.value = images;
  index.value = i;
  visible.value = true;
};

const hideLightbox = () => {
  visible.value = false;
};
</script>

<style lang="scss" scoped>
@import "@/styles/views/_message.scss";
</style>
