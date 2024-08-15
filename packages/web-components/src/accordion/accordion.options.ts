import type { ValuesOf } from '../utils/index.js';

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
