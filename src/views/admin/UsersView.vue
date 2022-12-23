<template>
  <div class="admin container center">
    <div class="admin__users">
      <header>
        <h4>All users</h4>
      </header>

      <div class="admin__users__list">
        <div class="user" v-for="user in allUsers" :key="user.id">
          <router-link to="/">
            <span class="user__number">{{ user.id }}</span>
            <p class="user__name">{{ user.username }}</p>
            <p class="user__email">{{ user.email }}</p>
            <p class="user__date">
              {{ moment(user.created_at).format("lll") }}
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { storeToRefs } from "pinia";
import { useAdminStore } from "../../stores/admin";

const adminStore = useAdminStore();

const { allUsers } = storeToRefs(adminStore);

// get all users
adminStore.getAllUsers();
</script>

<style lang="scss" scoped>
@import "@/styles/views/admin/_users.scss";
</style>
