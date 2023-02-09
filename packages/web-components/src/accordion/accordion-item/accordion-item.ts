import { attr } from '@microsoft/fast-element';
import { FASTAccordionItem } from '@microsoft/fast-foundation';
import { AccordionItemExpandIconPosition, AccordionItemSize } from './accordion-item.options.js';

/**
 * @internal
 */
export class AccordionItem extends FASTAccordionItem {
  /**
   * Defines accordion header size.
   *
   * @public
   * @default 'medium'
   * @remarks
   * HTML Attribute: appearance
   */
  @attr({ attribute: 'size' })
  public size: AccordionItemSize;

  /**
   * Sets the width of the focus state.
   *
   * @public
   * @remarks
   * HTML Attribute: block
   */
  @attr({ mode: 'boolean' })
  public block: boolean = true;

  /**
   * Sets expand and collapsed icon position.
   *
   * @public
   * @default 'start'
   * @remarks
   * HTML Attribute: expandIconPosition
   */
  @attr({ attribute: 'expand-icon-position' })
  public expandIconPosition: AccordionItemExpandIconPosition;
}
