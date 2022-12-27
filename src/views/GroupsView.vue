<template>
  <div class="group container center">
    <!-- Empty state when group is empty -->
    <div class="group__empty">
      <div class="add-new">
        <button
          @click="groupModalIsActive = true"
          name="add group"
          type="button">
          <i class="uil uil-plus"></i>
        </button>
        <span aria-label="label">Add new group</span>
      </div>
    </div>

    <!-- Group modal -->
    <div class="group__modal" v-show="groupModalIsActive">
      <div class="group__modal-container">
        <form>
          <header>
            <h3>Add a new group</h3>

            <span class="close" tabindex="0" @click="groupModalIsActive = false"
              ><i class="uil uil-times"></i
            ></span>
          </header>

          <div class="input">
            <input type="text" id="name" placeholder="Name" />
          </div>
          <div class="input">
            <textarea
              id="desc"
              cols="20"
              rows="10"
              placeholder="Description..."></textarea>
          </div>
          <AppButton
            :class="{ loading: store.isLoading }"
            id="login__cta"
            type="submit"
            >Create group</AppButton
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import AppButton from "../components/AppButton.vue";
import { useStore } from "../stores/store";

// APP Store
const store = useStore();

// Data from the app store
const { groupModalIsActive } = storeToRefs(store);
</script>

<style lang="scss" scoped>
@import "../styles/views/group";
</style>
