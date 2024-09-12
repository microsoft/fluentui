import type { StartEndOptions } from '../patterns/start-end.js';
import type { StaticallyComposableHTML } from '../utils/template-helpers.js';
import type { ValuesOf } from '../utils/typings.js';
import type { AccordionItem } from './accordion-item.js';

/**
 * Accordion Item configuration options
 * @public
 */
export type AccordionItemOptions = StartEndOptions<AccordionItem> & {
  expandedIcon?: StaticallyComposableHTML<AccordionItem>;
  collapsedIcon?: StaticallyComposableHTML<AccordionItem>;
};

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
export const AccordionItemMarkerPosition = {
  start: 'start',
  end: 'end',
} as const;

/**
 * Applies expand/collapse icon position
 * @public
 */
export type AccordionItemMarkerPosition = ValuesOf<typeof AccordionItemMarkerPosition>;
