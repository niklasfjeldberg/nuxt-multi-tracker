import { useRuntimeConfig } from '#imports';
/* getMeta */
/* import { moduleName } from '~~/src/config'; */

const moduleName = 'nuxt-multi-analytics';

export const useInfo = (...messages: any) => {
  const { debug } = useRuntimeConfig().public.multiAnalytics;
  if (debug) {
    console.info(`[${moduleName}]`, ...messages);
    /* console.info.apply(['[nuxt-multi-analytics]', ...messages]); */
  }
};

export const useWarn = (...messages: any) => {
  console.warn(`[${moduleName}]`, ...messages);
};

export const useLogError = (...messages: any) => {
  console.error(`[${moduleName}]`, ...messages);
};

export const useDebug = (...messages: any) => {
  console.debug(`[${moduleName}]`, ...messages);
};
