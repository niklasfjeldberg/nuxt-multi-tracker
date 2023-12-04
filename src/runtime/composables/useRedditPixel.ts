import { computed, useHead, useRuntimeConfig, useState, toRaw } from '#imports';
import { defu } from 'defu';
import { useInfo, useWarn, useLogError } from './useLog';
import useConsent from './useConsent';
import { redditStandardEvents } from '../consts/eventNames';

import type {
  RedditEventNames,
  RedditModuleOptions,
  RedditPixelOptions,
  RedditUserData,
  RedditParams,
  RedditQuery,
} from '~/src/runtime/types';

export default function (input?: RedditModuleOptions) {
  const { reddit, disabled, debug, loadingStrategy } =
    useRuntimeConfig().public.multiAnalytics;

  const pixelType = 'Reddit';

  const options = useState<RedditPixelOptions>('redditPixelOptions');

  if (!options.value) {
    const temp = defu(input, reddit as RedditModuleOptions);
    options.value = {
      ...temp,
      pixelLoaded: false,
      isEnabled: !disabled,
      userData: null,
      eventsQueue: [],
    };
  }

  if (!options.value.pixelID) useWarn(`(${pixelType}) pixelID is not set.`);

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
      /* eslint-disable */
      (function (w, d) {
        if (!w.rdt) {
          var p = (w.rdt = function () {
            p.sendEvent
              ? p.sendEvent.apply(p, arguments)
              : p.callQueue.push(arguments);
          });
          p.callQueue = [];
        }
      })(window, document);
      /* eslint-enable */
    }
    useHead({
      script: [
        {
          hid: 'redditPixel',
          src: 'https://www.redditstatic.com/ads/pixel.js',
          onload: () => scriptLoaded(),
          defer: loadingStrategy === 'defer',
        },
      ],
    });
    const scriptLoaded = () => {
      if (!window.rdt) {
        useLogError(
          `(${pixelType}) rdt was loaded but is not avaible in "window".`,
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
   * @param {object} [newUserData] See https://reddit.my.site.com/helpcenter/s/article/Reddit-Pixel-Advanced-Matching
   * @param {object} [initPixel] Automatically init pixel with new data.
   */
  const setUserData = (
    newUserData?: RedditUserData,
    initPixel: boolean = true,
  ) => {
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

    if (reddit.disableFirstPartyCookies) query('disableFirstPartyCookies');

    query('init', options.value.pixelID, {
      ...options.value.userData,
      optOut: false,
      useDecimalCurrencyValues: true,
    });
  };

  /**
   * @method track
   * @param {string} [eventName] See same for event names.
   * @param {object} [params] See https://reddit.my.site.com/helpcenter/s/article/Reddit-Pixel-Event-Metadata
   */
  const track = (
    eventName: RedditEventNames | null = null,
    params: RedditParams | null = null,
    eventID: string | null = null,
  ) => {
    if (pixelDisabled.value) return;

    if (!eventName) eventName = options.value.track!;

    const metaData = { ...params };
    if (eventID) metaData.conversionId = eventID;

    if (redditStandardEvents.includes(eventName)) {
      query('track', eventName, { ...metaData });
    } else {
      metaData.customEventName = eventName;
      query('track', 'Custom', { ...metaData });
    }
  };

  /**
   * @method query
   * @param {string} [cmd] command
   * @param {string} [option]
   * @param {object} [params]
   */
  const query: RedditQuery = (cmd, option = null, params = null) => {
    // Disable tracking if module is disabled or user consent is not given.
    if (pixelDisabled.value) return;

    useInfo(`(${pixelType}) Cmd:`, cmd, 'Option:', option, 'Params:', params);

    options.value.eventsQueue.push({
      cmd,
      option,
      params,
    });

    send();
  };

  const send = () => {
    if (!options.value.pixelLoaded) return;

    while (options.value.eventsQueue.length) {
      const event = options.value.eventsQueue.shift();

      if (debug) useInfo(`(${pixelType}) Send event: `, toRaw(event));

      if (event) {
        /*
         * WARNING: Error "#<Object> could not be cloned" will happen if you do not clone proxy consts.
         */
        if (event.params) {
          window.rdt(event.cmd, event.option, toRaw(event.params));
        } else {
          window.rdt(event.cmd, event.option);
        }
      }
    }
  };

  return {
    options: options.value,
    setPixel,
    setPixelId,
    setUserData,
    enable,
    disable,
    track,
    query,
    init,
  };
}
