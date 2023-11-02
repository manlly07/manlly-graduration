<template>
    <AdminLayout>
        {{ route.params.id }}
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '../layouts/AdminLayout.vue';
const route = useRoute()
console.log(route.params.id)


</script>
