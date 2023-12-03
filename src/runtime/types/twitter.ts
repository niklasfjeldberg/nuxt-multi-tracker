import type { CurrencyCodes } from './index';

export type TwitterPixelMode = 'event' | 'config';

/* Contents, Conversion ID, Email address, Value, Currency */

export type TwitterEventParameters = {
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
