<template>
    <div class="mt-4 px-4 py-8 border">
        <h3 class="font-medium text-lg text-[#6f6b7d]">View your file</h3>
        <div v-if="file && file.fileUrl">
            <template v-if="isPDF(file.fileName)">
                <!-- Hiển thị PDF -->
                <iframe :src="file.fileUrl" width="100%" height="600px" frameborder="0"></iframe>
            </template>
            <template v-else-if="isWordDoc(file.fileName)">
                <!-- Hiển thị file Word -->
                <div v-html="wordContent"></div>
            </template>
            <template v-else>
                <!-- Hiển thị thông báo nếu không hỗ trợ định dạng -->
                <p>This file format is not supported.</p>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import mammoth from 'mammoth';
const route = useRoute()

const file = ref<any>();
const wordContent = ref<string | null>(null);

async function loadData() {
    try {
        const id = route.params.id;
        const response = await axios.get(`http://localhost:5000/api/upload/${id}`);
        file.value = response.data[0];

        if (isWordDoc(file.value.fileName)) {
            await loadWordContent();
        }
    } catch (error) {
        console.error(error);
    }
}

async function loadWordContent() {
    try {
        debugger
        console.log(file.value.fileUrl)
        const response = await axios.get(file.value.fileUrl);

        const arrayBuffer = response.data;
        const buffer = Buffer.from(arrayBuffer, 'binary').toString('base64');

        mammoth.extractRawText({ arrayBuffer: arrayBuffer })
            .then((result) => {
                wordContent.value = result.value;
            })
            .catch((error) => {
                console.error(error);
            });
    } catch (error) {
        console.error(error);
    }
}

function isPDF(fileName: string): boolean {
    return fileName.toLowerCase().endsWith('.pdf');
}

function isWordDoc(fileName: string): boolean {
    return fileName.toLowerCase().endsWith('.doc') || fileName.toLowerCase().endsWith('.docx');
}

onMounted(loadData);
</script>
