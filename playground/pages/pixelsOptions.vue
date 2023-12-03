<template>
  <UContainer class="py-20 flex flex-row flex-wrap gap-4 w-full">
    <h1 class="text-6xl w-full">Nuxt Multi Tracker: all pixels options</h1>
    <NuxtLink class="underline hover:no-underline text-2xl" to="/">
      Go to frontpage
    </NuxtLink>
    <p class="w-full">This button will trigger an event</p>
    <ClientOnly>
      <code class="w-full">
        <pre>
        {{ metaOptions }}
      </pre
        >
        <pre>
        {{ redditOptions }}
      </pre
        >
      </code>
    </ClientOnly>
  </UContainer>
</template>

<script setup lang="ts">
const metaOptions = useState('metaPixelOptions');
const redditOptions = useState('redditPixelOptions');
</script>
