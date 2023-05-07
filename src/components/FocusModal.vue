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
      <button id="download-message" @click="downloadMessage">
        <i class="uil uil-share-alt"></i>Share Message
      </button>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { useStore } from "../stores/store";

const store = useStore();

const downloadMessage = () => {
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
          })
          .then(() => {
            console.log("Successfully shared!");
          })
          .catch((error) => {
            console.error("Error sharing:", error);
          });
      } else {
        console.error("Web Share API is not supported in this browser.");
      }
    }, "image/png");
  });

  // elementToCapture.style.fontFeatureSettings = '"liga" 0';
  // // Step 3: Capture the element as an image
  // html2canvas(elementToCapture, {
  //   backgroundColor: null,
  // }).then(async (canvas) => {
  //   // Get the image data as a base64-encoded string
  //   const imageData = canvas.toDataURL("image/png");

  //   // Step 4: Share using Web Share API
  //   if (navigator.share) {
  //     await navigator
  //       .share({
  //         title: "Anonymous Message",
  //         text: "Check out this anonymous message!",
  //         url: imageData,
  //       })
  //       .then(() => console.log("Screenshot shared successfully."))
  //       .catch((error) => {
  //         console.error("Error occured.");
  //         // Get the image data as a base64-encoded string
  //         const imageData = canvas.toDataURL("image/png");

  //         // Step 4: Create a download link
  //         const downloadLink = document.createElement("a");
  //         downloadLink.setAttribute("href", imageData);
  //         downloadLink.setAttribute("download", "anon.png");

  //         // Step 5: Trigger the download
  //         downloadLink.click();
  //       });
  //   } else {
  //     console.error("Web Share API not supported.");

  //     // Get the image data as a base64-encoded string
  //     const imageData = canvas.toDataURL("image/png");

  //     // Step 4: Create a download link
  //     const downloadLink = document.createElement("a");
  //     downloadLink.setAttribute("href", imageData);
  //     downloadLink.setAttribute("download", "anon.png");

  //     // Step 5: Trigger the download
  //     downloadLink.click();
  //   }
  // });

  // // Step 3: Capture the element as an image
  // html2canvas(elementToCapture).then((canvas) => {
  //   // Get the image data as a base64-encoded string
  //   const imageData = canvas.toDataURL("image/png");

  //   // Step 4: Create a download link
  //   const downloadLink = document.createElement("a");
  //   downloadLink.setAttribute("href", imageData);
  //   downloadLink.setAttribute("download", "anon.png");

  //   // Step 5: Trigger the download
  //   downloadLink.click();
  // });

  // Step 1: Select the element to capture
  // const elementToCapture = document.getElementById("focus-modal");

  // // // Step 2: Create a temporary canvas
  // // const canvas = document.createElement("canvas");

  // // // Step 3: Get the dimensions of the element
  // // const elementWidth = elementToCapture.offsetWidth;
  // // const elementHeight = elementToCapture.offsetHeight;

  // // // Step 4: Set the canvas dimensions
  // // canvas.width = elementWidth;
  // // canvas.height = elementHeight;

  // // // Step 5: Get the canvas context
  // // const context = canvas.getContext("2d");

  // // // Step 6: Convert the element to an HTMLImageElement
  // // const image = new Image();

  // // // Step 7: Serialize the SVG content of the element
  // // const serializer = new XMLSerializer();
  // // const svgString = serializer.serializeToString(elementToCapture);
  // // const encodedSvg = encodeURIComponent(svgString);
  // // console.log(svgString);
  // // image.src = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;

  // // // Step 8: Wait for the image to load
  // // image.onload = function () {
  // //   // Step 9: Draw the element on the canvas
  // //   context.drawImage(image, 0, 0, elementWidth, elementHeight);

  // //   // Step 10: Capture the image data
  // //   canvas.toBlob(function (blob) {
  // //     // Create a download link for the captured image
  // //     const downloadLink = document.createElement("a");
  // //     downloadLink.href = URL.createObjectURL(blob);
  // //     downloadLink.download = "screenshot.png";

  // //     // Trigger the download
  // //     downloadLink.click();
  // //   });
  // // };
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_focus.scss";
</style>
