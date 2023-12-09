/*
 * AppData
 * @see {@link https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event}
 *
 * @param {Boolean} application_tracking_enabled
 * @param {Boolean} advertiser_tracking_enabled
 * @param {Boolean} consider_views
 * @param {ExtendedDeviceInfo} extinfo
 * @param {Boolean} include_dwell_data
 * @param {Boolean} include_video_data
 * @param {String} install_referrer
 * @param {String} installer_package
 * @param {Array<String>} url_schemes
 * @param {String} windows_attribution_id
 *
 */

export interface AppData {
  advertiser_tracking_enabled: any;
  consider_views: any;
  extinfo: any;
  include_dwell_data: any;
  include_video_data: any;
  install_referrer: any;
  installer_package: any;
  url_schemes: any;
  windows_attribution_id: any;
}
