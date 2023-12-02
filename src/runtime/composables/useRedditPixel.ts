import { computed, useRuntimeConfig, useState } from '#imports';
import { defu } from 'defu';
import { useInfo, useWarn } from './useLog';
import useConsent from './useConsent';
import { redditStandardEvents } from '../consts/eventNames';

import type {
  RedditEventNames,
  RedditModuleOptions,
  RedditPixelOptions,
  RedditUserData,
  RedditParams,
  RedditPixelCmd,
} from '~/src/runtime/types';

export default function (input?: RedditModuleOptions) {
  const { reddit, disabled, debug } = useRuntimeConfig().public.multiAnalytics;

  const pixelType = 'Meta';

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

  if (!options.value.pixelID) useWarn('pixelID is not set.');

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
          var t = d.createElement('script');
          (t.src = 'https://www.redditstatic.com/ads/pixel.js'), (t.async = !0);
          var s = d.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(t, s);
        }

        console.log(t);
      })(window, document);
      /* eslint-enable */

      /* const onLoadCallback = () => {
          options.value.pixelLoaded = true;
          track(); // If not track(), you need send() for init() to take affect.
        };

        if (t.readyState) {
          t.onreadystatechange = function () {
            if (t.readyState === 'loaded' || t.readyState === 'complete') {
              t.onreadystatechange = null;
              onLoadCallback();
            }
          };
        } else {
          t.onload = onLoadCallback;
        } */
    }
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
    newUserData: RedditUserData,
    initPixel: boolean = true,
  ) => {
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

    query('init', options.value.pixelID, {
      ...options.value.userData,
      optOut: false,
      useDecimalCurrencyValues: true,
    });
  };

  /**
   * @method track
   * @param {string} [eventName] See same for event names.
   * @param {object} [parameters] See https://reddit.my.site.com/helpcenter/s/article/Reddit-Pixel-Event-Metadata
   */
  const track = (
    eventName: RedditEventNames | null = null,
    parameters: RedditParams | null = null,
    eventID: string | null = null,
  ) => {
    if (pixelDisabled.value) return;

    if (!eventName) eventName = options.value.track;

    if (redditStandardEvents.includes(eventName!)) {
      query('track', eventName, {
        ...parameters,
        conversionId: eventID,
      });
    } else {
      query('track', 'Custom', {
        customEventName: eventName,
        conversionId: eventID,
        ...parameters,
      });
    }
  };

  /**
   * @method query
   * @param {string} [cmd] command
   * @param {object} [option]
   * @param {object} [params]
   */
  const query = (
    cmd: RedditPixelCmd,
    option: string | null = null,
    params: any = null,
  ) => {
    // Disable tracking if module is disabled or user consent is not given.
    if (pixelDisabled.value) return;

    useInfo('Command:', cmd, 'Option:', option, 'Parameters:', params);

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

      if (debug) useInfo('Send event: ', event);

      if (event) {
        if (event.eventID) {
          window.rdt(event.cmd, event.option, event.parameters, event.eventID);
        } else if (event.parameters) {
          window.rdt(event.cmd, event.option, event.parameters);
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
