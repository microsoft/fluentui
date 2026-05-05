import type { ValuesOf } from '../utils/typings.js';

/**
 * SwitchLabelPosition Constants
 * @public
 */
export const SwitchLabelPosition = {
  above: 'above',
  after: 'after',
  before: 'before',
} as const;

/**
 * Applies label position
 * @public
 */
export type SwitchLabelPosition = ValuesOf<typeof SwitchLabelPosition>;
