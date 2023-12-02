/* import { useState, useRuntimeConfig } from '#imports'; */
import { useInfo } from './useLog';

// Pixels
import useMetaPixel from './useMetaPixel';
import useRedditPixel from './useRedditPixel';

// Other
import useConsent from './useConsent';
import type { MetaEventNames, MetaUserData, MetaParameters } from '../types';
import { metaToRedditEvents } from '../consts/eventNames';

export default function () {
  const { haveConsent } = useConsent();

  // Const all pixels
  const metaPixel = useMetaPixel();
  const redditPixel = useRedditPixel();

  /**
   * @method init
   * Initilize all active pixels.
   */
  const init = () => {
    useInfo('init all pixels');
    metaPixel.init();
    redditPixel.init();
  };

  /**
   * @method track
   * Track event for all active pixels. Uses Meta (Facebook) event names as default.
   */
  const track = (
    eventName: MetaEventNames | null = null,
    parameters: MetaParameters | null = null,
    eventID: string | null = null,
  ) => {
    if (!haveConsent.value) return;
    useInfo('track with all pixels');
    metaPixel.track(eventName, parameters, eventID);
    redditPixel.track(
      eventName ? metaToRedditEvents[eventName] : eventName,
      parameters,
      eventID,
    );
  };

  /**
   * @method setUserData
   * Set user data for all active pixels. Uses Meta (Facebook) event names as default.
   */
  const setUserData = (input: MetaUserData, initPixel: boolean = true) => {
    if (!haveConsent.value) return;
    useInfo('set userdata for all pixels');
    metaPixel.setUserData(input, initPixel);
  };

  return {
    track,
    init,
    setUserData,
  };
}
