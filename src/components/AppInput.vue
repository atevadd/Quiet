<template>
  <div class="input">
    <input
      type="text"
      :id="id"
      v-bind="$attrs"
      :value="modelValue"
      class="input__field" />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
    default: "input",
  },
  type: {
    type: String,
    required: true,
    default: "text",
  },
  label: {
    type: String,
    default: "Name",
  },
  modelValue: {
    type: String,
  },
});

defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
@import "@/styles/components/_input.scss";
</style>
