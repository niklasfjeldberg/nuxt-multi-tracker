import useMultiTracker from '../composables/useMultiTracker';

import { defineNuxtPlugin, useRuntimeConfig, useRouter } from '#imports';

export default defineNuxtPlugin(() => {
  const { autoPageView } = useRuntimeConfig().public.multiTracker;

  const { init, track } = useMultiTracker();
  init();

  const router = useRouter();
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
