/* import { useState, useRuntimeConfig } from '#imports'; */
import { useInfo } from './useLog';
import useMetaPixel from './useMetaPixel';
import useConsent from './useConsent';
import type { MetaEventNames, MetaUserData, MetaParameters } from '../types';

export default function () {
  const { haveConsent } = useConsent();

  // Const all pixels
  const metaPixel = useMetaPixel();

  /**
   * @method init
   * Initilize all active pixels.
   */
  const init = () => {
    useInfo('init all pixels');
    metaPixel.init();
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
