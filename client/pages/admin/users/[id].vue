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
                        <span>{{ formattedDOB }}</span>
                    </div>
                    <div class="mt-4">
                        <span class="font-medium text-sm">Address: </span>
                        <span>{{ userData.address }}</span>
                    </div>
                </div>
                <div class="flex gap-4 my-4 m-auto">
                    <UButton color="primary" variant="solid" size="xl" @click="isOpen = true">Edit</UButton>
                    <UButton color="red" variant="outline" size="xl" @click="openDeleteModal">Delete</UButton>
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
        <template>
            <div>
                <UModal v-model="isOpen" prevent-close>
                    <UCard :ui="{
                        ring: '',
                        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                    }">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                    Add a new user
                                </h3>
                                <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                                    @click="isOpen = false" />
                            </div>
                        </template>
                        <UForm :schema="schema" :state="state" @submit="submit">
                            <div class="flex gap-4">
                                <UFormGroup class="mb-4 flex-1" label="First Name" name="name">
                                    <UInput v-model="state.firstName" placeholder="First Name" />
                                </UFormGroup>
                                <UFormGroup class="mb-4 flex-1" label="Last Name" name="lastName">
                                    <UInput v-model="state.lastName" placeholder="Last Name" />
                                </UFormGroup>
                            </div>
                            <UFormGroup class="mb-4 flex-1" label="Email" name="email">
                                <UInput v-model="state.email" placeholder="Email" />
                            </UFormGroup>
                            <div class="flex gap-4">
                                <UFormGroup class="mb-4 flex-1" label="Password" name="password">
                                    <UInput v-model="state.password" type="password" placeholder="Enter your password" />
                                </UFormGroup>
                                <UFormGroup class="mb-4 flex-1" label="Confirm Password" name="confirmPassword">
                                    <UInput v-model="state.password" type="password"
                                        placeholder="Enter your confirm password" />
                                </UFormGroup>
                            </div>
                            <div class="flex gap-4">
                                <UFormGroup class="mb-4 flex-1" label="User role" name="role">
                                    <USelect v-model="state.role" :options="roles" />
                                </UFormGroup>
                                <UFormGroup class="mb-4 flex-1" label="User role" name="role">
                                    <USelect v-model="state.role" :options="roles" />
                                </UFormGroup>
                            </div>
                            <UButton type="submit"> Submit </UButton>
                        </UForm>
                    </UCard>
                </UModal>
            </div>
        </template>
        <template>
            <UModal v-model="isDeleteModalOpen" prevent-close>
                <UCard>
                    <div class="text-center p-6">
                        <h3 class="text-lg font-semibold mb-4">Do you want to delete this account?</h3>
                        <div class="flex justify-center gap-4">
                            <UButton color="red" variant="solid" @click="deleteAccount">Accept</UButton>
                            <UButton color="gray" variant="ghost" @click="closeDeleteModal">Cancel</UButton>
                        </div>
                    </div>
                </UCard>
            </UModal>

        </template>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '~/layouts/AdminLayout.vue';
import axios from 'axios';
import avatarStudent from '@/assets/images/avatar_student.jpg';
import avatarTeacher from '@/assets/images/avatar_teacher.jpg';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const route = useRoute()
const toast = useToast();

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

const isOpen = ref(false);
const isDeleteModalOpen = ref(false);

const roles = ["Admin", "Teacher", "Student"];

const state = ref({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    class: undefined,
    password: undefined,
    confirmPassword: undefined,
    role: roles[0],
});

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

const formattedDOB = computed(() => {
    const rawDOB = userData.value.DOB;
    if (rawDOB) {
        const date = new Date(rawDOB);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    return '';
});

function openDeleteModal() {
    isDeleteModalOpen.value = true;
}

function closeDeleteModal() {
    isDeleteModalOpen.value = false;
}

async function deleteAccount() {
    const router = useRouter();
    try {
        const id = route.params.id;
        const response = await axios.delete(`http://localhost:5000/api/user/deleteUser/${id}`);

        closeDeleteModal();

        if (response.status === 200 && response.data.status) {
            toast.success("Delete successfully.");
            router.push('/admin/users');
        } else {
            toast.error(response.data.message || "An error occurred while deleting.");
        }
    } catch (error) {
        console.error(error);
        toast.error(error);
    }
}


const links = ref([
    { name: 'Account', path: 'admin-users-id', url: `/admin/users/${route.params.id}`, icon: 'material-symbols:person-check-rounded' },
    { name: 'Security', path: 'admin-users-id-security', url: `/admin/users/${route.params.id}/security`, icon: 'material-symbols:lock-open-outline-rounded' },
])

</script>
