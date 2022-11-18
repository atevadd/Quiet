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
#page {
  width: 100%;
  min-height: 100vh;
  // border: 6px solid red;
  background-color: $brand-color;
  // display: grid;

  // @include mobile {
  //   grid-template-columns: repeat(1, minmax(0, 1fr));
  // }
  // @include tablet {
  //   grid-template-columns: repeat(1, minmax(0, 1fr));
  // }
  // @include laptop {
  //   grid-template-columns: repeat(1, minmax(0, 1fr));
  // }
  // @include desktop {
  //   grid-template-columns: repeat(1, minmax(0, 1fr));
  // }

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
