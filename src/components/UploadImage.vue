<template>
  <div class="upload-image">
    <div class="upload-filled" v-if="anonymousMessage.image.length > 0">
      <label for="image" class="label"
        ><i class="uil uil-image"></i>
        <span
          class="label-text"
          ref="text"
          v-if="anonymousMessage.image.length == 1"
          >{{ anonymousMessage.image.length }} file uploaded</span
        >
        <span class="label-text" ref="text" v-else
          >{{ anonymousMessage.image.length }} files uploaded</span
        >
      </label>
      <span class="delete-images" @click="clearImages"
        ><i class="uil uil-times-square"></i
      ></span>
    </div>

    <div class="no-image" v-else>
      <label for="image" class="image-label"
        ><i class="uil uil-image"></i>
        <span class="label-text">Click here to upload image</span></label
      >
    </div>

    <input
      type="file"
      id="image"
      hidden
      multiple
      ref="uploader"
      accept="image/*"
      @change="uploadImages($event)" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Compressor from "compressorjs";
import { useStore } from "../stores/store";
import { storeToRefs } from "pinia";

// App store
const store = useStore();

const { anonymousMessage } = storeToRefs(store);

// image element
const uploader = ref(null);

// Image label text
const text = ref(null);

//upload anonymous message
const uploadImages = (event) => {
  // Storing the uploaded files
  const imageFiles = event.target.files;

  // checking if the images are more than 5
  if (imageFiles.length > 4 || anonymousMessage.value.image.length > 4) {
    // Display an error message
    store.notification = "Maximum images is 5";
  } else {
    // compressing each images before upload
    for (let i = 0; i < event.target.files.length; i++) {
      new Compressor(imageFiles[i], {
        quality: 0.6,
        convertTypes: ["image/png", "image/webp"],
        convertSize: 100000,
        // The compression process is asynchronous,
        // which means you have to access the `result` in the `success` hook function.
        success(result) {
          anonymousMessage.value.image.push(result);
        },
      });
    }
  }
};

// Clear the uploaded images
const clearImages = () => {
  anonymousMessage.value.image = [];
};

onMounted(() => {
  console.log(uploader.value.textContent);
});
</script>

<style lang="scss" scoped>
@import "../styles/components/uploadimage";
</style>
