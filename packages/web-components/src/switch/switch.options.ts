import { ValuesOf } from '@microsoft/fast-foundation';

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

/**
 * SwitchSize Constants
 * @public
 */
export const SwitchSize = {
  small: 'small',
  medium: 'medium',
} as const;

/**
 * Applies size variation
 * @public
 */
export type SwitchSize = ValuesOf<typeof SwitchSize>;
