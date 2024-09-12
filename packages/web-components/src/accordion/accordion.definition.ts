import { generateElementName } from '../fluent-design-system.js';
import { Accordion } from './accordion.js';
import { styles } from './accordion.styles.js';
import { template } from './accordion.template.js';

/**
 * The base name of the {@link Accordion}.
 *
 * @public
 */
export const baseName = 'accordion';

/**
 * The {@link Accordion} custom element definition.
 *
 * @public
 * @remarks
 * HTML Element: `<fluent-accordion>`
 */
export const definition = Accordion.compose({
  name: generateElementName(baseName),
  template,
  styles,
});

/**
 * Checks if an element is an {@link Accordion}.
 *
 * @param element - The element to check
 * @returns - The element is an Accordion
 *
 * @public
 */
export function isAccordion(element: Element): element is Accordion {
  return element.tagName.toLowerCase().endsWith(baseName);
}
