export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/ui'],
  ssr: true,
  multiTracker: {
    private: {},
    public: {
      debug: true,
      disabled: false,
      initialConsent: false,
      meta: {
        pixelID: process.env.META_PIXEL_ID || null,
      },
      reddit: {
        pixelID: process.env.REDDIT_PIXEL_ID || null,
      },
    },
  },
  devtools: { enabled: true },
});
