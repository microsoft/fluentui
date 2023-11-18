import { AccordionItem, AccordionItemOptions, accordionItemTemplate as template } from '@microsoft/fast-foundation';
import { accordionItemStyles as styles } from './accordion-item.styles';

/**
 * The Fluent Accordion Item Element. Implements {@link @microsoft/fast-foundation#AccordionItem},
 * {@link @microsoft/fast-foundation#accordionItemTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-accordion-item\>
 */
export const fluentAccordionItem = AccordionItem.compose<AccordionItemOptions>({
  baseName: 'accordion-item',
  template,
  styles,
  collapsedIcon: `
    <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.15 4.65c.2-.2.5-.2.7 0L6 7.79l3.15-3.14a.5.5 0 11.7.7l-3.5 3.5a.5.5 0 01-.7 0l-3.5-3.5a.5.5 0 010-.7z"/>
    </svg>
  `,
  expandedIcon: `
    <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.15 7.35c.2.2.5.2.7 0L6 4.21l3.15 3.14a.5.5 0 10.7-.7l-3.5-3.5a.5.5 0 00-.7 0l-3.5 3.5a.5.5 0 000 .7z"/>
    </svg>
  `,
});

/**
 * Styles for AccordionItem
 * @public
 */
export const accordionItemStyles = styles;

export { AccordionItem };
