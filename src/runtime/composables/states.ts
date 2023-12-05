import { useState } from '#imports';

import type {
  SharedUserData,
  /* MetaPixelOptions,
  RedditPixelOptions,
  TwitterPixelOptions, */
} from '../types';

export const useUserData = useState<SharedUserData>('sharedUserData');

/* export const useMetaOptions = useState<MetaPixelOptions>('metaOptions');
export const useRedditOptions = useState<RedditPixelOptions>('redditOptions');
export const useTwitterOptions =
  useState<TwitterPixelOptions>('twitterOptions'); */
