import { computed, useRuntimeConfig, useState, useHead, toRaw } from '#imports';
import { defu } from 'defu';
import { useInfo, useLogError } from './useLog';
import useConsent from './useConsent';
import { metaStandardEvents } from '../consts/eventNames';

import type {
  MetaUserData,
  MetaEventNames,
  MetaTrackParamsOptions,
  MetaQuery,
  MetaModuleOptions,
  MetaPixelOptions,
} from '../types';

export default function (input?: MetaModuleOptions) {
  const { meta, disabled, debug, loadingStrategy } =
    useRuntimeConfig().public.multiTracker;

  const options = useState<MetaPixelOptions>('metaPixelOptions');
  const pixelType = 'Meta';

  if (!options.value) {
    const temp = defu(input, meta as MetaModuleOptions);
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
          defer: loadingStrategy === 'defer',
        },
      ],
    });
    const scriptLoaded = () => {
      if (!window.fbq) {
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
      if (initPixel) init();
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
    if (options.value.manualMode) {
      query('set', {
        option: 'autoConfig',
        autoMode: false,
        pixelID: options.value.pixelID!,
      });
    }
    query('init', {
      pixelID: options.value.pixelID!,
      userData: options.value.userData,
    });
  };

  /**
   * @method track
   * @param {string} [eventName] See https://developers.facebook.com/docs/meta-pixel/reference
   * @param {object} [parameters] See https://developers.facebook.com/docs/meta-pixel/implementation/conversion-tracking#object-properites
   */
  const track = <T = void>(
    eventName?: MetaEventNames | T,
    params?: MetaTrackParamsOptions,
  ) => {
    if (pixelDisabled.value) return;

    if (!eventName) eventName = options.value.track!;

    query(
      (metaStandardEvents as any).includes(eventName) ? 'track' : 'trackCustom',
      {
        eventName: eventName as string,
        ...params,
      },
    );
  };

  /**
   * @method query
   * @param {string} [cmd] command
   * @param {object} [params]
   */
  const query: MetaQuery = (cmd, params) => {
    // Disable tracking if module is disabled or user consent is not given.
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
      const event = options.value.eventsQueue.shift();

      if (debug) useInfo(`(${pixelType}) Send event:`, toRaw(event));

      if (event) {
        if (['track', 'trackCustom'].includes(event.cmd)) {
          window.fbq(event.cmd, event.eventName, event.properties, {
            eventID: { eventID: event.eventID },
          });
        } else if (event.cmd === 'init') {
          window.fbq('init', event.pixelID, event.userData);
        } else if (event.cmd === 'set') {
          window.fbq('set', event.option, event.autoMode, event.pixelID);
        } else if (['trackSingle', 'trackSingleCustom'].includes(event.cmd)) {
          window.fbq(
            event.cmd,
            event.pixelID,
            event.eventName,
            event.properties,
            {
              eventID: { eventID: event.eventID },
            },
          );
        } else {
          useLogError(`(${pixelType}) command not account for:`, event.cmd);
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
