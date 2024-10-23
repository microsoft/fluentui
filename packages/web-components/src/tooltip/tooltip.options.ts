import type { ValuesOf } from '../utils/typings.js';

/**
 * The TooltipPositioning options and their corresponding CSS values
 * @public
 */
export const TooltipPositioningOption = {
  'above-start': 'block-start span-inline-end',
  above: 'block-start',
  'above-end': 'block-start span-inline-start',
  'below-start': 'block-end span-inline-end',
  below: 'block-end',
  'below-end': 'block-end span-inline-start',
  'before-top': 'inline-start span-block-end',
  before: 'inline-start',
  'before-bottom': 'inline-start span-block-start',
  'after-top': 'inline-end span-block-end',
  after: 'inline-end',
  'after-bottom': 'inline-end span-block-start',
} as const;

/**
 * The TooltipPositioning type
 * @public
 */
export type TooltipPositioningOption = ValuesOf<typeof TooltipPositioningOption>;
