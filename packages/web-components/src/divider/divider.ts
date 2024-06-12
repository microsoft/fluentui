import { attr, FASTElement } from '@microsoft/fast-element';
import { DividerAlignContent, DividerAppearance, DividerOrientation, DividerRole } from './divider.options.js';

/**
 * A Divider component that provides a customizable divider element.
 * @class Divider
 * @extends FASTElement
 *
 * @attr role - The role of the element.
 * @attr orientation - The orientation of the divider.
 * @attr align-content - Determines the alignment of the content within the divider.
 * @attr appearance - A divider can have one of the preset appearances.
 * @attr inset - Adds padding to the beginning and end of the divider.
 *
 * @csspart root - The root element of the divider.
 *
 * @slot - Default slot for the content of the divider.
 *
 * @summary The Divider component functions as a customizable divider element.
 *
 * @tag fluent-divider
 *
 * @public
 */
export class Divider extends FASTElement {
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

  /**
   * @public
   * @remarks
   * Determines the alignment of the content within the divider. Select from start or end. When not specified, the content will be aligned to the center.
   */
  @attr({ attribute: 'align-content' })
  public alignContent?: DividerAlignContent;

  /**
   * @public
   * @remarks
   * A divider can have one of the preset appearances. Select from strong, brand, subtle. When not specified, the divider has its default appearance.
   */
  @attr
  public appearance?: DividerAppearance;

  /**
   * @public
   * @remarks
   * Adds padding to the beginning and end of the divider.
   */
  @attr({ mode: 'boolean' })
  public inset?: boolean;

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
  public orientationChanged(previous: string | null, next: string | null): void {
    if (this.$fastController.isConnected) {
      this.elementInternals.ariaOrientation = this.role !== DividerRole.presentation ? next : null;
    }
  }
}
