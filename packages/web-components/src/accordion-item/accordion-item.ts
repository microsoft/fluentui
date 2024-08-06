import { attr, FASTElement, nullableNumberConverter } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import type { StaticallyComposableHTML } from '../utils/index.js';
import { StartEnd } from '../patterns/index.js';
import type { StartEndOptions } from '../patterns/index.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { toggleAttrState, toggleState } from '../utils/element-internals.js';
import { AccordionItemMarkerPosition, AccordionItemSize } from './accordion-item.options.js';

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
 * @slot start - Content positioned before heading in the collapsed state
 * @slot heading - Content which serves as the accordion item heading and text of the expand button
 * @slot - The default slot for accordion item content
 * @slot marker-expanded - The expanded icon
 * @slot marker-collapsed - The collapsed icon
 * @csspart heading - Wraps the button
 * @csspart button - The button which serves to invoke the item
 * @csspart content - The wrapper for the accordion item content
 *
 * @public
 */
export class BaseAccordionItem extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

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
  @toggleAttrState
  @attr({ mode: 'boolean' })
  public expanded: boolean = false;

  /**
   * Disables an accordion item
   *
   * @public
   * @remarks
   * HTML attribute: disabled
   */
  @toggleAttrState
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
   * @internal
   */
  public expandbutton!: HTMLElement;
}

/**
 * An Accordion Item Custom HTML Element.
 * Based on BaseAccordionItem and includes style and layout specific attributes
 *
 * @public
 */
export class AccordionItem extends BaseAccordionItem {
  /**
   * Defines accordion header font size.
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @toggleAttrState
  @attr
  public size?: AccordionItemSize;

  /**
   * Sets expand and collapsed icon position.
   *
   * @public
   * @remarks
   * HTML Attribute: marker-position
   */
  @attr({ attribute: 'marker-position' })
  public markerPosition?: AccordionItemMarkerPosition;

  /**
   * Handles changes to marker-position attribute
   * @param prev - previous value
   * @param next - next value
   */
  public markerPositionChanged(prev: AccordionItemMarkerPosition, next: AccordionItemMarkerPosition): void {
    if (prev) {
      toggleState(this.elementInternals, `align-${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `align-${next}`, true);
    }
  }

  /**
   * Sets the width of the focus state.
   *
   * @public
   * @remarks
   * HTML Attribute: block
   */
  @toggleAttrState
  @attr({ mode: 'boolean' })
  public block: boolean = false;
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
