<template>
  <AdminLayout>
    <div class="text-right mb-4">
      <UButton size="lg" variant="outline" label="Add Class" @click="isOpen = true" />
    </div>
    <div class="grid grid-cols-3 gap-4">
      <template v-for="classItem in classes" :key="classItem._id">
        <NuxtLink :to="`/admin/class/${classItem._id}`" class="max-w-xs p-4 shadow-lg" style="text-decoration: none;">
          <img
            src="https://static.vecteezy.com/system/resources/previews/009/385/472/non_2x/school-desk-clipart-design-illustration-free-png.png"
            class="w-full object-cover mb-4 block" />
          <div class="font-semibold">{{ classItem.className }}</div>
          <div>{{ classItem.listUser.length - 1 }} students</div>
        </NuxtLink>
      </template>
    </div>

    <UModal v-model="isOpen" prevent-close>
      <UCard :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Add a new class
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="isOpen = false" />
          </div>
        </template>

        <UForm :schema="schema" :state="state" @submit="submit">
          <div class="flex gap-4">
            <UFormGroup class="mb-4 flex-1" label="Class Name" name="className">
              <UInput v-model="state.className" placeholder="Class Name" />
            </UFormGroup>
            <UFormGroup class="mb-4 flex-1" label="Teacher" name="teacher">
              <USelect v-model="state.teacher" :options="teacher" />
            </UFormGroup>
          </div>
          <UFormGroup class="mb-4 flex-1" label="Students" name="listUser">
            <UInput v-model="state.listUser" placeholder="Student" />
          </UFormGroup>
          <UButton type="submit"> Submit </UButton>
        </UForm>
      </UCard>
    </UModal>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '../layouts/AdminLayout.vue';
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import axios from 'axios';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const isOpen = ref(false);
interface ClassItem {
  _id: string;
  className: string;
  listUser: string[];
}
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
  listUser: z.array(z.string()),  // Adjust the validation for listUser
});

type Schema = z.output<typeof schema>;

let teacher: string[] = [];

const classes = ref<ClassItem[]>([]);

const state = ref({
  className: undefined,
  listUser: [] as string[],
  teacher: undefined
});

async function loadData() {
  try {
    const response_class = await axios.get("http://localhost:5000/api/class");
    classes.value = response_class.data;
    const response_people = await axios.get("http://localhost:5000/api/user/getAllTeacherAndStudent");
    console.log(response_people.data)
  } catch (error) {
    console.error(error);
  }
}

onMounted(loadData);
async function submit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data);
}
</script>