import { attr } from '@microsoft/fast-element';
import { FASTAccordionItem } from '@microsoft/fast-foundation';
import { AccordionItemExpandIconPosition, AccordionItemSize } from './accordion-item.options.js';

/**
 * @internal
 */
class AccordionItem extends FASTAccordionItem {
  /**
   * Defines accordion header size.
   *
   * @public
   * @default 'medium'
   * @remarks
   * HTML Attribute: appearance
   */
  @attr({ attribute: 'appearance' })
  public appearance: AccordionItemSize;

  /**
   * Sets the width of the focus state.
   *
   * @public
   * @remarks
   * HTML Attribute: block
   */
  @attr({ mode: 'boolean' })
  block: boolean = true;

  /**
   * Sets expand and collapsed icon position.
   *
   * @public
   * @default 'start'
   * @remarks
   * HTML Attribute: expandIconPosition
   */
  @attr({ attribute: 'expandIconPosition' })
  public expandIconPosition: AccordionItemSize;
}

export { AccordionItem };
