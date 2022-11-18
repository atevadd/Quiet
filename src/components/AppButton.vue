<template>
  <button v-bind="$attrs" class="btn">
    <slot></slot>
  </button>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "@/styles/components/_button.scss";
</style>
