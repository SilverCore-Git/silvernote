<template>

  <div class=" flex flex-col justify-center items-center">

    <div class="loading-wave">
      <div class="loading-bar"></div>
      <div class="loading-bar"></div>
      <div class="loading-bar"></div>
      <div class="loading-bar"></div>
    </div>

    <img v-if="icon" class="w-[150px] mt-5" src="/favicon.svg" alt="">

  </div>

</template>

<style scoped>

    .loading-wave {
        width: 300px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }

    .loading-bar {
        width: 20px;
        height: 10px;
        margin: 0 5px;
        background-color: #F28C28;
        border-radius: 5px;
        animation: loading-wave-animation 1s ease-in-out infinite;
    }

    .loading-bar:nth-child(2) { animation-delay: 0.1s; }
    .loading-bar:nth-child(3) { animation-delay: 0.2s; }
    .loading-bar:nth-child(4) { animation-delay: 0.3s; }

    @keyframes loading-wave-animation {
        0%, 100% { height: 10px; }
        50% { height: 50px; }
    }

</style>


<script lang="ts" setup>

withDefaults(defineProps<{
  icon?: boolean;
}>(), {
  icon: true
})

</script>