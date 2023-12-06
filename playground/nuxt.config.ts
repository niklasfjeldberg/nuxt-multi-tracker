export default defineNuxtConfig({
  modules: ['nuxt-multi-tracker', '@nuxt/ui'],
  ssr: true,
  multiTracker: {
    private: {},
    public: {
      debug: true,
      disabled: false,
      initialConsent: false,
      meta: {
        pixelID: process.env.META_PIXEL_ID || null,
        disabled: false,
      },
      reddit: {
        pixelID: process.env.REDDIT_PIXEL_ID || null,
        disabled: false,
      },
      twitter: {
        pixelID: process.env.TWITTER_PIXEL_ID || null,
        disabled: false,
      },
      google: {
        pixelID: process.env.GOOGLE_PIXEL_ID || null,
        disabled: false,
      },
    },
  },
  devtools: { enabled: true },
});
