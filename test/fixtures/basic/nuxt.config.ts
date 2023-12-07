import MyModule from '../../../src/module';

export default defineNuxtConfig({
  modules: [MyModule],
  ssr: true,
  multiTracker: {
    private: {},
    public: {
      debug: false,
      disabled: false,
      initialConsent: true,
      meta: {
        pixelID: 'xxxxxxxxx',
      },
      reddit: {
        pixelID: 'xxxxxxxxx',
      },
    },
  },
});
