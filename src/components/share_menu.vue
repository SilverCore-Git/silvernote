<template>
  <teleport to="body">
    <div
      v-if="visible"
      class="fixed right-0 left-0 bottom-0 z-50 flex items-end justify-center px-4"
    >
      <div class="bg-white rounded-md p-4 m-3 mb-25 w-full max-w-sm text-sm">
        <ul class="flex flex-row gap-3">
          <!-- Share button with inline SVG -->
          <li>
            <button class="icon-button">
              <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M15.75 5.125a3.125 3.125 0 1 1 .754 2.035l-8.397 3.9a3.124 3.124 0 0 1 0 1.88l8.397 3.9a3.125 3.125 0 1 1-.61 1.095l-8.397-3.9a3.125 3.125 0 1 1 0-4.07l8.397-3.9a3.125 3.125 0 0 1-.144-.94Z"
                />
              </svg>
            </button>
          </li>

          <li>
            <button class="icon-button"/>
          </li>

          <li>
            <button class="icon-button" :style="{ backgroundImage: `url(${watsapp_svg})` }" />
          </li>
        </ul>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import discord_svg from '../assets/svgs/social/discord.svg?url'
import watsapp_svg from '../assets/svgs/social/watsapp.svg?url'

defineProps<{
  visible: boolean
}>()
</script>

<style scoped>
.icon-button {
  width: 30px;
  height: 30px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 0;
}
</style>
