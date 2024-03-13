import type { ValuesOf } from '../utils/index.js';

/**
 * Expand mode for {@link FASTAccordion}
 * @public
 */
export const AccordionExpandMode = {
  single: 'single',
  multi: 'multi',
} as const;

/**
 * Type for the {@link FASTAccordion} Expand Mode
 * @public
 */
export type AccordionExpandMode = ValuesOf<typeof AccordionExpandMode>;
