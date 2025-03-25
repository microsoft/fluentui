import { attr } from '@microsoft/fast-element';
import type { StaticallyComposableHTML } from '../utils/index.js';
import { StartEnd } from '../patterns/index.js';
import type { StartEndOptions } from '../patterns/index.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { swapStates, toggleState } from '../utils/element-internals.js';
import { BaseAccordionItem } from './accordion-item.base.js';
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
 * An Accordion Item Custom HTML Element.
 * Based on BaseAccordionItem and includes style and layout specific attributes
 *
 * @tag fluent-accordion-item
 * 
 */
export class AccordionItem extends BaseAccordionItem {
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
  public sizeChanged(prev: AccordionItemSize | undefined, next: AccordionItemSize | undefined) {
    swapStates(this.elementInternals, prev, next, AccordionItemSize);
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
  public markerPositionChanged(
    prev: AccordionItemMarkerPosition | undefined,
    next: AccordionItemMarkerPosition | undefined,
  ) {
    swapStates(this.elementInternals, prev, next, AccordionItemMarkerPosition, 'align-');
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
