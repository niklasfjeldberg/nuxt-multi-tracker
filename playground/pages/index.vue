<template>
  <UContainer class="py-20 flex flex-row flex-wrap gap-4 w-full">
    <h1 class="text-6xl w-full">Nuxt Multi Tracker: Frontpage</h1>
    <NuxtLink class="underline hover:no-underline text-2xl" to="/page2">
      Go to page 2
    </NuxtLink>
    <NuxtLink class="underline hover:no-underline text-2xl" to="/pixelsOptions">
      Pixels options
    </NuxtLink>
    <p class="w-full">This button will trigger an event</p>
    <UButton @click="onClick">Track lead w/ user data</UButton>
    <UButton @click="onClick2">Track lead</UButton>
    <h2 class="text-4xl w-full">Analytics are active: {{ haveConsent }}</h2>
    <UButton @click="grantConsent">Grant consent</UButton>
    <UButton @click="revokeConsent">Revoke consent</UButton>
    <UButton @click="haveConsent ? revokeConsent() : grantConsent()"
      >Toggle consent</UButton
    >
    <h2 class="text-4xl w-full">Other functions</h2>
    <UButton @click="userData">Set user data</UButton>
    <UButton @click="init">Init all pixels</UButton>
    <UButton @click="track()">Track default</UButton>
  </UContainer>
</template>

<script setup lang="ts">
const { track, setUserData, init } = useMultiTracker();

const { grantConsent, revokeConsent, haveConsent } = useConsent();

const onClick2 = () => {
  track('Lead', { eventID: String(new Date().getTime()) });
};

const userData = () => {
  setUserData({
    fn: 'John',
    ln: 'Johnson',
    em: 'example@example.com',
  });
};

const onClick = () => {
  userData();
  track('Lead', { eventID: String(new Date().getTime()) });
};
</script>
