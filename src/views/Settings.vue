<template>

    <header class="flex flex-row pt-4 relative">
        <div class="left-arrow absolute left-4" @click="router.push('/')"></div>
    </header>

    <div class="flex flex-col justify-start relative items-start h-full  ml-4 mr-4 mt-11 overflow-x-hidden">

        <section 
            class="flex flex-col w-full gap-2" 
            v-for="(section, index) in settings" 
            :key="index"
        >

            <h1 style="font-family: 'Montserrat'" class="text-2xl mb-1 font-bold">Paramettres {{ section.index }}</h1>

            <label 
                for="dev_mod" 
                class="cursor-pointer w-full flex justify-between"
                v-for="(option, index) in settings[index]"
            >

                <span>{{ option.name }}</span>

                <label class="switch flex flex-row">
                
                    <div>
                
                        <input id="dev_mod" type="checkbox" v-model="checked" />
                        <span class="slider"></span>
                
                    </div>
                
                </label>

            </label>

            <label for="option2" class="cursor-pointer w-full flex justify-between">

                <span>Option 2 olala</span>

                <label class="switch flex flex-row">
                
                    <div>
                
                        <input id="option2" type="checkbox" v-model="checked2" />
                        <span class="slider"></span>
                
                    </div>
                
                </label>

            </label>

        </section>

    </div>

</template>


<script lang="ts" setup>

    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    import { settings } from '../assets/ts/settings';

    const router = useRouter();
    const checked = ref<boolean>(false);
    const checked2 = ref<boolean>(false);

</script>