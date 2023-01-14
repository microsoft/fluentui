import { attr, FASTElement, nullableNumberConverter } from '@microsoft/fast-element';
import { applyMixins, StartEnd } from '@microsoft/fast-foundation';
import {
  CounterBadgeAppearance,
  CounterBadgeColor,
  CounterBadgeShape,
  CounterBadgeSize,
} from './counter-badge.options.js';

/**
 * The base class used for constructing a fluent-badge custom element
 * @public
 */
export class CounterBadge extends FASTElement {
  /**
   * The appearance the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance: CounterBadgeAppearance = CounterBadgeAppearance.filled;

  /**
   * The color the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: color
   */
  @attr
  public color: CounterBadgeColor = CounterBadgeColor;
  /**
   * The shape the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: shape
   */
  @attr
  public shape: CounterBadgeShape = CounterBadgeAppearance.circular;

  /**
   * The size the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size: CounterBadgeSize = CounterBadgeSize.medium;

  /**
   * The count the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: count
   */
  @attr({ converter: nullableNumberConverter })
  public count: number = 0;

  /**
   * Max number to be displayed
   *
   * @public
   * @remarks
   * HTML Attribute: overflow-count
   */
  @attr({ attribute: 'overflow-count', converter: nullableNumberConverter })
  public overflowCount: number = 99;

  /**
   * If the badge should be shown when count is 0
   *
   * @public
   * @remarks
   * HTML Attribute: showzero
   */
  @attr({ attribute: 'show-zero', mode: 'boolean' })
  public showZero: boolean = false;

  /**
   * If a dot should be displayed without the count
   *
   * @public
   * @remarks
   * HTML Attribute: dot
   */
  @attr
  public dot: boolean = false;

  /**
   * @internal
   * Function to set the count
   * This is the default slotted content for the counter badge
   * If children are slotted, that will override the value returned
   */
  public setCount() {
    if ((this.count !== 0 || this.showZero) && !this.dot) {
      return this.count > this.overflowCount ? `${this.overflowCount}+` : `${this.count}`;
    }
  }
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API extractor.
 * TODO: Below will be unnecessary when Badge class gets updated
 * @internal
 */
/* eslint-disable-next-line */
export interface CounterBadge extends StartEnd {}
applyMixins(CounterBadge, StartEnd);
