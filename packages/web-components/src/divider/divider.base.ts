import { attr, FASTElement } from '@microsoft/fast-element';
import { swapStates } from '../utils/element-internals.js';
import { DividerOrientation, DividerRole } from './divider.options.js';

/**
 * A Divider Custom HTML Element.
 * A divider groups sections of content to create visual rhythm and hierarchy. Use dividers along with spacing and headers to organize content in your layout.
 *
 * @public
 */
export class BaseDivider extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * The role of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: role
   */
  @attr
  public role!: DividerRole;

  /**
   * The orientation of the divider.
   *
   * @public
   * @remarks
   * HTML Attribute: orientation
   */
  @attr
  public orientation?: DividerOrientation;

  public connectedCallback(): void {
    super.connectedCallback();

    this.elementInternals.role = this.role ?? DividerRole.separator;

    if (this.role !== DividerRole.presentation) {
      this.elementInternals.ariaOrientation = this.orientation ?? DividerOrientation.horizontal;
    }
  }

  /**
   * Sets the element's internal role when the role attribute changes.
   *
   * @param previous - the previous role value
   * @param next - the current role value
   * @internal
   */
  public roleChanged(previous: string | null, next: string | null): void {
    if (this.$fastController.isConnected) {
      this.elementInternals.role = `${next ?? DividerRole.separator}`;
    }

    if (next === DividerRole.presentation) {
      this.elementInternals.ariaOrientation = null;
    }
  }

  /**
   * Sets the element's internal orientation when the orientation attribute changes.
   *
   * @param previous - the previous orientation value
   * @param next - the current orientation value
   * @internal
   */
  public orientationChanged(previous: DividerRole | undefined, next: DividerRole | undefined): void {
    this.elementInternals.ariaOrientation = this.role !== DividerRole.presentation ? next ?? null : null;

    swapStates(this.elementInternals, previous, next, DividerOrientation);
  }
}
