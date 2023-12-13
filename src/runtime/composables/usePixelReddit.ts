import { computed, useHead, useRuntimeConfig, useState, toRaw } from '#imports';
import { defu } from 'defu';
import { useInfo, useLogError } from './useLog';
import useConsent from './useConsent';
import { redditStandardEvents } from '../consts/eventNames';

import type {
  RedditEventNames,
  RedditModuleOptions,
  RedditPixelOptions,
  RedditUserData,
  RedditEventParamsOptions,
  RedditQueryParamsOptions,
  RedditQuery,
} from '~/src/runtime/types';

export default function (input?: RedditModuleOptions) {
  const { reddit, disabled, loadingStrategy } =
    useRuntimeConfig().public.multiTracker;

  const pixelType = 'Reddit';

  const options = useState<RedditPixelOptions>('redditPixelOptions');

  if (!options.value) {
    options.value = {
      ...defu(input, reddit as RedditModuleOptions),
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
   * Used to load the script and make the respective pixel function available in window. Without setting this the composable will not work.
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
          `(${pixelType}) rdt was loaded but is not available in "window".`,
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
   * @param {boolean} [initPixel] Automatically init pixel with new data.
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

    query('init', {
      pixelID: options.value.pixelID!,
      userData: options.value.userData,
      optOut: false,
      useDecimalCurrencyValues: true,
    });
  };

  /**
   * @method track
   * @param {string} [eventName] See same for event names.
   * @param {object} [params] See https://reddit.my.site.com/helpcenter/s/article/Reddit-Pixel-Event-Metadata
   */
  const track = <T = void>(
    eventName?: RedditEventNames | T,
    params?: RedditEventParamsOptions,
  ) => {
    if (pixelDisabled.value) return;

    if (!eventName) eventName = options.value.track!;

    const metaData: RedditQueryParamsOptions = {
      eventName: (redditStandardEvents as any).includes(eventName) // Error when checking two different types
        ? (eventName as string)
        : 'Custom',
      ...params,
    };
    if (metaData.eventName === 'Custom') {
      metaData.customEventName = eventName as string;
    }
    if (params?.eventID) metaData.conversionId = params.eventID;

    query('track', metaData);
  };

  /**
   * @method query
   * @param {string} [cmd] command
   * @param {object} [params]
   */
  const query: RedditQuery = (cmd, params) => {
    if (pixelDisabled.value) return;

    useInfo(`(${pixelType}) Cmd:`, cmd, 'Params:', params);

    options.value.eventsQueue.push({
      cmd,
      ...params,
    });

    send();
  };

  const send = () => {
    if (!options.value.pixelLoaded) return;

    while (options.value.eventsQueue.length) {
      const event = toRaw(options.value.eventsQueue.shift());

      useInfo(`(${pixelType}) Send event: `, event);

      if (event) {
        /*
         * WARNING: Error "#<Object> could not be cloned" will happen if you do not clone proxy consts.
         */
        if (event.cmd === 'track') {
          window.rdt('track', event.eventName, {
            ...event.properties,
            eventID: event.eventID,
            customEventName: event.customEventName,
            conversionId: event.conversionId,
          });
        } else if (event.cmd === 'init') {
          window.rdt('init', event.pixelID, {
            ...event.userData,
            optOut: event.optOut,
            useDecimalCurrencyValues: event.useDecimalCurrencyValues,
          });
        } else if (event.cmd === 'disableFirstPartyCookies') {
          window.rdt('disableFirstPartyCookies');
        } else {
          useLogError(`(${pixelType}) cmd is not accounted for:`, event.cmd);
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
