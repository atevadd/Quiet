<template>
  <div class="message" v-if="true">
    <header>
      <h1>Your messages</h1>
      <p>
        Here are the messages you have recieved from friends, family, co-workers
        and all.
      </p>
    </header>
    <div class="message__container">
      <div class="message__item" v-for="message in 10" :key="message">
        <div class="message-info">
          <span>Anonymous</span>
          <span>&bull;</span>
          <span class="date">Jul 8, 2022 11:20 am</span>
        </div>
        <p class="message__recieved">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum
          explicabo culpa voluptates fugiat facere minima corporis autem libero
          quia similique?
        </p>
      </div>
    </div>
  </div>

  <!-- empty state -->
  <div class="empty" v-else>
    <div class="empty__container">
      <img src="@/assets/img/response-3d.png" alt="" />
      <h1>You have recieved no message</h1>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "@/styles/views/_message.scss";
</style>
