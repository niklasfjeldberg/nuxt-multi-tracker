import { useGroup, useGroupEnd, useLogError } from './useLog';

// Pixels
import usePixelMeta from './usePixelMeta';
import usePixelReddit from './usePixelReddit';
import usePixelGoogle from './usePixelGoogle';
/* import usePixelTwitter from './usePixelTwitter'; */

// Other
import useConsent from './useConsent';
import type {
  MetaEventNames,
  MetaUserData,
  MetaTrackParamsOptions,
  RedditUserData,
  GoogleEventNames,
} from '../types';
import {
  metaToRedditEventNames,
  metaToRedditUserData,
  metaToGoogleEventNames,
} from '../consts/eventNames';

export default function () {
  const { haveConsent } = useConsent();

  // Const all pixels
  const metaPixel = usePixelMeta();
  const redditPixel = usePixelReddit();
  const googlePixel = usePixelGoogle();
  /* const twitterPixel = usePixelTwitter(); */

  /**
   * @method init
   * Initilize all active pixels.
   */
  const init = () => {
    if (!haveConsent.value) return;
    useGroup('init all pixels');
    metaPixel.init();
    redditPixel.init();
    googlePixel.init();
    /* twitterPixel.init(); */
    useGroupEnd();
  };

  /**
   * @method track
   * Track event for all active pixels. Uses Meta (Facebook) event names as default.
   */
  const track = <T = void>(
    eventName?: MetaEventNames | T,
    params?: MetaTrackParamsOptions, //  eventID?: string,
  ) => {
    if (!haveConsent.value) return;
    useGroup('track with all pixels');

    metaPixel.track(eventName, params);

    redditPixel.track(
      metaToRedditEventNames[eventName as MetaEventNames] || eventName,
      params,
    );

    googlePixel.track(
      metaToGoogleEventNames[eventName as GoogleEventNames] || eventName,
      params,
    );

    // TODO: fix metaToTwitter event names.
    /* twitterPixel.track(eventName, params, eventID); */

    useGroupEnd();
  };

  const cleanMetaInput = (input: MetaUserData, type: string = 'reddit') => {
    const output: RedditUserData = {}; // add others?
    let metaTo;
    if (type === 'reddit') {
      metaTo = metaToRedditUserData;
    } else {
      useLogError('cleanMetaInput has not account for type', type);
      return;
    }
    for (const el in input) {
      if (metaTo[el]) {
        output[metaTo[el]] = input[el];
      }
    }
    return output;
  };

  /**
   * @method setUserData
   * Set user data for all active pixels. Uses Meta (Facebook) event names as default.
   */
  const setUserData = (input: MetaUserData, initPixel: boolean = true) => {
    if (!haveConsent.value) return;
    useGroup('set userdata for all pixels');
    metaPixel.setUserData(input, initPixel);
    redditPixel.setUserData(cleanMetaInput(input));
    useGroupEnd();
  };

  return {
    track,
    init,
    setUserData,
  };
}
