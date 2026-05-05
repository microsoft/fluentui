import type { ValuesOf } from '../utils/typings.js';
import { FluentDesignSystem } from '../fluent-design-system.js';

/**
 * Expand mode for {@link Accordion}
 * @public
 */
export const AccordionExpandMode = {
  single: 'single',
  multi: 'multi',
} as const;

/**
 * Type for the {@link Accordion} Expand Mode
 * @public
 */
export type AccordionExpandMode = ValuesOf<typeof AccordionExpandMode>;

/**
 * The tag name for the accordion element.
 *
 * @public
 */
export const tagName = `${FluentDesignSystem.prefix}-accordion` as const;
