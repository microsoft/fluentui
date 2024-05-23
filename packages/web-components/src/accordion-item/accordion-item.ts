import { attr, FASTElement, nullableNumberConverter } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import type { StaticallyComposableHTML } from '../utils/index.js';
import { StartEnd } from '../patterns/index.js';
import type { StartEndOptions } from '../patterns/index.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { AccordionItemExpandIconPosition, AccordionItemSize } from './accordion-item.options.js';

/**
 * Accordion Item configuration options
 * @public
 */
export type AccordionItemOptions = StartEndOptions<AccordionItem> & {
  expandedIcon?: StaticallyComposableHTML<AccordionItem>;
  collapsedIcon?: StaticallyComposableHTML<AccordionItem>;
};

/**
 *
 * @slot start - Content which can be provided between the heading and the icon
 * @slot end - Content which can be provided between the start slot and icon
 * @slot heading - Content which serves as the accordion item heading and text of the expand button
 * @slot - The default slot for accordion item content
 * @slot expanded-icon - The expanded icon
 * @slot collapsed-icon - The collapsed icon
 * @fires change - Fires a custom 'change' event when the button is invoked
 * @csspart heading - Wraps the button
 * @csspart button - The button which serves to invoke the item
 * @csspart heading-content - Wraps the slot for the heading content within the button
 * @csspart icon - The icon container
 * @csspart region - The wrapper for the accordion item content
 *
 * @public
 */
export class AccordionItem extends FASTElement {
  /**
   * Configures the {@link https://www.w3.org/TR/wai-aria-1.1/#aria-level | level} of the
   * heading element.
   *
   * @public
   * @remarks
   * HTML attribute: heading-level
   */
  @attr({
    attribute: 'heading-level',
    mode: 'fromView',
    converter: nullableNumberConverter,
  })
  public headinglevel: 1 | 2 | 3 | 4 | 5 | 6 = 2;

  /**
   * Expands or collapses the item.
   *
   * @public
   * @remarks
   * HTML attribute: expanded
   */
  @attr({ mode: 'boolean' })
  public expanded: boolean = false;

  /**
   * Disables an accordion item
   *
   * @public
   * @remarks
   * HTML attribute: disabled
   */
  @attr({ mode: 'boolean' })
  public disabled: boolean = false;

  /**
   * The item ID
   *
   * @public
   * @remarks
   * HTML Attribute: id
   */
  @attr
  public id: string = uniqueId('accordion-');

  /**
   * Defines accordion header font size.
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size?: AccordionItemSize;

  /**
   * Sets the width of the focus state.
   *
   * @public
   * @remarks
   * HTML Attribute: block
   */
  @attr({ mode: 'boolean' })
  public block: boolean = false;

  /**
   * Sets expand and collapsed icon position.
   *
   * @public
   * @remarks
   * HTML Attribute: expand-icon-position
   */
  @attr({ attribute: 'expand-icon-position' })
  public expandIconPosition?: AccordionItemExpandIconPosition;

  /**
   * @internal
   */
  public expandbutton!: HTMLElement;

  /**
   * @internal
   */
  public clickHandler = (e: MouseEvent) => {
    if (this.disabled) {
      return;
    }

    this.$emit('click', e);
  };
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface AccordionItem extends StartEnd {}
applyMixins(AccordionItem, StartEnd);
