<template>
  <UContainer class="py-20 flex flex-row flex-wrap gap-4 w-full">
    <h1 class="text-4xl w-full">Multi Analytics: Page 1</h1>
    <NuxtLink class="underline hover:no-underline" to="/page2">
      Go to page 2
    </NuxtLink>
    <p class="w-full">This button will trigger an event</p>
    <UButton @click="onClick">Track lead</UButton>
    <h2 class="text-2xl w-full">Analytics are active: {{ haveConsent }}</h2>
    <UButton @click="grantConsent">Grant consent</UButton>
    <UButton @click="revokeConsent">Revoke consent</UButton>
    <UButton @click="haveConsent ? revokeConsent() : grantConsent()"
      >Toggle consent</UButton
    >
    <h2 class="w-full text-2xl">Meta Pixel options</h2>
    <ClientOnly>
      <div class="w-full">
        <code>
          <pre>
        {{ metaPixel.options }}
    </pre
          >
        </code>
      </div>
    </ClientOnly>
  </UContainer>
</template>

<script setup lang="ts">
const { grantConsent, revokeConsent, haveConsent } = useMultiAnalytics();

const metaPixel = useMetaPixel();
const onClick = () => {
  metaPixel.setUserData({
    fn: 'John',
    ln: 'Johnson',
  });
  metaPixel.track('Lead', null, String(new Date().getTime()));
};
</script>
