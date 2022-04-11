import { attr, observable } from '@microsoft/fast-element';
import { applyMixins, ARIAGlobalStatesAndProperties } from '@microsoft/fast-foundation';
import { FormAssociatedButton } from './button.form-associated';

/**
 * Types of button appearance.
 * @public
 */
export type ButtonAppearance = undefined | 'primary' | 'subtle' | 'outline' | 'transparent';

/**
 * Types of button shape.
 * @public
 */
export type ButtonShape = 'circular' | 'square' | 'rounded';

/**
 * Types of button size.
 * @public
 */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * @internal
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
  public autofocus: boolean;

  /**
   * The id of a form to associate the element to.
   *
   * @public
   * @remarks
   * HTML Attribute: form
   */
  @attr({ attribute: 'form' })
  public formId: string;

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
   *
   * @public
   * @remarks
   * HTML Attribute: formaction
   */
  @attr
  public formaction: string;
  private formactionChanged(): void {
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
  public formenctype: string;
  private formenctypeChanged(): void {
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
  public formmethod: string;
  private formmethodChanged(): void {
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
  public formnovalidate: boolean;
  private formnovalidateChanged(): void {
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
  public formtarget: '_self' | '_blank' | '_parent' | '_top';
  private formtargetChanged(): void {
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
  public type: 'submit' | 'reset' | 'button';
  private typeChanged(previous: 'submit' | 'reset' | 'button' | void, next: 'submit' | 'reset' | 'button'): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.type = this.type;
    }

    next === 'submit' && this.addEventListener('click', this.handleSubmission);
    previous === 'submit' && this.removeEventListener('click', this.handleSubmission);
    next === 'reset' && this.addEventListener('click', this.handleFormReset);
    previous === 'reset' && this.removeEventListener('click', this.handleFormReset);
  }

  /**
   *
   * Default slotted content
   *
   * @public
   * @remarks
   */
  @observable
  public defaultSlottedContent: HTMLElement[];

  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();

    this.proxy.setAttribute('type', this.type);
    this.handleUnsupportedDelegatesFocus();

    const elements = Array.from(this.control?.children) as HTMLSpanElement[];
    if (elements) {
      elements.forEach((span: HTMLSpanElement) => {
        span.addEventListener('click', this.handleClick);
      });
    }
  }

  /**
   * @internal
   */
  public disconnectedCallback(): void {
    super.disconnectedCallback();

    const elements = Array.from(this.control?.children) as HTMLSpanElement[];
    if (elements) {
      elements.forEach((span: HTMLSpanElement) => {
        span.removeEventListener('click', this.handleClick);
      });
    }
  }

  /**
   * Prevent events to propagate if disabled and has no slotted content wrapped in HTML elements
   * @internal
   */
  private handleClick = (e: Event) => {
    if (this.disabled && this.defaultSlottedContent?.length <= 1) {
      e.stopPropagation();
    }
  };

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

  public control: HTMLButtonElement;

  /**
   * See {@link https://www.w3.org/WAI/PF/aria/roles#button} for more information
   * @public
   * @remarks
   * HTML Attribute: aria-expanded
   */
  @attr({ attribute: 'aria-expanded', mode: 'fromView' })
  public ariaExpanded: 'true' | 'false' | undefined;

  /**
   * See {@link https://www.w3.org/WAI/PF/aria/roles#button} for more information
   * @public
   * @remarks
   * HTML Attribute: aria-pressed
   */
  @attr({ attribute: 'aria-pressed', mode: 'fromView' })
  public ariaPressed: 'true' | 'false' | 'mixed' | undefined;

  /**
   * Overrides the focus call for where delegatesFocus is unsupported.
   * This check works for Chrome, Edge Chromium, FireFox, and Safari
   * Relevant PR on the Firefox browser: https://phabricator.services.mozilla.com/D123858
   */
  private handleUnsupportedDelegatesFocus = () => {
    // Check to see if delegatesFocus is supported
    if (
      window.ShadowRoot &&
      !window.ShadowRoot.prototype.hasOwnProperty('delegatesFocus') &&
      this.$fastController.definition.shadowOptions?.delegatesFocus
    ) {
      this.focus = () => {
        this.control.focus();
      };
    }
  };

  /**
   * The appearance the button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance: ButtonAppearance;

  /**
   * The shape the button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: shape
   */
  @attr
  public shape: ButtonShape = 'rounded';

  /**
   * The size the button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: shape
   */
  @attr
  public size: ButtonSize = 'medium';

  /**
   * The button can fill its space.
   *
   * @public
   * @remarks
   * HTML Attribute: block
   */
  @attr({ mode: 'boolean' })
  public block: boolean = false;

  /**
   * The appearance the button should have.
   *
   * @public
   * @remarks
   * HTML Attribute: block
   */
  @attr({ attribute: 'disabledfocusable', mode: 'boolean' })
  public disabledFocusable: boolean = false;

  /**
   * Applies 'icon-only' class when there is only an SVG in the default slot
   *
   * @public
   * @remarks
   */
  public defaultSlottedContentChanged(): void {
    const slottedElements = this.defaultSlottedContent.filter(x => x.nodeType === Node.ELEMENT_NODE);
    if (slottedElements.length === 1 && slottedElements[0] instanceof SVGElement) {
      this.control.classList.add('icon-only');
    } else {
      this.control.classList.remove('icon-only');
    }
  }
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface Button extends ARIAGlobalStatesAndProperties {}
applyMixins(Button, ARIAGlobalStatesAndProperties);
