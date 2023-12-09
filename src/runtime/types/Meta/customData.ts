import type { Content } from './content.ts';
import type { CurrencyCodes } from '../index';
/**
 * CustomData represents the Custom Data Parameters of a Conversions API Event Request. Use these parameters to send additional data we can use for ads delivery optimization.
 * @see {@link https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/custom-data}
 */
export interface CustomData {
  _value: number;
  _currency: CurrencyCodes;
  _content_name: string;
  _content_category: string;
  _content_ids: string[];
  _contents: Content[];
  _content_type: string;
  _order_id: string;
  _predicted_ltv: number;
  _num_items: number;
  _search_string: string;
  _status: string;
  _item_number: string;
  _delivery_category: string;
  _custom_properties: Record<any, any>;
}
/**
 * @param {Number} value value of the item Eg: 123.45
 * @param {String} currency currency involved in the transaction Eg: usd
 * @param {String} content_name name of the Content Eg: lettuce
 * @param {String} content_category category of the content Eg: grocery
 * @param {string[]} content_ids list of content unique ids involved in the event
 * @param {Content[]} contents Array of Content Objects. Use {Content} class to define a content.
 * @param {String} content_type Type of the Content group or Product SKU
 * @param {String} order_id Unique id representing the order
 * @param {Number} predicted_ltv Predicted LifeTime Value for the customer involved in the event
 * @param {Number} num_items Number of items involved
 * @param {String} search_string query string used for the Search event
 * @param {String} status Status of the registration in Registration event
 * @param {String} item_number The item number
 * @param {String} delivery_category The type of delivery for a purchase event
 * @param {Object} custom_properties Custom Properties to be added to the Custom Data
 */
