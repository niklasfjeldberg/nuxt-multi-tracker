<template>
  <UContainer class="py-20 flex flex-row flex-wrap gap-4 w-full">
    <h1 class="text-6xl w-full">Nuxt Multi Tracker: all pixels options</h1>
    <NuxtLink class="underline hover:no-underline text-2xl" to="/">
      Go to frontpage
    </NuxtLink>
    <p class="w-full">This button will trigger an event</p>
    <ClientOnly>
      <code class="w-full">
        <h2>Meta</h2>
        <pre>
          {{ metaOptions }}
          </pre
        >
        <h2>Reddit</h2>
        <pre>
            {{ redditOptions }}
            </pre
        >
        <h2>Twitter</h2>
        <pre>
        {{ twitterOptions }}
      </pre
        >
        <h2>GA4</h2>
        <pre>
        {{ googleOptions }}
      </pre
        >
      </code>
    </ClientOnly>
  </UContainer>
</template>

<script setup lang="ts">
const metaOptions = usePixelMeta().options;
const redditOptions = usePixelReddit().options;
const twitterOptions = usePixelTwitter().options;
const googleOptions = usePixelGoogle().options;
</script>
