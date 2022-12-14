<template>
  <div class="loader" v-show="loaderIsActive">
    <div class="lds-dual-ring"></div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useStore } from "../stores/store";

const store = useStore();

const { loaderIsActive } = storeToRefs(store);
</script>

<style lang="scss" scoped>
@import "@/styles/components/_loader.scss";
</style>
