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

export type RedditPixelMode = 'init' | 'track';

export type RedditApiVersion = '2.0';

// https://reddit.my.site.com/helpcenter/s/article/Reddit-Pixel-Event-Metadata
export type RedditEventMetadata = {
  customEventName?: string;
  itemCount?: number;
  value?: number;
  currency?: string;
  conversionId?: string;
  transactionId?: string;
};

// https://reddit.my.site.com/helpcenter/s/article/Reddit-Pixel-Advanced-Matching
export type RedditAdvancedMatching = {
  email?: string;
  externalId?: string;
  idfa?: string;
  aaid?: string;
  optOut?: boolean;
  useDecimalCurrencyValues?: boolean;
};

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
