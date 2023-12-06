import type { CurrencyCodes, TwitterModuleOptions } from './index';

export type TwitterPixelCmd = 'event' | 'config';

/* Contents, Conversion ID, Email address, Value, Currency */

// Options for useRedditPixel
export interface TwitterPixelOptions extends TwitterModuleOptions {
  pixelLoaded: boolean;
  isEnabled: boolean;
  userData: any | null;
  eventsQueue: any[];
}

export type TwitterEventNames =
  | 'Page View'
  | 'Purchase'
  | 'Download'
  | 'Custom'
  | 'Lead'
  | 'Add to Cart'
  | 'Checkout Initiated'
  | 'Content View'
  | 'Added Payment Info'
  | 'Search'
  | 'Subscribe'
  | 'Start Trial'
  | 'Add to Wishlist'
  | 'Product Customization';

export type TwitterApiVersion = '1.1';

export type TwitterParams = {
  email_address?: string;
  phone_number?: string;
  value?: number;
  currency?: CurrencyCodes;
  conversion_id?: string;
  search_string?: string;
  description?: string;
  twclid?: string;
  status?: string;
  contents?: {
    content_group_id?: string;
    content_type?: string;
    content_id?: string;
    content_name?: string;
    content_price?: number;
    num_items?: number;
  }[];
};

export interface TwitterQuery {
  (cmd: 'event', option: string | null, params?: TwitterParams | null): void;
  (cmd: 'config', option: string | null, params?: null): void;
}
