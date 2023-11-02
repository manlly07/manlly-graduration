<template>
    <div class="mt-4 px-4 py-8 border">
        <h3 class="font-medium text-lg text-[#6f6b7d]">User's Projects List</h3>
        <div>
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
    </div>
    <!-- </div> -->
</template>

<script setup>
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

const items = (row) => [
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

</script>

<style lang="scss" scoped>

</style>