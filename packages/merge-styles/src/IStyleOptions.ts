import { PartialShadowConfig } from './shadowConfig';
import type { Stylesheet } from './Stylesheet';

export interface IStyleOptions {
  rtl?: boolean;
  specificityMultiplier?: number;
  shadowConfig?: PartialShadowConfig;
  stylesheet?: Stylesheet;
}
