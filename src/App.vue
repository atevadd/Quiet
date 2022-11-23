<script setup>
import BaseNavbar from "./components/BaseNavbar.vue";
</script>

<template>
  <div id="page">
    <BaseNavbar />
    <RouterView />
  </div>
</template>

<style lang="scss">
@import "@/styles/main.scss";

#page {
  width: 100%;
  min-height: 100vh;
  background-color: $brand-color;

  & > header {
    align-items: flex-start;
  }
}

.container {
  @include mobile {
    width: 90%;
  }
  @include tablet {
    width: 90%;
  }
  @include laptop {
    width: 90%;
  }
  @include desktop {
    width: 90%;
  }
}

.center {
  margin-inline: auto;
}
</style>
