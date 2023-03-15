import { ValuesOf } from '@microsoft/fast-foundation';

/**
 * RadioGroupOrientation constants
 * @public
 */
export const RadioGroupOrientation = {
  horizontal: 'horizontal',
  vertical: 'vertical',
} as const;

/**
 * A RadioGroup's orientation can be either horizontal or vertical
 * @public
 */
export type RadioGroupOrientation = ValuesOf<typeof RadioGroupOrientation>;
