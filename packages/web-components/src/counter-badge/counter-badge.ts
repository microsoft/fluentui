import { attr, FASTElement, nullableNumberConverter } from '@microsoft/fast-element';

/**
 * A Counter Badge can be filled, outline, ghost, inverted
 */
export type CounterBadgeAppearance = 'filled' | 'ghost';

/**
 * A Counter Badge can be one of preset colors
 */
export type CounterBadgeColor = 'brand' | 'danger' | 'important' | 'informative';

/**
 * A Counter Badge can be square, circular or rounded.
 */
export type CounterBadgeShape = 'circular' | 'rounded';

/**
 * A Badge can be on of several preset sizes.
 */
export type CounterBadgeSize = 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';

/**
 * @internal
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
  public appearance: CounterBadgeAppearance = 'filled';

  /**
   * The color the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: color
   */
  @attr
  public color: CounterBadgeColor = 'brand';
  /**
   * The shape the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: shape
   */
  @attr
  public shape: CounterBadgeShape = 'circular';

  /**
   * The size the badge should have.
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size: CounterBadgeSize = 'medium';

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
   * Value displayed by the Badge
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr({ converter: nullableNumberConverter })
  public count: number = 0;

  /**
   * If the badge should be shown when count is 0
   *
   * @public
   * @remarks
   * HTML Attribute: showzero
   */
  public showzero: boolean = false;

  /**
   * If a dot should be displayed without the count
   *
   * @public
   * @remarks
   * HTML Attribute: dot
   */
  dot: boolean = false;

  /**
   * Function to set the count when no child nodes are present
   */
  public setCount() {
    return this.count > this.overflowCount ? `${this.overflowCount}+` : `${this.count}`;
  }
}
