export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/ui'],
  ssr: true,
  multiAnalytics: {
    private: {},
    public: {
      debug: true,
      disabled: false,
      initialConsent: false,
      meta: {
        pixelID: process.env.META_PIXEL_ID,
      },
    },
  },
  devtools: { enabled: true },
});
