import { attr, observable } from '@microsoft/fast-element';
import { ARIAGlobalStatesAndProperties, StartEnd } from '../patterns/index.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { FormAssociatedButton } from './button.form-associated.js';
import { ButtonAppearance, ButtonShape, ButtonSize, ButtonType } from './button.options.js';

/**
 * A Button Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element }.
 *
 * @slot start - Content which can be provided before the button content
 * @slot end - Content which can be provided after the button content
 * @slot - The default slot for button content
 * @csspart control - The button element
 * @csspart content - The element wrapping button content
 *
 * @public
 */
export class Button extends FormAssociatedButton {
  /**
   * Determines if the element should receive document focus on page load.
   *
   * @public
   * @remarks
   * HTML Attribute: autofocus
   */
  @attr({ mode: 'boolean' })
  public autofocus!: boolean;

  /**
   * The id of a form to associate the element to.
   *
   * @public
   * @remarks
   * HTML Attribute: form
   */
  @attr({ attribute: 'form' })
  public formId!: string;

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
   *
   * @public
   * @remarks
   * HTML Attribute: formaction
   */
  @attr
  public formaction!: string;
  protected formactionChanged(): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.formAction = this.formaction;
    }
  }

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
   *
   * @public
   * @remarks
   * HTML Attribute: formenctype
   */
  @attr
  public formenctype!: string;
  protected formenctypeChanged(): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.formEnctype = this.formenctype;
    }
  }

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
   *
   * @public
   * @remarks
   * HTML Attribute: formmethod
   */
  @attr
  public formmethod!: string;
  protected formmethodChanged(): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.formMethod = this.formmethod;
    }
  }

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
   *
   * @public
   * @remarks
   * HTML Attribute: formnovalidate
   */
  @attr({ mode: 'boolean' })
  public formnovalidate!: boolean;
  protected formnovalidateChanged(): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.formNoValidate = this.formnovalidate;
    }
  }

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
   *
   * @public
   * @remarks
   * HTML Attribute: formtarget
   */
  @attr
  public formtarget!: '_self' | '_blank' | '_parent' | '_top';
  protected formtargetChanged(): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.formTarget = this.formtarget;
    }
  }

  /**
   * The button type.
   *
   * @public
   * @remarks
   * HTML Attribute: type
   */
  @attr
  public type!: ButtonType;
  protected typeChanged(previous: ButtonType | undefined, next: ButtonType): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.type = this.type;
    }

    next === ButtonType.submit && this.addEventListener('click', this.handleSubmission);
    previous === ButtonType.submit && this.removeEventListener('click', this.handleSubmission);
    next === ButtonType.reset && this.addEventListener('click', this.handleFormReset);
    previous === ButtonType.reset && this.removeEventListener('click', this.handleFormReset);
  }

  /**
   * The appearance the button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance?: ButtonAppearance | undefined;

  /**
   * The shape the button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: shape
   */
  @attr
  public shape?: ButtonShape | undefined;

  /**
   * The size the button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size?: ButtonSize;

  /**
   * The button has an icon only, no text content
   *
   * @public
   * @remarks
   * HTML Attribute: icon-only
   */
  @attr({ attribute: 'icon-only', mode: 'boolean' })
  public iconOnly: boolean = false;

  /**
   * The button is disabled but focusable
   *
   * @public
   * @remarks
   * HTML Attribute: disabled-focusable
   */
  @attr({ attribute: 'disabled-focusable', mode: 'boolean' })
  public disabledFocusable?: boolean = false;
  protected disabledFocusableChanged(prev: boolean, next: boolean): void {
    if (!this.$fastController.isConnected) {
      return;
    }

    if (this.disabledFocusable) {
      ((this as unknown) as HTMLElement).setAttribute('aria-disabled', 'true');
    } else {
      ((this as unknown) as HTMLElement).removeAttribute('aria-disabled');
    }
  }

  /**
   * Prevents disabledFocusable click events
   */
  private handleDisabledFocusableClick = (e: MouseEvent): void => {
    if (e && this.disabledFocusable) {
      e.stopImmediatePropagation();
      return;
    }
  };

  /**
   *
   * Default slotted content
   *
   * @public
   * @remarks
   */
  @observable
  public defaultSlottedContent!: HTMLElement[];

  /** {@inheritDoc (FormAssociated:interface).validate} */
  public validate(): void {
    super.validate(this.control);
  }

  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();

    this.proxy.setAttribute('type', this.type);
    ((this as unknown) as HTMLElement).addEventListener('click', this.handleDisabledFocusableClick);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();

    ((this as unknown) as HTMLElement).removeEventListener('click', this.handleDisabledFocusableClick);
  }

  /**
   * Submits the parent form
   */
  private handleSubmission = () => {
    if (!this.form) {
      return;
    }

    const attached = this.proxy.isConnected;

    if (!attached) {
      this.attachProxy();
    }

    // Browser support for requestSubmit is not comprehensive
    // so click the proxy if it isn't supported
    typeof this.form.requestSubmit === 'function' ? this.form.requestSubmit(this.proxy) : this.proxy.click();

    if (!attached) {
      this.detachProxy();
    }
  };

  /**
   * Resets the parent form
   */
  private handleFormReset = () => {
    this.form?.reset();
  };

  public control!: HTMLButtonElement;
}

/**
 * Includes ARIA states and properties relating to the ARIA button role
 *
 * @public
 */
export class DelegatesARIAButton {
  /**
   * See {@link https://www.w3.org/WAI/PF/aria/roles#button} for more information
   * @public
   * @remarks
   * HTML Attribute: aria-expanded
   */
  @attr({ attribute: 'aria-expanded' })
  public ariaExpanded!: 'true' | 'false' | string | null;

  /**
   * See {@link https://www.w3.org/WAI/PF/aria/roles#button} for more information
   * @public
   * @remarks
   * HTML Attribute: aria-pressed
   */
  @attr({ attribute: 'aria-pressed' })
  public ariaPressed!: 'true' | 'false' | 'mixed' | string | null;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export type DelegatesARIAButton = ARIAGlobalStatesAndProperties;
applyMixins(DelegatesARIAButton, ARIAGlobalStatesAndProperties);

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface Button extends StartEnd, DelegatesARIAButton {}
applyMixins(Button, StartEnd, DelegatesARIAButton);
