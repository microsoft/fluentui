import { attr, FASTElement } from '@microsoft/fast-element';

/**
 * The base class used for constructing a fluent-avatar custom element
 * @public
 */
export class BaseAvatar extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * The name of the person or entity represented by this Avatar. This should always be provided if it is available.
   *
   * @public
   * @remarks
   * HTML Attribute: name
   */
  @attr
  public name?: string | undefined;

  /**
   * Provide custom initials rather than one generated via the name
   *
   * @public
   * @remarks
   * HTML Attribute: name
   */
  @attr
  public initials?: string | undefined;

  constructor() {
    super();

    this.elementInternals.role = 'img';
  }
}
