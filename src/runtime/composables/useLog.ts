import { useRuntimeConfig } from '#imports';
/* getMeta */
/* import { moduleName } from '~~/src/config'; */

const moduleName = 'nuxt-multi-tracker';

/*
 * The const "debug" must be in each individual function.
 * If not we will gett ann "Nuxt instance" error.
 */

export const useInfo = (...messages: any) => {
  const { debug } = useRuntimeConfig().public.multiTracker;
  if (debug) console.info.apply(console, [`[${moduleName}]`, ...messages]);
  /* console.info.apply(['[nuxt-multi-tracker]', ...messages]); */
};
export const useGroup = (...messages: any) => {
  const { debug } = useRuntimeConfig().public.multiTracker;
  if (debug) console.group(`[${moduleName}]`, ...messages);
};
export const useGroupEnd = () => {
  const { debug } = useRuntimeConfig().public.multiTracker;
  if (debug) console.groupEnd();
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
