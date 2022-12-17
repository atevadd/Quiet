<template>
  <div class="focus" @click.self="store.isFocus = false">
    <div class="focus-modal">
      <div class="message__item">
        <div class="message-info">
          <!-- <span>Anonymous</span> -->
          <span>&bull;</span>
          <span class="date"
            >{{ moment(store.focus.date).format("ll") }} -
            {{ moment(store.focus.date).format("LT") }}</span
          >
        </div>
        <p class="message__recieved">
          {{ store.focus.message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { useStore } from "../stores/store";

const store = useStore();

// const props = defineProps({
//   date: {
//     type: String,
//     required: true,
//     default: "Sat Dec 17 2022 07:51:21 GMT+0100",
//   },
//   message: {
//     type: String,
//     required: true,
//     default: "Anonymouse message recieved",
//   },
// });
</script>

<style lang="scss" scoped>
@import "@/styles/components/_focus.scss";
</style>
