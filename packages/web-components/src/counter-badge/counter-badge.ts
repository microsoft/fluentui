import { attr, FASTElement, nullableNumberConverter } from '@microsoft/fast-element';
// TODO: Remove with https://github.com/microsoft/fast/pull/6797
import { applyMixins } from '../utils/apply-mixins.js';
import { StartEnd } from '../patterns/index.js';
import { toggleState } from '../utils/element-internals.js';
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
   * Handles changes to appearance attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public appearanceChanged(prev: CounterBadgeAppearance | undefined, next: CounterBadgeAppearance | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

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
   * Handles changes to color attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public colorChanged(prev: CounterBadgeColor | undefined, next: CounterBadgeColor | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

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
   * Handles changes to shape attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public shapeChanged(prev: CounterBadgeShape | undefined, next: CounterBadgeShape | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

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
   * Handles changes to size attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public sizeChanged(prev: CounterBadgeSize | undefined, next: CounterBadgeSize | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

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
   * Handles changes to dot attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public dotChanged(prev: boolean | undefined, next: boolean | undefined) {
    toggleState(this.elementInternals, 'dot', !!next);
  }

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
