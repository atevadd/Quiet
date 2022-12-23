import { ref, computed } from "vue";

export default function handlePagination() {
  // current page
  let page = ref(1);

  const data = Array.from(Array(24).keys()).map((item) => {
    return { index: item, value: `this_${item}` };
  });

  // content per page
  const perPage = 20;

  const paginatedData = computed(() =>
    data.slice((page.value - 1) * perPage, page.value * perPage)
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

  return { data, paginatedData, perPage, page, nextPage, backPage, goToPage };
}
