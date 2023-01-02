<template>
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
            https://quiett.fun/{{ username }}
          </p>
          <i class="uil uil-copy-alt" @click="copyToClipboard($event)"></i>
        </div>
        <div class="social-media">
          <a
            :href="
              generateLink(
                `https://api.whatsapp.com/send?text=Give a piece of your mind about me without trace🤫🤫  
                  
https://quiett.fun/${username}`
              )
            "
            target="_blank"
            rel="noopener noreferrer"
            ><i class="uil uil-whatsapp"></i
          ></a>
          <a
            :href="
              generateLink(
                `https://www.facebook.com/sharer/?u=https://quiett.fun/${username}`
              )
            "
            target="_blank"
            rel="noopener noreferrer"
            ><i class="uil uil-facebook-f"></i
          ></a>
          <a
            :href="
              generateLink(
                `https://twitter.com/intent/tweet?url=Give a piece of your mind about me without trace🤫🤫   
                  
https://quiett.fun/${username}`
              )
            "
            target="_blank"
            rel="noopener noreferrer"
            ><i class="uil uil-twitter"></i
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  username: {
    type: String,
    required: true,
    default: "",
  },
});

// Generate social media links
const generateLink = (link) => {
  return encodeURI(link);
};

// Copied link to clipboard
const copyToClipboard = (e) => {
  const link = document.getElementById("profile-link");

  if (navigator.clipboard) {
    navigator.clipboard.writeText(`${link.textContent}`);
    store.notification = "Link copied to clipboard";
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_profileshare.scss";
</style>
