import { computed, useHead, useRuntimeConfig, useState, toRaw } from '#imports';
import { defu } from 'defu';
import { useInfo, useLogError } from './useLog';
import useConsent from './useConsent';
import { twitterStandardEvents } from '../consts/eventNames';

import type {
  TwitterEventNames,
  TwitterModuleOptions,
  TwitterPixelOptions,
  TwitterParams,
  TwitterQuery,
} from '~/src/runtime/types';

export default function (input?: TwitterModuleOptions) {
  const { twitter, disabled, loadingStrategy } =
    useRuntimeConfig().public.multiTracker;

  const pixelType = 'Twitter';

  const options = useState<TwitterPixelOptions>('twitterPixelOptions');

  if (!options.value) {
    options.value = {
      ...defu(input, twitter as TwitterModuleOptions),
      pixelLoaded: false,
      isEnabled: !twitter.disabled ? !disabled : false,
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
   * Used to load the script and make the respective pixel function available in window. Without setting this the composable will not work.
   */
  const setPixel = () => {
    if (process.browser) {
      /* eslint-disable */
      (function (e, t, n, s, u, a) {
        e.twq ||
          ((s = e.twq =
            function () {
              s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
            }),
          (s.version = twitter.version),
          (s.queue = []));
      })(window, document);
      /* eslint-enable */
    }
    useHead({
      script: [
        {
          hid: 'twitterPixel',
          src: 'https://static.ads-twitter.com/uwt.js',
          onload: () => scriptLoaded(),
          defer: loadingStrategy === 'defer',
        },
      ],
    });
    const scriptLoaded = () => {
      if (!window.twq) {
        useLogError(
          `(${pixelType}) script was loaded but functions is not available in "window".`,
        );
      } else {
        options.value.pixelLoaded = true;
        send();
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
  const setUserData = (newUserData?: null, initPixel: boolean = true) => {
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

    query('config', options.value.pixelID!);
  };

  /**
   * @method track
   * @param {string} [eventName] See same for event names.
   * @param {object} [params] See https://reddit.my.site.com/helpcenter/s/article/Reddit-Pixel-Event-Metadata
   */
  const track = (
    eventName: TwitterEventNames | null = null,
    params: TwitterParams | null = null,
    eventID: string | null = null,
  ) => {
    if (pixelDisabled.value) return;

    if (!eventName) eventName = options.value.track!;

    const metaData: TwitterParams = { ...params };
    if (eventID) metaData.conversion_id = eventID;

    if (twitterStandardEvents.includes(eventName)) {
      query('event', eventName, { ...metaData });
    } else {
      /* metaData.customEventName = eventName; */
      query('event', 'Custom', { ...metaData });
    }
  };

  /**
   * @method query
   * @param {string} [cmd] command
   * @param {string} [option]
   * @param {object} [params]
   */
  const query: TwitterQuery = (cmd, option, params = null) => {
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

      useInfo(`(${pixelType}) Send event: `, toRaw(event));

      if (event) {
        /*
         * WARNING: Error "#<Object> could not be cloned" will happen if you do not clone proxy consts.
         */
        if (event.params) {
          window.twq(event.cmd, event.option, toRaw(event.params));
        } else {
          window.twq(event.cmd, event.option);
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
