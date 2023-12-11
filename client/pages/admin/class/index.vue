<template>
    <AdminLayout>
        <div class="text-right mb-4">
            <UButton size="lg" variant="outline" label="Add Class" @click="isOpen = true" />
        </div>
        <div class="grid grid-cols-3 gap-4">
            <Class />
            <Class />
            <Class />
        </div>
        <UModal v-model="isOpen" prevent-close>
          <UCard
            :ui="{
              ring: '',
              divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            }"
          >
            <template #header>
              <div class="flex items-center justify-between">
                <h3
                  class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                >
                  Add a new user
                </h3>
                <UButton
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-x-mark-20-solid"
                  class="-my-1"
                  @click="isOpen = false"
                />
              </div>
            </template>

            <UForm :schema="schema" :state="state" @submit="submit">
              <div class="flex gap-4">
                <UFormGroup
                  class="mb-4 flex-1"
                  label="First Name"
                  name="firstName"
                >
                  <UInput v-model="state.firstName" placeholder="First Name" />
                </UFormGroup>
                <UFormGroup
                  class="mb-4 flex-1"
                  label="Last Name"
                  name="lastName"
                >
                  <UInput v-model="state.lastName" placeholder="Last Name" />
                </UFormGroup>
              </div>
              <UFormGroup class="mb-4 flex-1" label="Email" name="email">
                <UInput v-model="state.email" placeholder="Email" />
              </UFormGroup>
              <div class="flex gap-4">
                <UFormGroup
                  class="mb-4 flex-1"
                  label="Password"
                  name="password"
                >
                  <UInput
                    v-model="state.password"
                    type="password"
                    placeholder="Enter your password"
                  />
                </UFormGroup>
                <UFormGroup
                  class="mb-4 flex-1"
                  label="Confirm Password"
                  name="confirmPassword"
                >
                  <UInput
                    v-model="state.password"
                    type="password"
                    placeholder="Enter your confirm password"
                  />
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
    </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '../layouts/AdminLayout.vue';
// @ts-ignore
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";

const isOpen = ref(false);

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});
type Schema = z.output<typeof schema>;

const roles = ["Admin", "Teacher", "User"];

const state = ref({ 
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  class: undefined,
  password: undefined,
  confirmPassword: undefined,
  role: roles[0],
});

async function submit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data);
}
</script>