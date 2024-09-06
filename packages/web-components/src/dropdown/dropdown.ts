import { attr, FASTElement } from '@microsoft/fast-element';
import { DropdownList } from '../dropdown-list/dropdown-list.js';
import { ComboboxDecorator } from '../patterns/combobox.js';

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

  private decorator?: ComboboxDecorator;

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

  /**
   * Associates the component with a DropdownList element. The value references the DropdownList
   * element’s ID.
   *
   * @public
   * @remarks
   * HTML Attribute: `list`
   */
  @attr
  public list?: string;
  protected listChanged() {
    if (this.listElement) {
      this.decorator?.connectListbox(this.listElement);
    }
  }

  /**
   * The associated DropdownList element.
   *
   * @public
   */
  public get listElement(): null | DropdownList {
    if (!this.list || typeof this.list !== 'string') {
      return null;
    }

    const el = document.getElementById(this.list);

    return el instanceof DropdownList ? el : null;
  }

  /**
   * Whether multiple options can be selected.
   *
   * @public
   * @remarks
   * HTML Attribute: `multiple`
   */
  @attr({ mode: 'boolean' })
  public multiple = false;
  protected multipleChanged() {
    this.decorator?.setMultiSelectable(this.multiple);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.listElement) {
      this.decorator = new ComboboxDecorator(this, this.listElement, {
        disabled: this.disabled,
        multiSelectable: this.multiple,
        comboboxEditable: false,
      });
    }
  }

  disconnectedCallback() {
    this.decorator?.remove();
  }

  formDisabledCallback(disabled: boolean) {
    this.setDisabledSideEffect(disabled);
  }

  private setDisabledSideEffect(disabled: boolean) {
    this.elementInternals.ariaDisabled = `${disabled}`;
    this.decorator?.setDisabled(disabled);
  }
}

/**
 * A Dropdown custom element.
 *
 * @public
 */
export class Dropdown extends BaseDropdown {}
