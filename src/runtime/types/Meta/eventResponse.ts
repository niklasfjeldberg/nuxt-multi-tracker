/**
 * EventResponse
 * @see {@link https://developers.facebook.com/docs/marketing-api/conversions-api/parameters}
 */
export interface EventResponse {
  _events_received: number;
  _messages: string[];
  _fbtrace_id: string;
  _id: string;
  _num_processed_entries: number;
}
/**
 * @param {Number} events_received
 * @param {string[]} messages
 * @param {String} fbtrace_id
 * @param {String} id
 * @param {Number} num_processed_entries
 */
