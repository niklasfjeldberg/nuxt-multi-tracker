import { useCookie, useState, useRuntimeConfig } from '#imports';
import { useInfo } from './useLog';
/* import type { MetaEventNames} from '../types'; */

export default function () {
  const { initialConsent } = useRuntimeConfig().public.multiTracker; // disabled

  const haveConsent = useState<boolean>('haveConsent');
  const cookieHaveConsent = useCookie<boolean>('haveConsent');

  if (!haveConsent.value) {
    if (cookieHaveConsent.value === true) {
      haveConsent.value = true;
    } else if (cookieHaveConsent.value === false) {
      haveConsent.value = false;
    } else {
      haveConsent.value = initialConsent;
      cookieHaveConsent.value = initialConsent;
    }
  }

  const grantConsent = () => {
    haveConsent.value = true;
    cookieHaveConsent.value = true;
    useInfo('consent granted.');
    /* init(); */
  };

  const revokeConsent = () => {
    haveConsent.value = false;
    cookieHaveConsent.value = false;
    useInfo('consent revoked.');
  };

  return {
    haveConsent,
    revokeConsent,
    grantConsent,
  };
}
