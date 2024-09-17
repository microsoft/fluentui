import type { ValuesOf } from '../utils/typings.js';

/**
 * An example Tooltip option
 * @public
 */
export const TooltipPositioning = {
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
};

/**
 * An example TooltipPosition type
 * @public
 */
export type TooltipPositioning = ValuesOf<typeof TooltipPositioning>;
