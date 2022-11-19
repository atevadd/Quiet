<template>
  <div class="input">
    <input
      :type="type"
      :id="id"
      v-bind="$attrs"
      :value="modelValue"
      class="input__field" />
    <label :for="id" class="input__label">{{ label }}</label>
    <i
      class="uil uil-eye"
      @click="togglePasswordVisibility($event)"
      v-show="type === 'password'"></i>
  </div>
</template>

<script setup>
// PROPS
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

// EMITS
defineEmits(["update:modelValue"]);

// Password toggle
const togglePasswordVisibility = (event) => {
  const passwordInput = event.target.parentElement.firstElementChild;

  if (passwordInput.type == "password") {
    passwordInput.type = "text";
    event.target.className = "uil uil-eye-slash";
  } else {
    passwordInput.type = "password";
    event.target.className = "uil uil-eye";
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_input.scss";
</style>
