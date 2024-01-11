<template>
    <StudentLayout>
        <div class="mt-12 flex gap-8">
            <div class="flex-1 border flex flex-col h-fit">
                <div class="pt-12 px-8 text-center flex justify-center flex-col w-full items-center">
                    <img src="https://static.vecteezy.com/system/resources/previews/009/385/472/non_2x/school-desk-clipart-design-illustration-free-png.png"
                        alt="" class="h-24 w-24 object-cover" />

                    <h3 class="font-semibold text-lg text-black my-2">{{ projectInfo.projectName }}</h3>
                    <div class="border w-full my-6"></div>
                </div>
                <div class="px-8">
                    <p class="uppercase text-[#a8aaae] font-medium text-sm">Details</p>
                    <div class="mt-4">
                        <span class="font-medium text-sm">Name: </span>
                        <span>{{ projectInfo.projectName }}</span>
                    </div>
                    <div class="mt-4">
                        <span class="font-medium text-sm">Description: </span>
                        <span>{{ projectInfo.description }}</span>
                    </div>
                    <div class="mt-4">
                        <span class="font-medium text-sm">State: </span>
                        <span>{{ projectInfo.isApproved }}</span>
                    </div>
                    <div class="mt-4">
                        <span class="font-medium text-sm">Guidance Score: </span>
                        <span>0</span>
                    </div>
                    <div class="mt-4">
                        <span class="font-medium text-sm">Execution Score: </span>
                        <span>0</span>
                    </div>
                    <div class="mt-4">
                        <span class="font-medium text-sm">Defense Score: </span>
                        <span>0</span>
                    </div>
                    <div class="mt-4">
                        <span class="font-medium text-sm">Final Project Score: </span>
                        <span>0</span>
                    </div>
                    <div class="mt-4">
                    </div>
                </div>
            </div>
            <div class="flex-[2]">
                <div class="w-full flex gap-4">
                    <template v-for="link in links">
                        <NuxtLink :to="link.url" class="flex gap-2 items-center justify-center py-2 px-4  rounded-md"
                            :class="route.name === link.path ? 'bg-primay font-medium text-white' : 'hover:text-primay'">
                            <Icon :name="link.icon" />
                            {{ link.name }}
                        </NuxtLink>
                    </template>
                </div>
                <NuxtPage />
            </div>
        </div>
    </StudentLayout>
</template> 

<script setup lang="ts">
import StudentLayout from '../layouts/StudentLayout.vue';
import axios from 'axios';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
const route = useRoute()
const toast = useToast();

const projectInfo = ref({
    _id: '',
    projectName: '',
    description: '',
    isApproved: '',
    listMark: '',
    date_created: ''
});

async function loadData() {
    try {
        const token = localStorage.getItem('token');
        const userId = process.client ? localStorage.getItem('_id') : '';
        const id = route.params.id;
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const response = await axios.get(`http://localhost:5000/api/project/${userId}/${id}`, { headers });

        const projectData = response.data[0];

        projectInfo.value = {
            ...projectData,
            isApproved: projectData.isApproved ? 'Đã xét duyệt' : 'Chưa được xét duyệt'
        };
    } catch (error) {
        console.error(error);
    }
}

onMounted(loadData)

const links = ref([
    { name: 'Students', path: 'student-project-id', url: `/student/project/${route.params.id}`, icon: 'material-symbols:person-check-rounded' },
])
</script>
 