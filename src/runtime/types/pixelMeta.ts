// Meta Pixel
// ----------
import type {
  LowercaseTwoLetterCountryCodes,
  MetaModuleOptions,
  CurrencyCodes,
} from './index';

export type MetaEventNames =
  | 'PageView'
  | 'AddPaymentInfo'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'CompleteRegistration'
  | 'Contact'
  | 'CustomizeProduct'
  | 'Donate'
  | 'FindLocation'
  | 'InitiateCheckout'
  | 'Lead'
  | 'Purchase'
  | 'Schedule'
  | 'Search'
  | 'StartTrial'
  | 'SubmitApplication'
  | 'Subscribe'
  | 'ViewContent';

export type MetaApiVersion = '2.0';

interface MetaEventID {
  eventID?: string | null;
}

export type MetaPixelCmd =
  | 'init'
  | 'set'
  | 'track'
  | 'trackCustom'
  | 'trackSingle'
  | 'trackSingleCustom';

export interface MetaQuery {
  (
    cmd: 'set',
    params: {
      option: 'autoConfig'; // //developers.facebook.com/docs/meta-pixel/advanced/#automatic-configuration
      autoMode: boolean;
      pixelID: string;
    },
  ): void;
  (
    cmd: 'init',
    params: {
      pixelID: string;
      userData?: MetaUserData | null;
    },
  ): void;
  (
    cmd: 'track' | 'trackCustom',
    params: {
      eventName: MetaEventNames;
      properties?: MetaParameters;
      eventID?: string;
    },
  ): void;
  (
    cmd: 'trackSingle' | 'trackSingleCustom', // https://developers.facebook.com/ads/blog/post/v2/2017/11/28/event-tracking-with-multiple-pixels-tracksingle/
    params: {
      pixelID: string;
      eventName: MetaEventNames;
      properties?: MetaParameters;
      eventID?: string;
    },
  ): void;
}

// https://developers.facebook.com/docs/meta-pixel/advanced/advanced-matching#reference
export interface MetaUserData {
  [key: string]: any;
  em?: string; // Unhashed lowercase or hashed SHA-256
  fn?: string; // Lowercase letters
  ln?: string; // Lowercase letters
  ph?: string; // Digits only including country code and area code
  external_id?: string; // Any unique ID from the advertiser, such as loyalty membership ID, user ID, and external cookie ID.
  ge?: 'f' | 'm' | ''; // Single lowercase letter, f or m, if unknown, leave blank
  db?: number; // Digits only with birth year, month, then day
  ct?: string; // Lowercase with any spaces removed
  st?: string; // Lowercase two-letter state or province code
  zp?: string; // String
  country?: LowercaseTwoLetterCountryCodes; // Lowercase two-letter country code
}

// https://developers.facebook.com/docs/meta-pixel/implementation/conversion-tracking#object-properites
export interface MetaParameters {
  content_category?: string;
  content_ids?: string[] | number[];
  content_name?: string;
  content_type?: string;
  contents?: any[];
  currency?: CurrencyCodes;
  num_items?: number;
  predicted_ltv?: number;
  search_string?: string;
  status?: boolean;
  value?: number;
  test_event_code?: string;
}

export interface MetaTrackParamsOptions {
  properties?: any;
  pixelID?: string;
  eventID?: string;
}
/* export interface MetaQueryParamsOptions extends MetaTrackParamsOptions {
} */

export interface MetaEventParamsOptions extends MetaTrackParamsOptions {
  cmd: MetaPixelCmd;
  option?: string;
  autoMode?: boolean;
  userData?: MetaUserData | null;
  eventName?: MetaEventNames;
}

export interface MetaPixelOptions extends MetaModuleOptions {
  pixelLoaded: boolean;
  isEnabled: boolean;
  userData: MetaUserData | null;
  eventsQueue: MetaEventParamsOptions[];
}

/* declare namespace MetaPixel {

| facebook.Pixel.ViewContentParameters
                | ViewContentParameters
                | SearchParameters
                | AddToCartParameters
                | AddToWishlistParameters
                | InitiateCheckoutParameters
                | AddPaymentInfoParameters
                | PurchaseParameters
                | LeadParameters
                | CompleteRegistrationParameters
                | CustomParameters,

  interface ViewContentParameters {
    value?: number | undefined;
    currency?: CurrencyCodes | undefined;
    content_name?: string | undefined;
    content_type?: string | undefined;
    content_ids?: string[] | undefined;
    content_category?: string | undefined;
    contents?:
      | Array<{
          id: string;
          quantity: number;
        }>
      | undefined;
  }
  interface SearchParameters {
    value?: number | undefined;
    currency?: CurrencyCodes | undefined;
    content_category?: string | undefined;
    content_ids?: string[] | undefined;
    search_string?: string | undefined;
  }

  interface AddToCartParameters {
    value?: number | undefined;
    currency?: CurrencyCodes | undefined;
    content_name?: string | undefined;
    content_type?: string | undefined;
    content_ids?: string[] | undefined;
  }

  interface AddToWishlistParameters {
    value?: number | undefined;
    currency?: CurrencyCodes | undefined;
    content_name?: string | undefined;
    content_category?: string | undefined;
    content_ids?: string[] | undefined;
  }

  interface InitiateCheckoutParameters {
    value?: number | undefined;
    currency?: CurrencyCodes | undefined;
    content_name?: string | undefined;
    content_category?: string | undefined;
    content_ids?: string[] | undefined;
    num_items?: number | undefined;
  }

  interface AddPaymentInfoParameters {
    value?: number | undefined;
    currency?: CurrencyCodes | undefined;
    content_category?: string | undefined;
    content_ids?: string[] | undefined;
  }

  interface PurchaseParameters {
    value: number;
    currency: CurrencyCodes;
    content_name?: string | undefined;
    content_type?: string | undefined;
    content_ids?: string[] | undefined;
    num_items?: number | undefined;
    order_id?: string | undefined;
  }

  interface LeadParameters {
    value?: number | undefined;
    currency?: CurrencyCodes | undefined;
    content_name?: string | undefined;
    content_category?: string | undefined;
  }

  interface CompleteRegistrationParameters {
    value?: number | undefined;
    currency?: CurrencyCodes | undefined;
    content_name?: string | undefined;
    status?: boolean | undefined;
  }

  type CustomParameters = Record<string, any>;

  interface EventIDOptions {
    eventID: string;
  }
}
 */
