import { attr, FASTElement, nullableNumberConverter, volatile } from '@microsoft/fast-element';

/**
 * The base class used for constructing a fluent-counter-badge custom element.
 * Contains the count-related state and display logic, without any visual
 * appearance attributes.
 *
 * @public
 */
export class BaseCounterBadge extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * The count to be displayed in the badge.
   *
   * @public
   * @remarks
   * HTML Attribute: `count`
   */
  @attr({ converter: nullableNumberConverter })
  public count: number = 0;

  /**
   * The maximum count to be displayed before showing the overflow count (e.g. "99+").
   *
   * @public
   * @remarks
   * HTML Attribute: `overflow-count`
   */
  @attr({ attribute: 'overflow-count', converter: nullableNumberConverter })
  public overflowCount: number = 99;

  /**
   * Whether to show the badge when the count is zero. By default, the badge will be hidden when the count is zero.
   *
   * @public
   * @remarks
   * HTML Attribute: `show-zero`
   */
  @attr({ attribute: 'show-zero', mode: 'boolean' })
  public showZero: boolean = false;

  /**
   * Whether to display the badge as a dot. When true, the badge will be displayed as a dot and the count will not be
   * shown.
   *
   * @public
   * @remarks
   * HTML Attribute: `dot`
   */
  @attr({ mode: 'boolean' })
  public dot: boolean = false;

  /**
   * The value to be displayed in the badge, which is determined by the `count`, `overflow-count`, and `show-zero` attributes.
   *
   * @public
   */
  @volatile
  public get displayValue(): string | undefined {
    const count: number = this.count ?? 0;

    if ((!this.showZero && count === 0) || this.dot) {
      return '';
    }

    if (this.overflowCount > 0 && count > this.overflowCount) {
      return `${this.overflowCount}+`;
    }

    return `${count}`;
  }
}
