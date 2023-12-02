<template>
  <UContainer class="py-20 flex flex-row flex-wrap gap-4 w-full">
    <h1 class="text-6xl w-full">Multi Analytics: Page 1</h1>
    <NuxtLink class="underline hover:no-underline text-2xl" to="/page2">
      Go to page 2
    </NuxtLink>
    <NuxtLink class="underline hover:no-underline text-2xl" to="/pixelsOptions">
      Pixels options
    </NuxtLink>
    <p class="w-full">This button will trigger an event</p>
    <UButton @click="onClick">Track lead</UButton>
    <h2 class="text-4xl w-full">Analytics are active: {{ haveConsent }}</h2>
    <UButton @click="grantConsent">Grant consent</UButton>
    <UButton @click="revokeConsent">Revoke consent</UButton>
    <UButton @click="haveConsent ? revokeConsent() : grantConsent()"
      >Toggle consent</UButton
    >
  </UContainer>
</template>

<script setup lang="ts">
const { track, setUserData } = useMultiAnalytics();

const { grantConsent, revokeConsent, haveConsent } = useConsent();

const onClick = () => {
  setUserData({
    fn: 'John',
    ln: 'Johnson',
    em: 'example@example.com',
  });
  track('Lead', null, String(new Date().getTime()));
};
</script>
