import type { StaticallyComposableHTML } from '../utils/template-helpers.js';
import type { ProgressRing } from './progress-ring.js';

/**
 * ProgressRing configuration options
 * @public
 */
export type ProgressRingOptions = {
  indeterminateIndicator?: StaticallyComposableHTML<ProgressRing>;
};
