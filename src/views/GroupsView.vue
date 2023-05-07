<template>
  <div class="group container center">
    <div class="group__filled" v-if="allGroups.length > 0">
      <header>
        <h1>Groups</h1>
      </header>
      <div class="group__filled-container">
        <router-link
          :to="{ name: 'group', params: { groupName: group.name } }"
          class="pill"
          v-for="group in allGroups"
          :key="group?.id"
          >{{ group.name }} <i class="uil uil-trash-alt"></i
        ></router-link>

        <button class="pill" @click="groupModalIsActive = true">
          <i class="uil uil-plus"></i>Add new group
        </button>
      </div>
    </div>

    <!-- Empty state when group is empty -->
    <div class="group__empty" v-else>
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
        <form @submit.prevent="createNewGroup">
          <header>
            <h3>Add a new group</h3>

            <span class="close" tabindex="0" @click="groupModalIsActive = false"
              ><i class="uil uil-times"></i
            ></span>
          </header>

          <div class="input">
            <input
              type="text"
              id="name"
              v-model="createGroup.name"
              placeholder="Name" />
          </div>
          <div class="input">
            <textarea
              id="desc"
              cols="20"
              rows="10"
              v-model="createGroup.description"
              placeholder="Description..."></textarea>
          </div>
          <AppButton
            :class="{ loading: isLoading }"
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
import axios from "axios";

// APP Store
const store = useStore();

// Data from the app store
const {
  groupModalIsActive,
  isLoading,
  notification,
  token,
  createGroup,
  userDetails,
  allGroups,
} = storeToRefs(store);

// Create new group
const createNewGroup = () => {
  try {
    if (createGroup.value.name === "") {
      notification.value = "Group name is empty";
    } else if (
      createGroup.value.name !== "" &&
      createGroup.value.name.includes(" ")
    ) {
      store.notification = "Group name cannot contain space!";
    } else {
      // Set the loading state of the button
      isLoading.value = true;

      // API call
      axios
        .post(
          `/create_group/${userDetails.value?.id}`,
          {
            name: createGroup.value.name,
            description: createGroup.value.description,
          },
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          }
        )
        .then((response) => {
          if (response.data.status === "true") {
            isLoading.value = false;
            getAllGroups(userDetails.value?.username);

            createGroup.value = {
              name: "",
              description: "",
            };

            notification.value = response.data?.message;
            groupModalIsActive.value = false;
          }
        })
        .catch((error) => {
          console.log(error);
          isLoading.value = false;
        });
    }
  } catch (error) {
    console.log(error);
  }
};

// Get all groups
const getAllGroups = (username) => {
  axios
    .get(`/user_groups/${username}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then((response) => {
      if (response.data.status === "true") {
        allGroups.value = response.data.data;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// get user groups
getAllGroups(store.userDetails?.username);
</script>

<style lang="scss" scoped>
@import "../styles/views/_groups.scss";
</style>
