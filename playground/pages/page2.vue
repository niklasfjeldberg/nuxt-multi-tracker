<template>
  <UContainer class="py-20 flex flex-row flex-wrap gap-4 w-full">
    <h1 class="text-6xl w-full">Multi Analytics: Page 2</h1>
    <NuxtLink class="underline hover:no-underline text-2xl" to="/">
      Go to page 1
    </NuxtLink>
    <p class="w-full">This button will trigger an event</p>
    <UButton @click="onClick">Track SubmitApplication</UButton>
  </UContainer>
</template>

<script setup lang="ts">
const metaPixel = useMetaPixel();
const onClick = () => {
  metaPixel.track('SubmitApplication', null, String(new Date().getTime()));
};
</script>
