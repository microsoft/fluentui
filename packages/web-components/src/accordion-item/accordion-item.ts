import { attr, FASTElement, nullableNumberConverter } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import type { StaticallyComposableHTML } from '../utils/index.js';
import { StartEnd } from '../patterns/index.js';
import type { StartEndOptions } from '../patterns/index.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { toggleState } from '../utils/element-internals.js';
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
export class AccordionItem extends FASTElement {
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
  @attr({ mode: 'boolean' })
  public expanded: boolean = false;

  /**
   * Handles expanded changes
   * @param prev - previous value
   * @param next - next value
   */
  public expandedChanged(prev: boolean, next: boolean): void {
    toggleState(this.elementInternals, 'expanded', next);
  }

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
   * Handles disabled changes
   * @param prev - previous value
   * @param next - next value
   */
  public disabledChanged(prev: boolean, next: boolean): void {
    toggleState(this.elementInternals, 'disabled', next);
  }

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
   * Handles changes to size attribute
   * @param prev - previous value
   * @param next - next value
   */
  public sizeChanged(prev: AccordionItemSize, next: AccordionItemSize): void {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    } else {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

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
   * Handles changes to block attribute
   * @param prev - previous value
   * @param next - next value
   */
  public blockChanged(prev: boolean, next: boolean): void {
    toggleState(this.elementInternals, 'block', next);
  }

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
    } else {
      toggleState(this.elementInternals, `align-${next}`, true);
    }
  }

  /**
   * @internal
   */
  public expandbutton!: HTMLElement;
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
