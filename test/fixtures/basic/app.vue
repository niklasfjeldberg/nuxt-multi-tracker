<template>
  <div>
    <div>basic</div>
    <div>{{ haveConsent }}</div>
  </div>
</template>

<script setup>
const { haveConsent } = useMultiAnalytics();
</script>
