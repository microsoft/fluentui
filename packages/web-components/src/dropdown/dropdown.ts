import { attr, FASTElement } from '@microsoft/fast-element';

/**
 * Base class for a Dropdown custom element.
 *
 * @public
 */
export class BaseDropdown extends FASTElement {
  /**
   * The form-associated flag.
   * @see {@link https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-face-example | Form-associated custom elements}
   *
   * @public
   */
  static readonly formAssociated = true;

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * Sets the element's disabled state.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/disabled | `disabled`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `disabled`
   */
  @attr({ mode: 'boolean' })
  public disabled = false;
  protected disabledChanged() {
    this.setDisabledSideEffect(this.disabled);
  }

  constructor() {
    super();

    this.elementInternals.role = 'combobox';
    this.elementInternals.ariaExpanded = 'false';
  }

  /**
   * @internal
   */
  public formDisabledCallback(disabled: boolean) {
    this.setDisabledSideEffect(disabled);
  }

  private setDisabledSideEffect(disabled: boolean) {
    this.elementInternals.ariaDisabled = `${disabled}`;
  }
}

/**
 * A Dropdown custom element.
 *
 * @public
 */
export class Dropdown extends BaseDropdown {}
