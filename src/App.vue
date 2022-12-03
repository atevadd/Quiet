<script setup>
import BaseNavbar from "./components/BaseNavbar.vue";
</script>

<template>
  <div id="page">
    <BaseNavbar />
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
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

.page-enter-active,
.page-leave-active {
  transition: all 0.15s ease-out;
}
.page-enter-to {
  opacity: 1;
  // transform: translateY(0px);
}
.page-enter-from {
  opacity: 0;
  // transform: translateY(1000px);
}
.page-leave-to {
  opacity: 0;
}
.page-leave-from {
  opacity: 1;
}
</style>
