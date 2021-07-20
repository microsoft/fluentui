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
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.15 5.65c.2-.2.5-.2.7 0L8 9.79l4.15-4.14a.5.5 0 01.7.7l-4.5 4.5a.5.5 0 01-.7 0l-4.5-4.5a.5.5 0 010-.7z"/>
    </svg>
  `,
  expandedIcon: `
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.15 10.35c.2.2.5.2.7 0L8 6.21l4.15 4.14a.5.5 0 00.7-.7l-4.5-4.5a.5.5 0 00-.7 0l-4.5 4.5a.5.5 0 000 .7z"/>
    </svg>
  `,
});

/**
 * Styles for AccordionItem
 * @public
 */
export const accordionItemStyles = styles;

export { AccordionItem };
