import type { ValuesOf } from '../utils/index.js';

/**
 * An Accordion Item header font size can be small, medium, large, and extra-large
 */
export const AccordionItemSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
  extraLarge: 'extra-large',
} as const;

/**
 * Applies font size to accordion header
 * @public
 */
export type AccordionItemSize = ValuesOf<typeof AccordionItemSize>;

/**
 * An Accordion Item expand/collapse icon can appear at the start or end of the accordion
 */
export const AccordionItemExpandIconPosition = {
  start: 'start',
  end: 'end',
} as const;

/**
 * Applies expand/collapse icon position
 * @public
 */
export type AccordionItemExpandIconPosition = ValuesOf<typeof AccordionItemExpandIconPosition>;
