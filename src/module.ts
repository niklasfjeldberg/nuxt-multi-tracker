import {
  defineNuxtModule,
  addImportsDir,
  createResolver,
  addPlugin,
} from '@nuxt/kit';
import { moduleName, configKey, moduleVersion } from './config';

import type { ModuleOptions } from './runtime/types';
export * from './runtime/types';

import { defu } from 'defu';

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: moduleName,
    version: moduleVersion,
    configKey: configKey,
    compatibility: {
      nuxt: '^3.8.0',
    },
  },
  defaults: {
    private: {
      redditApiKey: null,
      metaApiKey: null,
      snapchatApiKey: null,
      tiktokApiKey: null,
      twitterApiKey: null,
    },
    public: {
      initialConsent: false,
      debug: false,
      autoPageView: true,
      loadingStrategy: 'async',
      disabled: false,
      meta: {
        pixelID: null,
        track: 'PageView',
        version: '2.0',
        manualMode: false,
      },
      reddit: {
        pixelID: null,
        version: '2.0',
        track: 'PageVisit',
      },
    },
  },
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.multiAnalytics = defu(
      nuxt.options.runtimeConfig.multiAnalytics,
      options.private,
    );
    nuxt.options.runtimeConfig.public.multiAnalytics = defu(
      nuxt.options.runtimeConfig.public.multiAnalytics,
      options.public,
    );

    const { resolve } = createResolver(import.meta.url);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addImportsDir(resolve('./runtime/composables'));
    /* addImportsDir(resolve('./config')); */
    /* addImportsDir(resolve('./runtime/types')); */

    addPlugin({
      src: resolve('runtime/plugins/multiAnalytics.client'),
      mode: 'client',
    });
  },
});
