import { customElement } from '@microsoft/fast-element';
import { AccordionItem } from './accordion-item';
import { accordionItemTemplate as template } from './accordion-item.template';
import { accordionItemStyles as styles } from './accordion-item.styles';

/**
 * THe Accordion Item component
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-accordion-item>`
 */
@customElement({
  name: 'fluent-accordion-item',
  template,
  styles,
})
export class FluentAccordionItem extends AccordionItem {}
