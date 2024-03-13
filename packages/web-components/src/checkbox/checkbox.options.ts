import type { ValuesOf } from '../utils/index.js';

/**
 * Checkbox shape
 * @public
 */
export const CheckboxShape = {
  circular: 'circular',
  square: 'square',
} as const;

export type CheckboxShape = ValuesOf<typeof CheckboxShape>;

/**
 * Checkbox size
 * @public
 */
export const CheckboxSize = {
  medium: 'medium',
  large: 'large',
} as const;

export type CheckboxSize = ValuesOf<typeof CheckboxSize>;

/**
 * Checkbox label position
 * @public
 */
export const CheckboxLabelPosition = {
  before: 'before',
  after: 'after',
} as const;

export type CheckboxLabelPosition = ValuesOf<typeof CheckboxLabelPosition>;
