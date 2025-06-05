<template>

  <div
    class="note-card bg-[#FFF8F0] mr-4 ml-4 text-[#3B3B3B] p-3 border-[#3B3B3B] border-2 relative cursor-pointer"
    style="border-radius: 15px;"
    @click="open_note"
  > 
    <p class="font-bold text-xl w-[80%] whitespace-nowrap overflow-hidden text-ellipsis">{{ title }}</p>

    <div class="absolute right-0 top-3 h-full flex flex-row-reverse gap-1.5">

      <div
        class="ellipsis "
        @click.stop="dropdown = !dropdown"
      ></div>

      <transition name="fade-slide">

        <div 
          class=" absolute top-8 right-1 bg-red-600 p-2 min-w-full min-h-full z-30"
          v-if="dropdown"
        >

          <ul>

            <li>Ouvrir</li>
            <li>Envoyer</li>
            <li>Suprimer</li>

          </ul>

        </div>

      </transition>

      <!-- <div
        class="bin"
        @click.stop=""
      ></div> -->

      <div
        class="pin"
        :style="{
          backgroundImage: if_pin_active
            ? `url(${pinFull})`
            : `url(${pinEmpty})`,
        }"
        @click.stop="change_pin_state"
      ></div>

    </div>

    <p 
      class="text-mb mb-3 w-[65%] whitespace-nowrap overflow-hidden text-ellipsis"
    >
      {{ content }}
    </p>

    <div class="absolute left-1 bottom-1 w-[60%] whitespace-nowrap overflow-x-auto text-ellipsis scrollbar-none">
      <span v-for="(tag, index) in tags" :key="index" class="ml-2 underline">{{ tag.name }}</span>
    </div>
    <label class="absolute right-2 bottom-1 z-10">{{ date }}</label>

  </div>

</template>

<script setup lang="ts">

import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import db from '../assets/ts/database';
import type { Tag } from '../assets/ts/type';

import pinFull from '/assets/webp/pin_plein.webp?url';
import pinEmpty from '/assets/webp/pin_vide.webp?url';

const router = useRouter()

const props = defineProps<{
  title: string
  content: string
  date: string
  pinned: boolean
  tags: number[]
  simply_edit: boolean
  id: number
}>()

const all_tags = ref<Tag[]>([]);
let tags: any = null;
const if_pin_active = ref<boolean>(props.pinned)
const dropdown = ref<boolean>(false);

const change_pin_state = async () => {
  await db.togle_pinned(props.id);
  if_pin_active.value = !if_pin_active.value;
};

const open_note = () => {
  router.push(`/edit?id=${props.id}&pinned=${if_pin_active.value}&simply_edit=${props.simply_edit}`)
}

onMounted(async () => {
  all_tags.value = await db.getAll('tags');
  tags = all_tags.value.filter(tag => props.tags.includes(tag.id));
});

watch(() => props.pinned, (newVal) => {
  if_pin_active.value = newVal
})

</script>

<style scoped>

.bin {
    width: 30px;
    height: 30px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url('/assets/svgs/bin.svg');
    filter: invert(55%) sepia(79%) saturate(558%) hue-rotate(342deg) brightness(93%) contrast(89%);
    transition: all 0.3s ease;
}

.ellipsis {
    width: 30px;
    height: 30px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url('/assets/svgs/ellipsis.svg');
    filter: invert(55%) sepia(79%) saturate(558%) hue-rotate(342deg) brightness(93%) contrast(89%);
    transition: all 0.3s ease;
}

.pin {
  width: 25px;
  height: 25px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

</style>
