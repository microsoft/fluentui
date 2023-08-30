import { ShadowConfig } from './shadowConfig';

export interface IStyleOptions {
  rtl?: boolean;
  specificityMultiplier?: number;
  // stylesheetKey?: string;
  shadowConfig?: ShadowConfig;
}
