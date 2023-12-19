<template>
    <AdminLayout>
        <div class="mt-12 flex gap-8">
            <div class="flex-1 border flex flex-col h-fit">
                <div class="pt-12 px-8 text-center flex justify-center flex-col w-full items-center">
                    <img :src="getAvatarSrc" alt="" class="h-24 w-24 object-cover" />

                    <h3 class="font-semibold text-lg text-black my-2">{{ userData.name }}</h3>
                    <div class="p-2 text-center bg-[#f2f2f3] text-[#a8aaae] w-fit text-xs">{{ roleText }}</div>
                    <div class="border w-full my-6"></div>
                </div>
                <div class="px-8">
                    <p class="uppercase text-[#a8aaae] font-medium text-sm">Details</p>
                    <div class="mt-4">
                        <span class="font-medium text-sm">Email: </span>
                        <span>{{ userData.email }}</span>
                    </div>
                    <div class="mt-4">
                        <span class="font-medium text-sm">Phonenumber: </span>
                        <span>{{ userData.phoneNumber }}</span>
                    </div>
                    <div class="mt-4">
                        <span class="font-medium text-sm">Date Of Birth: </span>
                        <span>{{ userData.DOB }}</span>
                    </div>
                    <div class="mt-4">
                        <span class="font-medium text-sm">Address: </span>
                        <span>{{ userData.address }}</span>
                    </div>
                </div>
                <div class="flex gap-4 my-4 m-auto">
                    <UButton color="primary" variant="solid" size="xl">Edit</UButton>
                    <UButton color="red" variant="outline" size="xl">Delete</UButton>
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
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '~/layouts/AdminLayout.vue';
import axios from 'axios';
import avatarStudent from '@/assets/images/avatar_student.jpg';
import avatarTeacher from '@/assets/images/avatar_teacher.jpg';

let userData = ref({
    email: '',
    name: '',
    phoneNumber: '',
    DOB: '',
    role: 0,
    address: '',
});

async function loadData() {
    try {
        const id = route.params.id;
        const response = await axios.get(`http://localhost:5000/api/user/getUserInfor/${id}`);
        userData.value = response.data.userData;
    } catch (error) {
        console.error(error);
    }
}
onMounted(loadData);

const route = useRoute()
const roleText = computed(() => {
    return userData.value.role === 0 ? 'Student' : 'Teacher';
});
const getAvatarSrc = computed(() => {
  if (userData.value.role === 0) {
    return avatarStudent;
  } else {
    return avatarTeacher;
  }
});

console.log(getAvatarSrc)
const links = ref([
    { name: 'Account', path: 'admin-users-id', url: `/admin/users/${route.params.id}`, icon: 'material-symbols:person-check-rounded' },
    { name: 'Security', path: 'admin-users-id-security', url: `/admin/users/${route.params.id}/security`, icon: 'material-symbols:lock-open-outline-rounded' },
])

</script>
