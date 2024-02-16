import { ShadowConfig } from './shadowConfig';
import type { Stylesheet } from './Stylesheet';

export interface IStyleOptions {
  rtl?: boolean;
  specificityMultiplier?: number;
  // stylesheetKey?: string;
  shadowConfig?: ShadowConfig;
  stylesheet?: Stylesheet;
}
