import type { ShadowConfig } from './shadowConfig';
import type { Stylesheet } from './Stylesheet';

export interface IStyleOptions {
  rtl?: boolean;
  specificityMultiplier?: number;
  shadowConfig?: ShadowConfig;
  stylesheet?: Stylesheet;
}
