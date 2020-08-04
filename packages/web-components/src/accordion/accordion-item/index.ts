import { customElement } from '@microsoft/fast-element';
import { AccordionItem, AccordionItemTemplate as template } from '@microsoft/fast-foundation';
import { AccordionItemStyles as styles } from './accordion-item.styles';

/**
 * The FAST Accordion Item Element. Implements {@link @microsoft/fast-foundation#AccordionItem},
 * {@link @microsoft/fast-foundation#AccordionItemTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-accordion-item\>
 */
@customElement({
  name: 'fast-accordion-item',
  template,
  styles,
})
export class FASTAccordionItem extends AccordionItem {}

/**
 * Styles for AccordionItem
 * @public
 */
export const AccordionItemStyles = styles;
