<template>
    <StudentLayout>
        <div class="border-2 p-10">
            <div class="flex gap-4 justify-end mb-4">
                <UInput size="xl" v-model="table.q" color="white" variant="outline" name="input" placeholder="Search..."
                    icon="i-heroicons-magnifying-glass-20-solid" />

                <UButton color="primary" variant="solid" label="Upload project" icon="i-heroicons-pencil-square"
                    @click="isOpen = true" />
            </div>
            <UTable :columns="columns" :rows="filteredAndPagedRows" :sort="{ column: 'projectName' }">
            </UTable>
            <div class="flex justify-end mt-4">
                <UPagination v-model="table.page" :page-count="pageCount" :total="totalCount" />
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
                                    Upload project
                                </h3>
                                <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                                    @click="isOpen = false" />
                            </div>
                        </template>
                        <UForm :schema="schema" :state="state" @submit="submit">
                            <div class="flex gap-4">
                                <UFormGroup class="mb-4 flex-1" label="Project's name" name="projectName">
                                    <UInput v-model="state.projectName" placeholder="Name of project" />
                                </UFormGroup>
                            </div>
                            <div class="flex gap-4">
                                <UFormGroup class="mb-4 flex-1" label="Description" name="description">
                                    <UInput v-model="state.description" placeholder="Description of project" />
                                </UFormGroup>
                            </div>
                            <div class="flex gap-4">
                                <UFormGroup class="mb-4 flex-1" label="File">
                                    <Upload v-model:file-list="fileList" name="file" :headers="headers"
                                        @change="handleChange">
                                        <Button>
                                            <UploadOutlined></UploadOutlined>
                                            Click to Upload
                                        </Button>
                                    </Upload>
                                </UFormGroup>
                            </div>
                            <UButton type="submit"> Submit </UButton>
                        </UForm>
                    </UCard>
                </UModal>
            </div>
        </template>
    </StudentLayout>
</template>
<script setup lang="ts">
import StudentLayout from '../../../layouts/StudentLayout.vue';
import { ref, onMounted, computed } from 'vue';
import * as z from 'zod';
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import axios from 'axios';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { Upload, Button } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import type { UploadChangeParam } from 'ant-design-vue';

const toast = useToast();

const isOpen = ref(false);

const columns = [
    {
        key: "projectName",
        label: "Name",
        sortable: true,
    },
    {
        key: "description",
        label: "Description",
        sortable: true,
    },
    {
        key: "date_created",
        label: "Date created",
        sortable: true,
    },
    {
        key: "isApproved",
        label: "State",
        sortable: true,
        direction: "desc",
        formatter: (value) => {
            console.log("isApproved value:", value);
            return value ? 'Đã xét duyệt' : 'Đang xét duyệt';
        },
    }

];

const project = ref<any[]>([]);

const state = ref({
    projectName: undefined,
    description: undefined,
})

const schema = z.object({
    projectName: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
});
type Schema = z.output<typeof schema>;

async function loadData() {
    try {
        const userId = localStorage.getItem('_id');
        const token = localStorage.getItem('token');

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const id = localStorage.getItem('_id')
        const response = await axios.get(`http://localhost:5000/api/project/${id}`, { headers })
        project.value = response.data
        project.value = response.data.map((item) => {
            return {
                ...item,
                isApproved: item.isApproved ? 'Đã xét duyệt' : 'Chưa được xét duyệt'
            };
        });
    } catch (error) {
        console.error(error);
    }
}

onMounted(loadData);

async function submit(event: FormSubmitEvent<Schema>) {
    console.log(event.data);
    console.log(fileList)
    if (fileList.value.length === 0) {
        toast.error("Please upload your file")
    } else if(fileList.value.length > 1) {
        toast.error("Only upload 1 file")
    } else {
        try {
            const userId = localStorage.getItem('_id');
            const token = localStorage.getItem('token');

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const response = await axios.post(`http://localhost:5000/api/project/${userId}`, event.data, { headers });
            const response_create_project = response.data._id;
            const formData = new FormData();
            formData.append('file', fileList.value[0]);
            console.log(formData)
            const response_upload = await axios.post(`http://localhost:5000/api/upload/${response_create_project}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const response_upload_file = response_upload.data;
            if( response_upload_file) {
                isOpen.value = false;
                loadData();
                toast.success('Create project successfully.')
            } else {
                toast.error('Create project fail!')
            }
            
        } catch (error) {
            console.error("Error during form submission:", error);
            toast.error("An error occurred during form submission.");
        }
    }

}

const handleChange = (info: UploadChangeParam) => {
    if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
        toast.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
        toast.error(`${info.file.name} file upload failed.`);
    }
};

const fileList = ref([]);
const headers = {
    authorization: 'authorization-text',
};

const table = ref({
    q: "",
    page: 1,
});

const pageCount = 10;
const filteredAndPagedRows = computed(() => {
    let filteredRows = project.value;
    if (table.value.q) {
        filteredRows = project.value.filter((project) => {
            return Object.values(project).some((value) => {
                return String(value)
                    .toLowerCase()
                    .includes(table.value.q.toLowerCase());
            });
        });
    }
    const pagedRows = filteredRows.slice(
        (table.value.page - 1) * pageCount,
        table.value.page * pageCount
    );
    console.log(pagedRows);
    return pagedRows;
});

const totalCount = computed(() => project.value.length);

</script> 