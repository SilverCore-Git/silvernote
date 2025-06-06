
<template>

    <header class="flex flex-row pt-4 relative">

        <div class="left-arrow absolute left-4" @click="router.push('/')"></div>

        <div class="legal absolute right-4" @click="router.push('/legale')"></div>

    </header>

    <div class="flex flex-col justify-start relative items-start h-full ml-4 mr-4 mt-11 overflow-x-hidden">
        
        <section
            class="flex flex-col w-full gap-4"
            v-for="(section, sectionIndex) in Object.values(settings)"
            :key="sectionIndex"
        >

            <h1 
                style="font-family: 'Montserrat'" 
                class="text-2xl mb-1 font-bold"
                v-if="!isDevModSection(Object.keys(settings)[sectionIndex]) || isDevModeEnabled()"
            >
                Paramètres {{ Object.keys(settings)[sectionIndex] }}
            </h1>

            <label
                class="cursor-pointer w-full flex justify-between items-center"
                v-for="(option, optionIndex) in section"
                v-if="!isDevModSection(Object.keys(settings)[sectionIndex]) || isDevModeEnabled()"
                :for="`switch-${sectionIndex}-${optionIndex}`"
                :key="optionIndex"
            >

                <span>{{ option.name }}</span>

                <div class="switch flex flex-row">

                <div>

                    <input
                        :id="`switch-${sectionIndex}-${optionIndex}`"
                        type="checkbox"
                        v-model="option.active"
                    />

                    <span class="slider"></span>

                </div>

                </div>

            </label>

            <hr
                v-if="!isDevModSection(Object.keys(settings)[sectionIndex]) || isDevModeEnabled()"
                class="mb-2 mt-4 opacity-25"
            />
            
        </section>

    </div>

</template>

<script lang="ts" setup>

import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { settings as settingsObj } from '../assets/ts/settings';

const router = useRouter();

const settings = reactive(settingsObj);

const isDevModSection = (sectionName: string): boolean => {
    return sectionName == 'dev_mode';
}

const isDevModeEnabled = (): boolean => {

    const advenced = settings['avancé'];
    if (!advenced) return false;

    const devModeOption = advenced.find(opt => opt.name === 'Mode développeur');
    return devModeOption?.active ?? false;

}

</script>

<style scoped>

.legal {
  width: 30px;
  height: 30px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

.legal {
  background-image: url('../assets/svgs/legal.svg');
  filter: brightness(0) saturate(100%) invert(55%) sepia(65%) saturate(538%) hue-rotate(343deg) brightness(98%) contrast(98%);
}

</style>