<template>
  <div class="admin container center">
    <div class="admin__stats">
      <h4>Overview</h4>
      <div class="admin__stats-group">
        <div class="stats">
          <span class="stats__icon"><i class="uil uil-user"></i></span>
          <p class="stats__title">Total users</p>
          <h3 class="stats__number">{{ stats.users }}</h3>
        </div>
        <div class="stats">
          <span class="stats__icon"><i class="uil uil-envelope"></i></span>
          <p class="stats__title">Total Messages</p>
          <h3 class="stats__number">{{ stats.messages }}</h3>
        </div>
        <div class="stats">
          <span class="stats__icon"><i class="uil uil-apps"></i></span>
          <p class="stats__title">Total Groups</p>
          <h3 class="stats__number">{{ stats.group }}</h3>
        </div>
      </div>
    </div>

    <div class="admin__user">
      <header>
        <h4>Recent users</h4>
        <router-link to="/admin/users">View all</router-link>
      </header>
      <div class="admin__user-group">
        <div class="user" v-for="user in recentUsers" :key="recentUsers.id">
          <router-link to="/">
            <span class="user__number">{{
              recentUsers.indexOf(user) + 1
            }}</span>
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

// Admin store
const adminStore = useAdminStore();

// Dashboard stats
const { stats, recentUsers } = storeToRefs(adminStore);

adminStore.getStats();
adminStore.getCurrentUsers();
</script>

<style lang="scss" scoped>
@import "@/styles/views/admin/_home.scss";
</style>
