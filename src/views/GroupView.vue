<template>
  <main class="group container center">
    <header>
      <h1>{{ route.params.groupName }}</h1>
      <div class="link">
        <span class="group-link" ref="groupLink" @click="copyGroupLink"
          >https://quiett.fun/{{ store.userDetails?.username }}/{{
            route.params.groupName
          }}</span
        >

        <i @click="copyGroupLink" class="uil uil-copy"></i>
      </div>
    </header>

    <div class="message__container" v-if="allGroupMessage.length > 0">
      <div
        class="message__item"
        v-for="message in allGroupMessage"
        :key="message.id">
        <div class="message-info">
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
            :move-disabled="true"
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

    <!-- empty state -->
    <div class="empty" v-else>
      <div class="empty__container">
        <img src="@/assets/img/response-3d.png" alt="" />
        <h1>You have not received a message</h1>
      </div>
    </div>

    <!-- Focus modal -->
    <FocusModal v-show="store.isFocus" />
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useStore } from "../stores/store";
import moment from "moment";
import FocusModal from "../components/FocusModal.vue";
import axios from "axios";
import { ref } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";

const route = useRoute();
const store = useStore();

const { allGroupMessage } = storeToRefs(store);

// Open focus mode
const openFocus = (date, message) => {
  // Set the focus message and date to clicked message
  store.focus.date = date;
  store.focus.message = message;

  // Open focus modal
  store.isFocus = true;
};

// Get all messages for group
const getGroupMessages = () => {
  axios
    .get(`/group_message/${store.userDetails?.username}`, {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
      params: {
        groupName: route.params.groupName,
      },
    })
    .then((response) => {
      // If there a response data from the API
      if (response.data.status == "true") {
        allGroupMessage.value = response.data.data?.reverse();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

getGroupMessages();

// group link
const groupLink = ref(null);

// copy group link
const copyGroupLink = () => {
  // check if browser supports clipboard
  if (navigator.clipboard) {
    navigator.clipboard.writeText(`${groupLink.value.textContent}`);
    store.notification = "Link copied to clipboard";
  }
};

// delete Message
const deleteMessage = (messageId) => {
  if (confirm("Are you sure you want to delete this message")) {
    axios
      .delete(`/group_message/${messageId}`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      })
      .then((response) => {
        getGroupMessages();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

// Seperate each image and return an array
const splitImages = (images) => {
  const imgs = images?.split("|");

  const fullImagePaths = imgs.map(
    (path) => "https://quiett.com.ng/img/" + path
  );
  return fullImagePaths;
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
@import "@/styles/views/_group.scss";
</style>
