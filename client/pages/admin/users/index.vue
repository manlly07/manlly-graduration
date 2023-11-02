<script setup lang="ts">
// @ts-ignore
import * as z from "zod";
import AdminLayout from "~/layouts/AdminLayout.vue";
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";

const columns = [
  {
    key: "id",
    label: "ID",
    sortable: true,
  },
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "title",
    label: "Title",
    sortable: true,
  },
  {
    key: "email",
    label: "Email",
    sortable: true,
    direction: "desc",
  },
  {
    key: "role",
    label: "Role",
    sortable: true,
  },
  {
    key: "actions",
  },
];

const people = [
  {
    id: 1,
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    id: 2,
    name: "Courtney Henry",
    title: "Designer",
    email: "courtney.henry@example.com",
    role: "Admin",
  },
  {
    id: 3,
    name: "Tom Cook",
    title: "Director of Product",
    email: "tom.cook@example.com",
    role: "Member",
  },
  {
    id: 4,
    name: "Whitney Francis",
    title: "Copywriter",
    email: "whitney.francis@example.com",
    role: "Admin",
  },
  {
    id: 5,
    name: "Leonard Krasner",
    title: "Senior Designer",
    email: "leonard.krasner@example.com",
    role: "Owner",
  },
  {
    id: 6,
    name: "Floyd Miles",
    title: "Principal Designer",
    email: "floyd.miles@example.com",
    role: "Member",
  },
  {
    id: 6,
    name: "Floyd Miles",
    title: "Principal Designer",
    email: "floyd.miles@example.com",
    role: "Member",
  },
  {
    id: 1,
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    id: 2,
    name: "Courtney Henry",
    title: "Designer",
    email: "courtney.henry@example.com",
    role: "Admin",
  },
  {
    id: 3,
    name: "Tom Cook",
    title: "Director of Product",
    email: "tom.cook@example.com",
    role: "Member",
  },
  {
    id: 4,
    name: "Whitney Francis",
    title: "Copywriter",
    email: "whitney.francis@example.com",
    role: "Admin",
  },
  {
    id: 5,
    name: "Leonard Krasner",
    title: "Senior Designer",
    email: "leonard.krasner@example.com",
    role: "Owner",
  },
  {
    id: 6,
    name: "Floyd Miles",
    title: "Principal Designer",
    email: "floyd.miles@example.com",
    role: "Member",
  },
  {
    id: 6,
    name: "Floyd Miles",
    title: "Principal Designer",
    email: "floyd.miles@example.com",
    role: "Member",
  },
];

const items = (row: any) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id),
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
    },
  ],
  [
    {
      label: "Archive",
      icon: "i-heroicons-archive-box-20-solid",
    },
    {
      label: "Move",
      icon: "i-heroicons-arrow-right-circle-20-solid",
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
    },
  ],
];

const table = ref({
  q: "",
  page: 1,
});

const pageCount = 10;
const filteredAndPagedRows = computed(() => {
  let filteredRows = people;
  if (table.value.q) {
    filteredRows = people.filter((person) => {
      return Object.values(person).some((value) => {
        return String(value)
          .toLowerCase()
          .includes(table.value.q.toLowerCase());
      });
    });
    // return filteredRows;
  }
  const pagedRows = filteredRows.slice(
    (table.value.page - 1) * pageCount,
    table.value.page * pageCount
  );
  console.log(pagedRows);
  return pagedRows;
});

const totalCount = computed(() => people.length);

const itemExport = [
  [
    {
      label: "Csv",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/739984?v=4",
      },
    },
    {
      label: "Pdf",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/739984?v=4",
      },
    },
  ],
];

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

<template>
  <AdminLayout>
    <div class="border-2 p-10">
      <div class="flex gap-4 justify-end mb-4">
        <UInput
          size="xl"
          v-model="table.q"
          color="white"
          variant="outline"
          name="input"
          placeholder="Search..."
          icon="i-heroicons-magnifying-glass-20-solid"
        />
        <UDropdown
          :items="itemExport"
          mode="click"
          :popper="{ placement: 'bottom-start' }"
        >
          <UButton
            color="indigo"
            variant="outline"
            label="Export"
            icon="i-heroicons-pencil-square"
          />
        </UDropdown>
        <UButton
          color="primary"
          variant="solid"
          label="Add new user"
          icon="i-heroicons-pencil-square"
          @click="isOpen = true"
        />
      </div>
      <UTable
        :columns="columns"
        :rows="filteredAndPagedRows"
        :sort="{ column: 'title' }"
      >
        <template #name-data="{ row }">
          <NuxtLink :to="`/admin/users/${row.id}`">{{ row.name }}</NuxtLink>
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>
      <div class="flex justify-end mt-4">
        <UPagination
          v-model="table.page"
          :page-count="pageCount"
          :total="totalCount"
        />
      </div>
    </div>
    <template>
      <div>
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
      </div>
    </template>
  </AdminLayout>
</template>