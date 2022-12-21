<template>
  <div class="admin container center">
    <div class="admin__users">
      <header>
        <h4>All users</h4>
      </header>

      <div class="admin__users__list">
        <div class="user" v-for="stats in 10" :key="stats">
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
@import "@/styles/views/admin/_users.scss";
</style>
