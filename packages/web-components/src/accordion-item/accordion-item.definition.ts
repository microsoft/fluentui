import { generateElementName } from '../fluent-design-system.js';
import { AccordionItem, type BaseAccordionItem } from './accordion-item.js';
import { styles } from './accordion-item.styles.js';
import { template } from './accordion-item.template.js';

/**
 * The base name of the {@link BaseAccordionItem | AccordionItem} element.
 *
 * @public
 */
export const baseName = 'accordion-item';

/**
 * The {@link BaseAccordionItem | AccordionItem} custom element definition.
 *
 * @public
 * @remarks
 * HTML Element: `<fluent-accordion-item>`
 */
export const definition = AccordionItem.compose({
  name: generateElementName(baseName),
  template,
  styles,
});

/**
 * Checks if an element is an {@link BaseAccordionItem | AccordionItem}.
 *
 * @param element - The element to check
 * @returns - The element is an AccordionItem
 *
 * @public
 */
export function isAccordionItem(element: Element): element is BaseAccordionItem {
  return element.tagName.toLowerCase().endsWith(baseName);
}
