<template>
    <div class="mt-4 px-4 py-8 border">
        <h3 class="font-medium text-lg text-[#6f6b7d]">Change Password</h3>
        <div class="p-4 bg-orange-100 my-4">
            <p class="font-semibold text-lg text-orange-400">Ensure that these requirements are met</p>
            <p class="font-semibold text-lg text-orange-400">Minimum 8 characters long, uppercase & symbol</p>
        </div>
        <div class="flex gap-2 mb-4">
            <UFormGroup label="New Password" class="flex-1">
                <UInput placeholder="************" type="password" size="lg" icon="i-heroicons-key" />
            </UFormGroup>
            <UFormGroup label="Confirm New Password" class="flex-1">
                <UInput placeholder="************" type="password" size="lg" icon="i-heroicons-key" />
            </UFormGroup>
        </div>
        <UButton size="lg">Change Password</UButton>
    </div>
</template>

<script setup>

</script>
