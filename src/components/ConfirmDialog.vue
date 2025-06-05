<template>
  <teleport to="body">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 class="text-lg font-semibold mb-4">{{ title }}</h2>
        <p class="mb-6">{{ message }}</p>
        <div class="flex justify-end gap-3">
          <button
            class="px-4 py-2 rounded border hover:bg-gray-100"
            @click="cancel"
          >
            Annuler
          </button>
          <button
            class="px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700"
            @click="confirm"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">

import { defineProps, defineEmits } from 'vue'

defineProps<{
  visible: boolean
  title?: string
  message: string
}>()

const emits = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const confirm = () => emits('confirm')
const cancel = () => emits('cancel')

</script>
