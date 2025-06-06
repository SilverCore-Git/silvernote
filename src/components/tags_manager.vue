<template>

  <teleport to="body">

    <div
      class="fixed inset-0 z-50 flex items-center justify-center px-4"
    >

      <div 
        class="bg-[#FFF8F0] rounded-md p-4 m-3 mb-25 w-full max-w-sm text-sm flex flex-col items-center justify-center"
        style="border-radius: 15px; box-shadow: 0 0 10px #3336;"
      >

        <h1 class="text-2xl font-bold" style="font-family: 'Montserrat'; letter-spacing: 2px;">Gérer les dossiers</h1>
        <span>séléctionez les dossiers contenant la note</span>

        <ul class="flex flex-col items-center gap-5">
          
            <li
                v-for="(tag, index) in tags"
                :key="index"
            >
                <span>{{ tag.name }}</span>
            </li>

        </ul>
      
      </div>
    
    </div>
  
  </teleport>

</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue';

import db from '../assets/ts/database';
import type { Tag } from '../assets/ts/type';

const tags = ref<Tag[] | undefined>(undefined);

onMounted(async () => {
    tags.value = await db.getAll('tags');
});

</script>

<style scoped>

</style>
