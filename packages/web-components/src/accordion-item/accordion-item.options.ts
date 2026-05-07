import { isCustomElement, type ValuesOf } from '../utils/typings.js';
import type { BaseAccordionItem } from './accordion-item.base.js';

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

/**
 * Predicate function that determines if the element should be considered an accordion item element.
 *
 * @param element - The element to check.
 * @param tagName - The tag name to check against, defaults to '-accordion-item'.
 * @returns True if the element is an accordion item element, false otherwise.
 * @public
 */
export function isAccordionItem(
  element?: Node | null,
  tagName: string = '-accordion-item',
): element is BaseAccordionItem {
  return isCustomElement(tagName)(element);
}
