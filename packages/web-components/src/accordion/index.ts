import { customElement } from '@microsoft/fast-element';
import { Accordion, AccordionTemplate as template } from '@microsoft/fast-foundation';
import { AccordionStyles as styles } from './accordion.styles';

export * from './accordion-item/index';

/**
 * The FluentUI Accordion Element. Implements {@link @microsoft/fast-foundation#Accordion},
 * {@link @microsoft/fast-foundation#AccordionTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-accordion\>
 */
@customElement({
  name: 'fluent-accordion',
  template,
  styles,
  shadowOptions: {
    mode: 'closed',
  },
})
export class FluentAccordion extends Accordion {}

/**
 * Styles for Accordion
 * @public
 */
export const AccordionStyles = styles;
