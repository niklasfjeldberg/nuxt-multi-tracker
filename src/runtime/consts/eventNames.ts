import type {
  MetaEventNames,
  RedditEventNames,
  TwitterEventNames,
} from '../types';

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

export const twitterStandardEvents: TwitterEventNames[] = [
  'Page View',
  'Purchase',
  'Download',
  'Custom',
  'Lead',
  'Add to Cart',
  'Checkout Initiated',
  'Content View',
  'Added Payment Info',
  'Search',
  'Subscribe',
  'Start Trial',
  'Add to Wishlist',
  'Product Customization',
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

interface MetaToRedditEventsNames {
  [key: string]: RedditEventNames;
}

export const metaToRedditEventNames: MetaToRedditEventsNames = {
  PageView: 'PageVisit',
  ViewContent: 'ViewContent',
  Search: 'Search',
  AddToCart: 'AddToCart',
  AddToWishlist: 'AddToWishlist',
  Purchase: 'Purchase',
  Lead: 'Lead',
  CompleteRegistration: 'SignUp',
};

interface Dict {
  [key: string]: any;
}

export const metaToRedditUserData: Dict = {
  em: 'email',
};
