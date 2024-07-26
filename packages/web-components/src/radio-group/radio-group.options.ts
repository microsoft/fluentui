import type { ValuesOf } from '../utils/index.js';

/**
 * Radio Group orientation
 * @public
 */
export const RadioGroupOrientation = {
  horizontal: 'horizontal',
  vertical: 'vertical',
} as const;

/**
 * Types of Radio Group orientation
 * @public
 */
export type RadioGroupOrientation = ValuesOf<typeof RadioGroupOrientation>;
