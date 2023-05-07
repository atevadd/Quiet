<template>
  <div class="focus" @click.self="store.isFocus = false">
    <div class="focus-modal" id="focus-modal">
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
      <button id="download-message" @click="shareMessage">
        <i class="uil uil-share-alt"></i>Share Message
      </button>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { useStore } from "../stores/store";

const store = useStore();

const shareMessage = () => {
  // Step 1: Include html2canvas library in your HTML file

  // Step 2: Select the element to capture
  const elementToCapture = document.getElementById("focus-modal");

  // Step 2: Use html2canvas to capture the element as an image
  html2canvas(elementToCapture, {
    backgroundColor: null,
  }).then((canvas) => {
    // Step 3: Convert the canvas to a Blob
    canvas.toBlob(function (blob) {
      // Step 4: Share the Blob using the Web Share API
      if (navigator.share) {
        navigator
          .share({
            files: [new File([blob], "screenshot.png", { type: "image/png" })],
            title: "Share anonymous message",
            text: "This is one of the anonymous message I received.",
          })
          .then(() => {
            console.log("Successfully shared!");
          })
          .catch((error) => {
            console.error("Error sharing:", error);

            // Get the image data as a base64-encoded string
            const imageData = canvas.toDataURL("image/png");

            // Step 4: Create a download link
            const downloadLink = document.createElement("a");
            downloadLink.setAttribute("href", imageData);
            downloadLink.setAttribute("download", "anon.png");

            // Step 5: Trigger the download
            downloadLink.click();
          });
      } else {
        console.error("Web Share API is not supported in this browser.");
        // Get the image data as a base64-encoded string
        const imageData = canvas.toDataURL("image/png");

        // Step 4: Create a download link
        const downloadLink = document.createElement("a");
        downloadLink.setAttribute("href", imageData);
        downloadLink.setAttribute("download", "anon.png");

        // Step 5: Trigger the download
        downloadLink.click();
      }
    }, "image/png");
  });
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_focus.scss";
</style>
