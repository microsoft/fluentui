import type { StaticallyComposableHTML } from '../utils/template-helpers.js';
import type { ValuesOf } from '../utils/typings.js';
import type { Checkbox } from './checkbox.js';

/**
 * Checkbox configuration options
 * @public
 */
export type CheckboxOptions = {
  checkedIndicator?: StaticallyComposableHTML<Checkbox>;
  indeterminateIndicator?: StaticallyComposableHTML<Checkbox>;
};

/**
 * Checkbox shape
 * @public
 */
export const CheckboxShape = {
  circular: 'circular',
  square: 'square',
} as const;

/** @public */
export type CheckboxShape = ValuesOf<typeof CheckboxShape>;

/**
 * Checkbox size
 * @public
 */
export const CheckboxSize = {
  medium: 'medium',
  large: 'large',
} as const;

/** @public */
export type CheckboxSize = ValuesOf<typeof CheckboxSize>;
