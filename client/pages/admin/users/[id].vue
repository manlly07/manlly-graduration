<template>
    <AdminLayout>
        <div class="mt-12 flex gap-8">
            <div class="flex-1 border flex flex-col h-fit">
                <div class="pt-12 px-8 text-center flex justify-center flex-col w-full items-center">
                    <img loading="lazy" src="	https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/15.png" alt="" class="h-24 w-24 object-cover">
                    <h3 class="font-semibold text-lg text-black my-2">Violet Mendoza</h3>
                    <div class="p-2 text-center bg-[#f2f2f3] text-[#a8aaae] w-fit text-xs">Author</div>
                    <div class="border w-full my-6"></div>
                </div>
                <div class="px-8">
                    <p class="uppercase text-[#a8aaae] font-medium text-sm">Details</p>
                    <div class="mt-4">
                        <span class="font-medium text-sm">Username: </span> 
                        <span>manlly07</span>
                    </div>
                    <div class="mt-4">
                        <span class="font-medium text-sm">Username: </span> 
                        <span>manlly07</span>
                    </div>
                    <div class="mt-4">
                        <span class="font-medium text-sm">Username: </span> 
                        <span>manlly07</span>
                    </div>
                    <div class="mt-4">
                        <span class="font-medium text-sm">Username: </span> 
                        <span>manlly07</span>
                    </div>
                    <div class="mt-4">
                        <span class="font-medium text-sm">Username: </span> 
                        <span>manlly07</span>
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
                            :class="route.name === link.path ? 'bg-primay font-medium text-white' : 'hover:text-primay'"
                        >
                            <Icon
                                :name="link.icon"
                            />
                            {{ link.name }}
                        </NuxtLink>
                    </template>
                </div>
                <NuxtPage/>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '~/layouts/AdminLayout.vue';

const route = useRoute()
console.log(route.name);
const links = ref([
    { name: 'Account', path: 'admin-users-id', url: `/admin/users/${route.params.id}`, icon: 'material-symbols:person-check-rounded' },
    { name: 'Security', path: 'admin-users-id-security', url: `/admin/users/${route.params.id}/security`, icon: 'material-symbols:lock-open-outline-rounded' },
])

</script>
