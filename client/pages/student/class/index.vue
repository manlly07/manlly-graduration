<template>
  <StudentLayout>
    <div class="grid grid-cols-3 gap-4">
      <template v-for="classItem in classes" :key="classItem._id">
        <NuxtLink :to="`/student/class/${classItem._id}`" class="max-w-xs p-4 shadow-lg" style="text-decoration: none;">
          <img
            src="https://static.vecteezy.com/system/resources/previews/009/385/472/non_2x/school-desk-clipart-design-illustration-free-png.png"
            class="w-full object-cover mb-4 block" />
          <div class="font-semibold">{{ classItem.className }}</div>
          <div>{{ classItem.listUser.length - 1}} students</div>
        </NuxtLink>
      </template>
    </div>
  </StudentLayout>
</template>
  
<script setup lang="ts">
import StudentLayout from '../../../layouts/StudentLayout.vue';
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import axios from 'axios';
import { ref, onMounted } from 'vue';

interface ClassItem {
  _id: string;
  className: string;
  listUser: string[];
}
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});
type Schema = z.output<typeof schema>;

const roles = ["Admin", "Teacher", "User"];
const classes = ref<ClassItem[]>([]);
const state = ref({
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  class: undefined,
  password: undefined,
  confirmPassword: undefined,
  role: roles[0], 
});

async function loadData() {
  try {
    const response = await axios.get("http://localhost:5000/api/class");
    const userId = localStorage.getItem('_id');

    classes.value = response.data.filter(classItem => classItem.listUser.includes(userId));
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