import { computed, useHead, useRuntimeConfig, useState, toRaw } from '#imports';
import { defu } from 'defu';
import { useInfo, useLogError } from './useLog';
import useConsent from './useConsent';
/* import { googleStandardEvents } from '../consts/eventNames'; */

import type {
  GoogleModuleOptions,
  GooglePixelOptions,
  GoogleEventParams,
  GoogleEventNames,
  GoogleQuery,
  GoogleControlParams,
} from '~/src/runtime/types';

export default function (input?: GoogleModuleOptions) {
  const { google, disabled, debug, loadingStrategy } =
    useRuntimeConfig().public.multiTracker;

  const pixelType = 'Google';

  const options = useState<GooglePixelOptions>('googlePixelOptions');

  if (!options.value) {
    const temp = defu(input, google as GoogleModuleOptions);
    options.value = {
      ...temp,
      pixelLoaded: false,
      isEnabled: !disabled,
      userData: null,
      eventsQueue: [],
    };
  }

  const { haveConsent } = useConsent();

  const pixelDisabled = computed(
    () =>
      !haveConsent.value || !options.value.isEnabled || !options.value.pixelID,
  );

  /**
   * @method setPixel
   * Used to load the script and make the respective pixel function avaible in window. Without setting this the composable will not work.
   */
  const setPixel = () => {
    if (process.browser) {
      window.dataLayer = window.dataLayer || [];
    }
    useHead({
      script: [
        {
          hid: 'pixelGoogle',
          src: `https://www.googletagmanager.com/gtag/js?id=${options.value.pixelID}`,
          onload: () => scriptLoaded(),
          defer: loadingStrategy === 'defer',
        },
      ],
    });
    const scriptLoaded = () => {
      if (!window.dataLayer) {
        useLogError(
          `(${pixelType}) datalayer was loaded but is not avaible in "window".`,
        );
      } else {
        options.value.pixelLoaded = true;
        track();
      }
    };
  };

  /**
   * @method setPixelId
   */
  const setPixelId = (newPixelID: string) => {
    options.value.pixelID = newPixelID;
    useInfo(`${pixelType} pixel id set to "${options.value.pixelID}"`);
    init();
  };

  /**
   * @method setUserData
   * Used to set user data that'll be used once the `fbq` init function is called.
   * @param {object} [newUserData] See https://developers.google.com/tag-platform/gtagjs/reference#set
   * @param {boolean} [initPixel] Automatically init pixel with new data.
   */
  const setUserData = (newUserData?: any, initPixel: boolean = true) => {
    if (!newUserData) return;
    // If data is same (INCLUDING PROP ORDER) skip setting user data.
    if (
      JSON.stringify(options.value.userData) !== JSON.stringify(newUserData)
    ) {
      options.value.userData = newUserData;
      if (initPixel) {
        init();
      }
    }
  };

  /**
   * @method enable
   */
  const enable = () => {
    options.value.isEnabled = true;
    init();
    track();
  };

  /**
   * @method disable
   */
  const disable = () => {
    options.value.isEnabled = false;
  };

  /**
   * @method init
   */
  const init = () => {
    if (pixelDisabled.value) return;
    if (!options.value.pixelLoaded) setPixel();

    query('js', { config: new Date() });
    query('config', { targetId: options.value.pixelID! }); // config: ???
  };

  /**
   * @method track
   * @param {string} [eventName] See same for event names.
   * @param {object} [params] See https://reddit.my.site.com/helpcenter/s/article/Reddit-Pixel-Event-Metadata
   */
  const track = (
    eventName?: GoogleEventNames,
    params?: GoogleControlParams | GoogleEventParams | Record<string, any>,
  ) => {
    if (pixelDisabled.value) return;

    // Naming rules: https://support.google.com/analytics/answer/13316687?sjid=16929006747782866901-EU
    // TODO: if (eventName !== followsNamingRules) useLogError()

    query('event', {
      eventName: eventName || options.value.track!,
      ...params,
    });
  };

  /**
   * @method query
   * @param {string} [cmd] command
   * @param {object} [params]
   */

  const query: GoogleQuery = (cmd, params) => {
    // PROBLEM with naming of props?
    if (pixelDisabled.value) return;

    useInfo(`(${pixelType}) cmd:`, cmd, 'Params:', params);

    options.value.eventsQueue.push({
      cmd,
      ...params,
    });

    send();
  };

  const send = () => {
    if (!options.value.pixelLoaded) return;

    while (options.value.eventsQueue.length) {
      const event = options.value.eventsQueue.shift();

      if (debug) useInfo(`(${pixelType}) Send event: `, toRaw(event));

      // Google tag consists of a single function, gtag(), with the following syntax:
      // gtag(<command>, <command parameters>);

      // eslint-disable-next-line no-inner-declarations
      function gtag(...args: any[]) {
        window.dataLayer.push(...args);
      }

      // https://developers.google.com/tag-platform/gtagjs/reference#event

      if (event.cmd === 'event') {
        gtag('event', event.eventName, {});
      } else if (event.cmd === 'config') {
        // ID can be: Google Ads Tag ID, etc.
        gtag('config', event.pixelID, {
          // additional_config_info
        });
      } else if (event.cmd === 'set') {
        gtag('set', { ...event });
      } else if (event.cmd === 'consent') {
        useLogError(`(${pixelType}) cmd is not accounted for:`, event.cmd);
      } else if (event.cmd === 'js') {
        gtag('js', event.config);
      } else {
        useLogError(`(${pixelType}) cmd is not accounted for:`, event.cmd);
      }
    }
  };

  return {
    options: options.value,
    setPixel,
    setPixelId,
    enable,
    disable,
    track,
    query,
    init,
  };
}
