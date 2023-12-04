import { useGroup, useGroupEnd, useLogError } from './useLog';

// Pixels
import useMetaPixel from './useMetaPixel';
import useRedditPixel from './useRedditPixel';

// Other
import useConsent from './useConsent';
import type {
  MetaEventNames,
  MetaUserData,
  MetaParameters,
  RedditUserData,
} from '../types';
import {
  metaToRedditEventNames,
  metaToRedditUserData,
} from '../consts/eventNames';

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
    if (!haveConsent.value) return;
    useGroup('init all pixels');
    metaPixel.init();
    redditPixel.init();
    useGroupEnd();
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
    useGroup('track with all pixels');
    metaPixel.track(eventName, parameters, eventID);
    redditPixel.track(
      eventName ? metaToRedditEventNames[eventName] : eventName,
      parameters,
      eventID,
    );
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
