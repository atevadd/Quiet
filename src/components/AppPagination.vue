<template>
  <div>
    <button @click="backPage">prev</button>
    <button
      v-for="item in Math.ceil(paginationData.length / perPage)"
      :key="item"
      @click="() => goToPage(item)">
      {{ item }}
    </button>
    <button @click="nextPage">next</button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  paginationData: {
    type: Array,
    required: true,
    default: [],
  },
  perPage: {
    type: Number,
    required: true,
    default: 15,
  },
  page: {
    type: Number,
    required: true,
    default: 1,
  },
});

// current page
let page = ref(props.page);

// content per page
const perPage = props.perPage;

const data = props.paginationData.map((item) => {
  return item;
});

const paginatedData = computed(() =>
  props.paginationData.slice((page.value - 1) * perPage, page.value * perPage)
);

const nextPage = () => {
  if (page.value !== Math.ceil(data.length / perPage)) {
    page.value += 1;
  }
};

const backPage = () => {
  if (page.value !== 1) {
    page.value -= 1;
  }
};

const goToPage = (numPage) => {
  page.value = numPage;
};
</script>

<style lang="scss" scoped></style>
