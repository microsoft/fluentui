import { attr, FASTElement, nullableNumberConverter } from '@microsoft/fast-element';
import { applyMixins } from '../utils/apply-mixins.js';
import { StartEnd } from '../patterns/index.js';
import {
  CounterBadgeAppearance,
  CounterBadgeColor,
  CounterBadgeShape,
  CounterBadgeSize,
} from './counter-badge.options.js';

/**
 * The base class used for constructing a fluent-badge custom element
 *
 * @tag fluent-counter-badge
 *
 * @public
 */
export class CounterBadge extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * The appearance the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance?: CounterBadgeAppearance;

  /**
   * The color the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: color
   */
  @attr
  public color?: CounterBadgeColor;

  /**
   * The shape the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: shape
   */
  @attr
  public shape?: CounterBadgeShape;

  /**
   * The size the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size?: CounterBadgeSize;

  /**
   * The count the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: count
   */
  @attr({ converter: nullableNumberConverter })
  public count: number = 0;
  protected countChanged() {
    this.setCount();
  }

  /**
   * Max number to be displayed
   *
   * @public
   * @remarks
   * HTML Attribute: overflow-count
   */
  @attr({ attribute: 'overflow-count', converter: nullableNumberConverter })
  public overflowCount: number = 99;
  protected overflowCountChanged() {
    this.setCount();
  }

  /**
   * If the badge should be shown when count is 0
   *
   * @public
   * @remarks
   * HTML Attribute: show-zero
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
  @attr({ mode: 'boolean' })
  public dot: boolean = false;

  /**
   * @internal
   * Function to set the count
   * This is the default slotted content for the counter badge
   * If children are slotted, that will override the value returned
   */
  public setCount(): string | void {
    const count: number | null = this.count ?? 0;

    if ((count !== 0 || this.showZero) && !this.dot) {
      return count > this.overflowCount ? `${this.overflowCount}+` : `${count}`;
    }

    return;
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
