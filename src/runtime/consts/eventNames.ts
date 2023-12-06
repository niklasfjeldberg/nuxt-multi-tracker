import type {
  MetaEventNames,
  RedditEventNames,
  TwitterEventNames,
  GoogleEventNames,
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

export const googleStandardEvents: GoogleEventNames[] = [
  'add_payment_info',
  'add_shipping_info',
  'add_to_cart',
  'add_to_wishlist',
  'begin_checkout',
  'checkout_progress',
  'earn_virtual_currency',
  'exception',
  'generate_lead',
  'join_group',
  'level_end',
  'level_start',
  'level_up',
  'login',
  'page_view',
  'post_score',
  'purchase',
  'refund',
  'remove_from_cart',
  'screen_view',
  'search',
  'select_content',
  'select_item',
  'select_promotion',
  'set_checkout_option',
  'share',
  'sign_up',
  'spend_virtual_currency',
  'tutorial_begin',
  'tutorial_complete',
  'unlock_achievement',
  'timing_complete',
  'view_cart',
  'view_item',
  'view_item_list',
  'view_promotion',
  'view_search_results',
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

interface MetaToGoogleEventsNames {
  [key: string]: GoogleEventNames;
}

export const metaToGoogleEventNames: MetaToGoogleEventsNames = {
  PageView: 'page_view',
  AddPaymentInfo: 'add_payment_info',
  AddToCart: 'add_to_cart',
  AddToWishlist: 'add_to_wishlist',
  CompleteRegistration: 'sign_up',
  InitiateCheckout: 'begin_checkout',
  Lead: 'generate_lead',
  Purchase: 'purchase',
  Search: 'search',
  /*   Schedule: '',
  StartTrial: '',
  Contact: '',
  CustomizeProduct: '',
  Donate: '',
  FindLocation: '',
  SubmitApplication: '',
  Subscribe: '',
  ViewContent: '', */
};

interface Dict {
  [key: string]: any;
}

export const metaToRedditUserData: Dict = {
  em: 'email',
};
