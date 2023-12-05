import MyModule from '../../../src/module';

export default defineNuxtConfig({
  modules: [MyModule],
  ssr: true,
  multiTracker: {
    private: {},
    public: {
      debug: true,
      disabled: false,
      initialConsent: false,
      meta: {
        pixelID: 'xxxxxxxxx',
      },
      reddit: {
        pixelID: 'xxxxxxxxx',
      },
    },
  },
});
