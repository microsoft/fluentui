import { FluentDesignSystem } from '../fluent-design-system.js';
import type { ValuesOf } from '../utils/index.js';

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
 * The tag name for the switch element.
 *
 * @public
 */
export const tagName = `${FluentDesignSystem.prefix}-switch` as const;
