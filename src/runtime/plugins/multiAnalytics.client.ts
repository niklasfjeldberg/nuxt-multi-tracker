import useMultiAnalytics from '../composables/useMultiAnalytics';

import { defineNuxtPlugin, useRuntimeConfig, useRouter } from '#imports';

export default defineNuxtPlugin(() => {
  const { autoPageView } = useRuntimeConfig().public.multiAnalytics;

  const { init, track } = useMultiAnalytics();
  const router = useRouter();
  init();

  if (router) {
    router.afterEach(() => {
      /**
       * Automatically track PageView
       */
      if (autoPageView) {
        track('PageView');
      }
    });
  }
});
