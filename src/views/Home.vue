
<template>

    <header style="font-family: 'Montserrat', sans-serif; box-shadow: 0 0 15px #36363681;" class="mb-5 top-0 left-0 w-full h-14 text-2xl bg-[#F28C28] text-white font-bold flex items-center justify-center">
        <h1 class="absolute left-4">SilverNote</h1>
        <!-- <div class="gear-svg absolute right-14"></div> -->
        <div class="ellipsis-svg absolute right-4" @click="if_open_dropdown=!if_open_dropdown"></div>

        <transition name="fade-slide">
        <div 
            v-if="if_open_dropdown"
            class="dropdown absolute top-14 right-3 bg-[#F28C28] 
                z-50 min-w-[150px] w-[40%] flex flex-col justify-center items-center p-3"
        >
            <ul class="text-xl">
            <li>Paramètre</li>
            <li>Aide</li>
            <li>Légal</li>
            </ul>
        </div>
        </transition>

    </header>

    <div @click="if_open_dropdown=false">

        <Danger_card style="box-shadow: 0 0 15px #3636364f;" class="mb-6" title="Tip of the week" content="You can create a new note with +" />

        <div class="overflow-y-auto h-[60vh]">

            <ul>

                <li class="flex flex-col" v-for="(note, index) in list_notes" :key="index">
                    <Note_card 
                        :id="note.id"
                        :pinned="note.pinned"
                        class="mb-3" :title="note.title" 
                        :content="note.content" 
                        :date="note.date" 
                    />
                </li>

            </ul>

        </div>
    
        <div style="box-shadow: 0 0 15px #3636364f;" class="bg-[#FFF8F0] h-30 w-full z-50 absolute bottom-0">
            <button @click="create_new_note" class="add-note-btn cursor-pointer flex items-center justify-center absolute right-4 left-4 bottom-8"><div class="add-note-svg"></div></button>
        </div>

    </div>


</template>

<script setup lang='ts'>

    import { useRouter } from 'vue-router';
    import { ref } from 'vue';

    import { list_notes } from '../assets/ts/use_notes';

    import Danger_card from '../components/Danger_card.vue';
    import Note_card from '../components/Note_card.vue';

    const router = useRouter();

    const create_new_note = () => {
        router.push('/edit')
    };

    const if_open_dropdown = ref(false);

</script>

<style scoped>

    .gear-svg {
        width: 30px;
        height: 30px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url('../assets/svgs/gear.svg');
        filter: invert(1);
        transition: all 0.3s ease;
    }

    .gear-svg:hover {
        transform: rotate(90deg);
    }

    .gear-svg:active {
        transform: rotate(190deg);
    }

    .ellipsis-svg {
        cursor: pointer;
        width: 30px;
        height: 30px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url('../assets/svgs/ellipsis.svg');
        filter: invert(1);
        transition: all 0.3s ease;
    }

    .dropdown {
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
        box-shadow: 0 15px 15px #36363681;
    }

    .dropdown ul li {
        cursor: pointer;
        transition: all 0.3s;
    }

    .dropdown ul li:hover {
        color: #fff2d0;
    }

    .add-note-btn {
        background-color: #F28C28;
        border-radius: 15px;
        height: 55px;
        transition: all 0.3s;
    }

    .add-note-btn:hover {
        transform: scale(1.02);
    }

    .add-note-btn:active {
        transform: scale(0.98);
    }

    .add-note-svg {

        -webkit-mask-image: url('../assets/svgs/plus.svg');
        mask-image: url('../assets/svgs/plus.svg');
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: contain;
        mask-size: contain;
        background-color: #FFF8F0;
        width: 55px;
        height: 55px;
    }

    .fade-slide-enter-active,
    .fade-slide-leave-active {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .fade-slide-enter-from,
    .fade-slide-leave-to {
        opacity: 0;
        transform: translateY(-10px);
    }

    .fade-slide-enter-to,
    .fade-slide-leave-from {
        opacity: 1;
        transform: translateY(0);
    }

</style>