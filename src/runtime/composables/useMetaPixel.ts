import { computed, useRuntimeConfig, useState, useHead, toRaw } from '#imports';
import { defu } from 'defu';
import { useInfo, useLogError, useWarn } from './useLog';
import useConsent from './useConsent';
/* import { useUserData } from './states'; */
import { metaStandardEvents } from '../consts/eventNames';

import type {
  MetaUserData,
  MetaEventNames,
  MetaParameters,
  MetaQuery,
  MetaModuleOptions,
  MetaPixelOptions,
} from '../types';

export default function (input?: MetaModuleOptions) {
  const { meta, disabled, debug } = useRuntimeConfig().public.multiAnalytics;

  const options = useState<MetaPixelOptions>('metaPixelOptions');
  const pixelType = 'Meta';

  if (!options.value) {
    options.value = {
      ...defu(input, meta as MetaModuleOptions),
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
   * @method setFbq
   * Used to give this composable the Meta (Facebook) Pixel function "fbq". Without setting this the composable will not work.
   */
  const setFbq = () => {
    if (process.browser) {
      /* eslint-disable */
      ((f, b, e, v, n, t, s) => {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = options.value.version;
        n.queue = [];
        /* eslint-enable */
      })(window, document);
    }
    useHead({
      script: [
        {
          hid: 'metaPixel',
          src: 'https://connect.facebook.net/en_US/fbevents.js',
          onload: () => scriptLoaded(),
          defer: true,
          async: true,
        },
      ],
    });
    const scriptLoaded = () => {
      if (!window.rdt) {
        useLogError(
          `(${pixelType}) fbq was loaded but is not avaible in "window".`,
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
    useInfo(`(${pixelType}) pixel id set to "${options.value.pixelID}"`);
    init();
  };

  /**
   * @method setUserData
   * Used to set user data that'll be used once the `fbq` init function is called.
   * @param {object} [newUserData] See https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching#reference
   * @param {object} [initPixel] Automatically init pixel with new data.
   */
  const setUserData = (
    newUserData: MetaUserData,
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
    if (!options.value.pixelLoaded) setFbq();
    if (options.value.manualMode)
      query('set', 'autoConfig', false, options.value.pixelID);
    query('init', options.value.pixelID, options.value.userData);
  };

  /**
   * @method track
   * @param {string} [eventName] See https://developers.facebook.com/docs/meta-pixel/reference
   * @param {object} [parameters] See https://developers.facebook.com/docs/meta-pixel/implementation/conversion-tracking#object-properites
   */
  const track = (
    eventName: MetaEventNames | null = null,
    parameters: MetaParameters | null = null,
    eventID: string | null = null,
  ) => {
    if (pixelDisabled.value) return;

    if (!eventName) eventName = options.value.track;

    if (metaStandardEvents.includes(eventName!)) {
      query('track', eventName, parameters, eventID);
    } else {
      query('trackCustom', eventName, parameters, eventID);
    }
  };

  /**
   * @method query
   * @param {string} [cmd] command
   * @param {any} [option]
   * @param {any} [params]
   * @param {any} [eventID]
   */
  const query: MetaQuery = (
    cmd,
    option = null,
    params = null,
    eventID = null,
  ) => {
    // Disable tracking if module is disabled or user consent is not given.
    if (pixelDisabled.value) return;

    useInfo(
      `(${pixelType}) Cmd:`,
      cmd,
      'Option:',
      option,
      'Params:',
      params,
      'EventID:',
      eventID,
    );

    options.value.eventsQueue.push({
      cmd,
      option,
      params,
      eventID,
    });

    send();
  };

  const send = () => {
    if (!options.value.pixelLoaded) return;

    while (options.value.eventsQueue.length) {
      const event = options.value.eventsQueue.shift();

      if (debug) useInfo(`(${pixelType}) Send event:`, toRaw(event));

      if (event) {
        if (event.eventID) {
          window.fbq(event.cmd, event.option, event.params, {
            eventID: { eventID: event.eventID },
          });
        } else if (event.params) {
          window.fbq(event.cmd, event.option, event.params);
        } else {
          window.fbq(event.cmd, event.option);
        }
      }
    }
  };

  return {
    options: options.value,
    setFbq,
    setPixelId,
    setUserData,
    enable,
    disable,
    track,
    query,
    init,
  };
}
