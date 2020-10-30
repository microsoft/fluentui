import { customElement } from '@microsoft/fast-element';
import { AccordionItem, AccordionItemTemplate as template } from '@microsoft/fast-foundation';
import { AccordionItemStyles as styles } from './accordion-item.styles';

/**
 * The Fluent Accordion Item Element. Implements {@link @microsoft/fast-foundation#AccordionItem},
 * {@link @microsoft/fast-foundation#AccordionItemTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-accordion-item\>
 */
@customElement({
  name: 'fluent-accordion-item',
  template,
  styles,
})
export class FluentAccordionItem extends AccordionItem {}

/**
 * Styles for AccordionItem
 * @public
 */
export const AccordionItemStyles = styles;
