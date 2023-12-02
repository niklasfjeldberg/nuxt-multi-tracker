import { computed, useRuntimeConfig, useState } from '#imports';
import { defu } from 'defu';
import { useInfo, useLogError, useWarn } from './useLog';
import useConsent from './useConsent';
/* import { useUserData } from './states'; */
import { metaStandardEvents } from '../consts/eventNames';

import type {
  MetaUserData,
  MetaEventNames,
  MetaParameters,
  MetaPixelCmd,
  MetaModuleOptions,
  MetaPixelOptions,
} from '../types';

export default function (input?: MetaModuleOptions) {
  const { meta, disabled, debug } = useRuntimeConfig().public.multiAnalytics;

  const options = useState<MetaPixelOptions>('metaPixelOptions');

  if (!options.value) {
    options.value = {
      ...defu(input, meta as MetaModuleOptions),
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
        t = b.createElement(e);
        t.async = true;
        t.defer = true;
        t.src = v;
        s = b.getElementsByTagName('body')[0];
        s.parentNode.appendChild(t, s);
        /* eslint-enable */

        const onLoadCallback = () => {
          if (!window.fbq) {
            useLogError('fbq was loaded but is not avaible in "window".');
          } else {
            options.value.pixelLoaded = true;
            track(); // If not track(), you need send() for init() to take affect.
          }
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
        }
      })(
        window,
        document,
        'script',
        'https://connect.facebook.net/en_US/fbevents.js',
      );
    }
  };

  /**
   * @method setPixelId
   */
  const setPixelId = (newPixelID: string) => {
    options.value.pixelID = newPixelID;
    useInfo(`pixel id set to "${options.value.pixelID}"`);
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
    query('init', options.value.pixelID, options.value.userData || undefined);
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
   * @param {object} [option]
   * @param {object} [parameters]
   * @param {object} [eventID]
   */
  const query = (
    cmd: MetaPixelCmd,
    option: string | null = null,
    parameters: any = null,
    eventID: string | null = null,
  ) => {
    // Disable tracking if module is disabled or user consent is not given.
    if (pixelDisabled.value) return;

    useInfo(
      'Command:',
      cmd,
      'Option:',
      option,
      'Additional parameters:',
      parameters,
      'EventID:',
      eventID,
    );

    options.value.eventsQueue.push({
      cmd,
      option,
      parameters,
      eventID: { eventID: eventID },
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
          window.fbq(event.cmd, event.option, event.parameters, event.eventID);
        } else if (event.parameters) {
          window.fbq(event.cmd, event.option, event.parameters);
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
