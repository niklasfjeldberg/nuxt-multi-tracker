import type { UserData } from './userData';
import type { CustomData } from './customData';
/**
 * ServerEvent
 * @see {@link https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event}
 *
 * @param {String} event_name A Facebook pixel Standard Event or Custom Event name.
 * @param {Number} event_time A Unix timestamp in seconds indicating when the actual event occurred.
 * @param {String} event_source_url The browser URL where the event happened.
 * @param {String} event_id This ID can be any string chosen by the advertiser.
 * @param {String} action_source A string that indicates where the event took place.
 * @param {Boolean} opt_out A flag that indicates we should not use this event for ads delivery optimization.
 * @param {UserData} user_data A map that contains user data. See UserData Class for options.
 * @param {CustomData} custom_data A map that contains user data. See CustomData Class for options.
 * @param {string[]} data_processing_options Processing options you would like to enable for a specific event.
 * @param {Number} data_processing_options_country A country that you want to associate to this data processing option.
 * @param {Number} data_processing_options_state A state that you want to associate with this data processing option.
 * @param {String} advanced_measurement_table Name of Advanced Measurement table. Only used for the Advanced Measurement API in the Advanced Analytics product.
 * @param {Boolean} advertiser_tracking_enabled A boolean that indicates whether the user has opted into/out of advertiser tracker on apps.
 */

export interface ServerEvent {
  _event_name: string;
  _event_time: number;
  _event_source_url: string;
  _event_id: string;
  _action_source:
    | 'email'
    | 'website'
    | 'app'
    | 'phone_call'
    | 'chat'
    | 'physical_store'
    | 'system_generated'
    | 'other';
  _opt_out: boolean;
  _user_data: UserData;
  _custom_data: CustomData;
  _app_data: any; // type: AppData
  _data_processing_options: string[];
  _data_processing_options_state: number;
  _data_processing_options_country: number;
  _advanced_measurement_table: string;
  _advertiser_tracking_enabled: boolean;
}
