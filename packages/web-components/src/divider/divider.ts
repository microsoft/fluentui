import { attr, FASTElement } from '@microsoft/fast-element';
import { swapStates, toggleState } from '../utils/element-internals.js';
import { DividerAlignContent, DividerAppearance, DividerOrientation, DividerRole } from './divider.options.js';

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

/**
 * A Divider Custom HTML Element.
 * Based on BaseDivider and includes style and layout specific attributes
 *
 * @public
 */
export class Divider extends BaseDivider {
  /**
   * @public
   * @remarks
   * Determines the alignment of the content within the divider. Select from start or end. When not specified, the content will be aligned to the center.
   */
  @attr({ attribute: 'align-content' })
  public alignContent?: DividerAlignContent;

  /**
   * Handles changes to align-content attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public alignContentChanged(prev: DividerAlignContent | undefined, next: DividerAlignContent | undefined) {
    swapStates(this.elementInternals, prev, next, DividerAlignContent, 'align-');
  }

  /**
   * @public
   * @remarks
   * A divider can have one of the preset appearances. Select from strong, brand, subtle. When not specified, the divider has its default appearance.
   */
  @attr
  public appearance?: DividerAppearance;

  /**
   * Handles changes to appearance attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public appearanceChanged(prev: DividerAppearance | undefined, next: DividerAppearance | undefined) {
    swapStates(this.elementInternals, prev, next, DividerAppearance);
  }

  /**
   * @public
   * @remarks
   * Adds padding to the beginning and end of the divider.
   */
  @attr({ mode: 'boolean' })
  public inset?: boolean;

  /**
   * Handles changes to inset custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public insetChanged(prev: boolean, next: boolean) {
    toggleState(this.elementInternals, 'inset', next);
  }
}
