import type { MetaEventNames, RedditEventNames } from '../types';

export const metaStandardEvents: MetaEventNames[] = [
  'PageView',
  'AddPaymentInfo',
  'AddToCart',
  'AddToWishlist',
  'CompleteRegistration',
  'Contact',
  'CustomizeProduct',
  'Donate',
  'FindLocation',
  'InitiateCheckout',
  'Lead',
  'Purchase',
  'Schedule',
  'Search',
  'StartTrial',
  'SubmitApplication',
  'Subscribe',
  'ViewContent',
];

export const redditStandardEvents: RedditEventNames[] = [
  'PageVisit',
  'ViewContent',
  'Search',
  'AddToCart',
  'AddToWishlist',
  'Purchase',
  'Lead',
  'SignUp',
  'Custom',
];

interface MetaToRedditEvents {
  [key: string]: RedditEventNames;
}

export const metaToRedditEvents: MetaToRedditEvents = {
  PageView: 'PageVisit',
  ViewContent: 'ViewContent',
  Search: 'Search',
  AddToCart: 'AddToCart',
  AddToWishlist: 'AddToWishlist',
  Purchase: 'Purchase',
  Lead: 'Lead',
  CompleteRegistration: 'SignUp',
};
