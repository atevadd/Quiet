<template>
  <div class="admin container center">
    <div class="admin__stats">
      <h4>Overview</h4>
      <div class="admin__stats-group">
        <div class="stats">
          <span class="stats__icon"><i class="uil uil-user"></i></span>
          <p class="stats__title">Total users</p>
          <h3 class="stats__number">200</h3>
        </div>
        <div class="stats">
          <span class="stats__icon"><i class="uil uil-envelope"></i></span>
          <p class="stats__title">Total Messages</p>
          <h3 class="stats__number">200</h3>
        </div>
        <div class="stats">
          <span class="stats__icon"><i class="uil uil-apps"></i></span>
          <p class="stats__title">Total Groups</p>
          <h3 class="stats__number">200</h3>
        </div>
      </div>
    </div>

    <div class="admin__user">
      <header>
        <h4>Recent users</h4>
        <router-link to="/admin/users">View all</router-link>
      </header>
      <div class="admin__user-group">
        <div class="user" v-for="stats in 5" :key="stats">
          <router-link to="/">
            <span class="user__number">{{ stats }}</span>
            <p class="user__name">Johhny</p>
            <p class="user__email">Johndoe@gmail.com</p>
            <p class="user__date">
              {{ moment("Wed Dec 21 2022 13:42:53 GMT+0100").format("lll") }}
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
</script>

<style lang="scss" scoped>
@import "@/styles/views/admin/_home.scss";
</style>
