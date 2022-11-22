<template>
  <main class="profile">
    <h1>John's profile</h1>
    <div class="profile__container">
      <div class="profile__link">
        <h3>Share your profile link</h3>
        <p>
          Friends, family, co-workers, or anyone can write you an anonymous
          message when you share your link
        </p>

        <div class="link-container">
          <div class="link">
            <p id="profile-link" @click="copyToClipboard($event)">
              https://quiett.fun/atevadd
            </p>
            <i class="uil uil-copy-alt" @click="copyToClipboard($event)"></i>
          </div>
          <div class="social-media">
            <a
              :href="
                generateLink(
                  `https://api.whatsapp.com/send?text=Give a piece of your mind without trace https://quiett.fun/atevadd`
                )
              "
              target="_blank"
              ><i class="uil uil-whatsapp"></i
            ></a>
            <a
              :href="
                generateLink(
                  `https://www.facebook.com/sharer/?u=https://quiett.fun/atevadd`
                )
              "
              target="_blank"
              ><i class="uil uil-facebook-f"></i
            ></a>
            <a
              :href="
                generateLink(
                  `https://twitter.com/intent/tweet?url=Give a piece of your mind without trace using this link https://quiett.fun/atevadd`
                )
              "
              target="_blank"
              ><i class="uil uil-twitter"></i
            ></a>
          </div>
        </div>
      </div>
    </div>
    <p class="profile__messages">
      <router-link :to="{ name: 'message' }"
        >View messages <i class="uil uil-arrow-right"></i
      ></router-link>
    </p>
  </main>
</template>

<script setup>
// Generate social media links
const generateLink = (link) => {
  return encodeURI(link);
};

const copyToClipboard = (e) => {
  const link = document.getElementById("profile-link");

  if (navigator.clipboard) {
    navigator.clipboard.writeText(link.textContent);
  }

  console.log("copied for clipboard");
};
</script>

<style lang="scss" scoped>
@import "@/styles/views/_profile.scss";
</style>
