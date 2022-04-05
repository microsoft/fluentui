import { Accordion, accordionTemplate as template } from '@microsoft/fast-foundation';
import { accordionStyles as styles } from './accordion.styles';

export * from './accordion-item/index';

/**
 * The Fluent Accordion Element. Implements {@link @microsoft/fast-foundation#Accordion},
 * {@link @microsoft/fast-foundation#accordionTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-accordion\>
 */
export const fluentAccordion = Accordion.compose({
  baseName: 'accordion',
  template,
  styles,
});

/**
 * Styles for Accordion
 * @public
 */
export const accordionStyles = styles;

/**
 * Base class for Accordion
 * @public
 */
export { Accordion };
