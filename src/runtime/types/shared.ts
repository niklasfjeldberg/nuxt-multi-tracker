import type { LowercaseTwoLetterCountryCodes } from './index';

export interface SharedUserData {
  em?: string;
  fn?: string;
  ln?: string;
  ph?: string;
  external_id?: string;
  ge?: 'f' | 'm' | '';
  db?: number;
  ct?: string;
  st?: string;
  zp?: string;
  country?: LowercaseTwoLetterCountryCodes;
}
