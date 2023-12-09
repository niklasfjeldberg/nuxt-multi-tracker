/* import HttpServiceInterface from './http-service-interface'; */
import type { ServerEvent } from './serverEvent';
/**
 * EventRequest
 * @see {@link https://developers.facebook.com/docs/marketing-api/conversions-api/parameters}
 */
export interface EventRequest {
  _access_token: string;
  _pixel_id: string;
  _events: ServerEvent[];
  _partner_agent: string | null | undefined;
  _test_event_code: string | null | undefined;
  _namespace_id: string | null | undefined;
  _upload_id: string | null | undefined;
  _upload_tag: string | null | undefined;
  _upload_source: string | null | undefined;
  _debug_mode: boolean;
  _api: Record<any, any>;
  _http_service: null | undefined; // HttpServiceInterface |
}
/**
 * @param {String} access_token Access Token for the user calling Graph API
 * @param {String} pixel_id Pixel Id to which you are sending the events
 * @param {ServerEvent[]} events Data for the request Payload for a Conversions API Event
 * @param {?String} partner_agent Platform from which the event is sent e.g. wordpress
 * @param {?String} test_event_code Test Event Code used to verify that your server events are received correctly by Facebook.
 * @param {?String} namespace_id Scope used to resolve extern_id or Third-party ID. Can be another data set or data partner ID.
 * @param {?String} upload_id Unique id used to denote the current set being uploaded.
 * @param {?String} upload_tag Tag string added to track your Offline event uploads.
 * @param {?String} upload_source The origin/source of data for the dataset to be uploaded.
 * @param {Boolean} debug_mode_flag Set to true if you want to enable more logging in SDK
 * @param {?HttpServiceInterface} http_service Override the default http request method by setting an object that implements HttpServiceInterface
 */
