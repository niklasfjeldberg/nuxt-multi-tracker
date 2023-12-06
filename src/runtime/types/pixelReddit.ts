import type { RedditModuleOptions, CurrencyCodes } from './index';

// https://reddit.my.site.com/helpcenter/s/article/Install-the-Reddit-Pixel-on-your-website
export type RedditEventNames =
  | 'PageVisit'
  | 'ViewContent'
  | 'Search'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'Purchase'
  | 'Lead'
  | 'SignUp'
  | 'Custom';

export type RedditPixelCmd = 'init' | 'track' | 'disableFirstPartyCookies';

export type RedditApiVersion = '2.0';

// Options for useRedditPixel
export interface RedditPixelOptions extends RedditModuleOptions {
  pixelLoaded: boolean;
  isEnabled: boolean;
  userData: RedditUserData | null;
  eventsQueue: RedditQueryParamsOptions[];
}

// Reddit Pixel Event Metadata
// https://reddit.my.site.com/helpcenter/s/article/Reddit-Pixel-Event-Metadata
export type RedditParams = {
  customEventName?: string;
  itemCount?: number;
  value?: number;
  currency?: CurrencyCodes;
  conversionId?: string;
  transactionId?: string;
};

// Reddit Pixel Advanced Matching
// https://reddit.my.site.com/helpcenter/s/article/Reddit-Pixel-Advanced-Matching
export interface RedditUserData {
  [key: string]: any;
  email?: string; // Read docs for format needed.
  externalId?: string;
  idfa?: string;
  aaid?: string;
}

export interface RedditEventParamsOptions extends RedditUserData {
  properties?: RedditParams | null;
  eventID?: string | null;
  customEventName?: string;
  conversionId?: string;
}
export interface RedditQueryParamsOptions extends RedditEventParamsOptions {
  pixelID?: string;
  optOut?: boolean;
  useDecimalCurrencyValues?: boolean;
}

export interface RedditParamsInit {
  userData?: RedditUserData | null;
  pixelID?: string;
  optOut?: boolean;
  useDecimalCurrencyValues?: boolean;
}

export interface RedditQuery {
  (cmd: 'track', params: RedditEventParamsOptions): void;
  (cmd: 'init', params: RedditParamsInit): void;
  (cmd: 'disableFirstPartyCookies', params?: null): void;
}

// ---------------------
// Reddit Conversion API
// ---------------------

export interface RedditEvent {
  event_at: string;
  event_type: {
    tracking_type: string;
    custom_event_name?: string;
  };
  click_id?: string;
  event_metadata?: {
    item_count?: number;
    currency?: string;
    value?: number;
    value_decimal?: number;
    conversion_id?: string;
    products?: {
      id: string;
      name: string;
      category: string;
    }[];
  };
  user?: {
    email?: string;
    external_id?: string;
    uuid?: string;
    ip_address?: string;
    user_agent?: string;
    idfa?: string;
    aaid?: string;
    opt_out?: boolean;
    screen_dimensions?: {
      width: number;
      height: number;
    };
  };
}

export interface RedditDataCAPI {
  test_mode?: boolean;
  events: RedditEvent[];
}

export interface RedditResponseCAPI {
  message: string;
  invalid_events: {
    error_message: string;
    event: RedditEvent;
  };
}
