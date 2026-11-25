import { FluentDesignSystem } from '../fluent-design-system.js';
import type { ValuesOf } from '../utils/typings.js';

/**
 * The TooltipPositioning options
 * @public
 */
export const TooltipPositioningOption = {
  'above-start': 'above-start',
  above: 'above',
  'above-end': 'above-end',
  'below-start': 'below-start',
  below: 'below',
  'below-end': 'below-end',
  'before-top': 'before-top',
  before: 'before',
  'before-bottom': 'before-bottom',
  'after-top': 'after-top',
  after: 'after',
  'after-bottom': 'after-bottom',
} as const;

/**
 * The TooltipPositioning type
 * @public
 */
export type TooltipPositioningOption = ValuesOf<typeof TooltipPositioningOption>;

/**
 * The tag name for the tooltip element.
 *
 * @public
 */
export const tagName = `${FluentDesignSystem.prefix}-tooltip` as const;
