import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import { StartEnd } from '../patterns/index.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { toggleState } from '../utils/element-internals.js';
import type { ButtonAppearance, ButtonFormTarget, ButtonShape, ButtonSize } from './button.options.js';
import { ButtonType } from './button.options.js';

/**
 * A Button Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | `<button>`} element.
 *
 * @slot start - Content which can be provided before the button content
 * @slot end - Content which can be provided after the button content
 * @slot - The default slot for button content
 * @csspart content - The button content container
 *
 * @public
 */
export class Button extends FASTElement {
  /**
   * Indicates the styled appearance of the button.
   *
   * @public
   * @remarks
   * HTML Attribute: `appearance`
   */
  @attr
  public appearance?: ButtonAppearance;

  /**
   * Handles changes to appearance attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public appearanceChanged(prev: ButtonAppearance | undefined, next: ButtonAppearance | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * Indicates the button should be focused when the page is loaded.
   * @see The {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#autofocus | `autofocus`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `autofocus`
   */
  @attr({ mode: 'boolean' })
  public autofocus!: boolean;

  /**
   * Default slotted content.
   *
   * @public
   */
  @observable
  public defaultSlottedContent!: HTMLElement[];

  /**
   * Sets the element's disabled state.
   * @see The {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#disabled | `disabled`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `disabled`
   */
  @attr({ mode: 'boolean' })
  disabled?: boolean;

  /**
   * Indicates that the button is focusable while disabled.
   *
   * @public
   * @remarks
   * HTML Attribute: `disabled-focusable`
   */
  @attr({ attribute: 'disabled-focusable', mode: 'boolean' })
  public disabledFocusable: boolean = false;

  /**
   * Sets the element's internal disabled state when the element is focusable while disabled.
   *
   * @param previous - the previous disabledFocusable value
   * @param next - the current disabledFocusable value
   * @internal
   */
  public disabledFocusableChanged(previous: boolean, next: boolean): void {
    if (this.$fastController.isConnected) {
      this.elementInternals.ariaDisabled = `${!!next}`;
    }
  }

  /**
   * The internal {@link https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * The associated form element.
   *
   * @public
   */
  public get form(): HTMLFormElement | null {
    return this.elementInternals.form;
  }

  /**
   * The URL that processes the form submission.
   * @see The {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#formaction | `formaction`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `formaction`
   */
  @attr({ attribute: 'formaction' })
  public formAction?: string;

  /**
   * The form-associated flag.
   * @see {@link https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-face-example | Form-associated custom elements}
   *
   * @public
   */
  static readonly formAssociated = true;

  /**
   * The id of a form to associate the element to.
   * @see The {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#form | `form`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `form`
   */
  @attr({ attribute: 'form' })
  public formAttribute?: string;

  /**
   * The encoding type for the form submission.
   * @see The {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#formenctype | `formenctype`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `formenctype`
   */
  @attr({ attribute: 'formenctype' })
  public formEnctype?: string;

  /**
   * The HTTP method that the browser uses to submit the form.
   * @see The {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#formmethod | `formmethod`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `formmethod`
   */
  @attr({ attribute: 'formmethod' })
  public formMethod?: string;

  /**
   * Indicates that the form will not be validated when submitted.
   * @see The {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#formnovalidate | `formnovalidate`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `formnovalidate`
   */
  @attr({ attribute: 'formnovalidate', mode: 'boolean' })
  public formNoValidate?: boolean;

  /**
   * The internal form submission fallback control.
   *
   * @internal
   */
  private formSubmissionFallbackControl?: HTMLButtonElement;

  /**
   * The internal slot for the form submission fallback control.
   *
   * @internal
   */
  private formSubmissionFallbackControlSlot?: HTMLSlotElement;

  /**
   * The target frame or window to open the form submission in.
   * @see The {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#formtarget | `formtarget`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `formtarget`
   */
  @attr({ attribute: 'formtarget' })
  public formTarget?: ButtonFormTarget;

  /**
   * Indicates that the button should only display as an icon with no text content.
   *
   * @public
   * @remarks
   * HTML Attribute: `icon-only`
   */
  @attr({ attribute: 'icon-only', mode: 'boolean' })
  public iconOnly: boolean = false;

  /**
   * Handles changes to icon only custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public iconOnlyChanged(prev: boolean, next: boolean) {
    toggleState(this.elementInternals, 'icon', next);
  }

  /**
   * A reference to all associated label elements.
   *
   * @public
   */
  public get labels(): ReadonlyArray<Node> {
    return Object.freeze(Array.from(this.elementInternals.labels));
  }

  /**
   * The name of the element. This element's value will be surfaced during form submission under the provided name.
   * @see The {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#name | `name`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `name`
   */
  @attr
  public name?: string;

  /**
   * The shape of the button.
   *
   * @public
   * @remarks
   * HTML Attribute: `shape`
   */
  @attr
  public shape?: ButtonShape;

  /**
   * Handles changes to shape attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public shapeChanged(prev: ButtonShape | undefined, next: ButtonShape | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * The size of the button.
   *
   * @public
   * @remarks
   * HTML Attribute: `size`
   */
  @attr
  public size?: ButtonSize;

  /**
   * Handles changes to size attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public sizeChanged(prev: ButtonSize | undefined, next: ButtonSize | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * The button type.
   * @see The {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#type | `type`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `type`
   */
  @attr
  public type!: ButtonType;

  /**
   * Removes the form submission fallback control when the type changes.
   *
   * @param previous - the previous type value
   * @param next - the new type value
   * @internal
   */
  public typeChanged(previous: ButtonType, next: ButtonType): void {
    if (next !== ButtonType.submit) {
      this.formSubmissionFallbackControl?.remove();
      this.shadowRoot?.querySelector('slot[name="internal"]')?.remove();
    }
  }

  /**
   * The value attribute.
   *
   * @see The {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#value | `value`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `value`
   */
  @attr
  public value?: string;

  /**
   * Handles the button click event.
   *
   * @param e - The event object
   * @internal
   */
  public clickHandler(e: Event): boolean | void {
    if (e && this.disabledFocusable) {
      e.stopImmediatePropagation();
      return;
    }

    this.press();
    return true;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.elementInternals.ariaDisabled = `${!!this.disabledFocusable}`;
  }

  constructor() {
    super();
    this.elementInternals.role = 'button';
  }

  /**
   * This fallback creates a new slot, then creates a submit button to mirror the custom element's
   * properties. The submit button is then appended to the slot and the form is submitted.
   *
   * @internal
   * @privateRemarks
   * This is a workaround until {@link https://github.com/WICG/webcomponents/issues/814 | WICG/webcomponents/issues/814} is resolved.
   */
  private createAndInsertFormSubmissionFallbackControl(): void {
    const internalSlot = this.formSubmissionFallbackControlSlot ?? document.createElement('slot');
    internalSlot.setAttribute('name', 'internal');
    this.shadowRoot?.appendChild(internalSlot);
    this.formSubmissionFallbackControlSlot = internalSlot;

    const fallbackControl = this.formSubmissionFallbackControl ?? document.createElement('button');
    fallbackControl.style.display = 'none';
    fallbackControl.setAttribute('type', 'submit');
    fallbackControl.setAttribute('slot', 'internal');

    if (this.formNoValidate) {
      fallbackControl.toggleAttribute('formnovalidate', true);
    }

    if (this.elementInternals.form?.id) {
      fallbackControl.setAttribute('form', this.elementInternals.form.id);
    }

    if (this.name) {
      fallbackControl.setAttribute('name', this.name);
    }

    if (this.value) {
      fallbackControl.setAttribute('value', this.value);
    }

    if (this.formAction) {
      fallbackControl.setAttribute('formaction', this.formAction ?? '');
    }

    if (this.formEnctype) {
      fallbackControl.setAttribute('formenctype', this.formEnctype ?? '');
    }

    if (this.formMethod) {
      fallbackControl.setAttribute('formmethod', this.formMethod ?? '');
    }

    if (this.formTarget) {
      fallbackControl.setAttribute('formtarget', this.formTarget ?? '');
    }

    this.append(fallbackControl);

    this.formSubmissionFallbackControl = fallbackControl;
  }

  /**
   * Invoked when a connected component's form or fieldset has its disabled state changed.
   *
   * @param disabled - the disabled value of the form / fieldset
   *
   * @internal
   */
  public formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }

  /**
   * Handles keypress events for the button.
   *
   * @param e - the keyboard event
   * @returns - the return value of the click handler
   * @public
   */
  public keypressHandler(e: KeyboardEvent): boolean | void {
    if (e && this.disabledFocusable) {
      e.stopImmediatePropagation();
      return;
    }

    if (e.key === keyEnter || e.key === keySpace) {
      this.click();
      return;
    }

    return true;
  }

  /**
   * Presses the button.
   *
   * @public
   */
  protected press(): void {
    switch (this.type) {
      case ButtonType.reset: {
        this.resetForm();
        break;
      }

      case ButtonType.submit: {
        this.submitForm();
        break;
      }
    }
  }

  /**
   * Resets the associated form.
   *
   * @public
   */
  public resetForm(): void {
    this.elementInternals.form?.reset();
  }

  /**
   * Submits the associated form.
   *
   * @internal
   */
  private submitForm(): void {
    if (!this.elementInternals.form || this.disabled || this.type !== ButtonType.submit) {
      return;
    }

    // workaround: if the button doesn't have any form overrides, the form can be submitted directly.
    if (
      !this.name &&
      !this.formAction &&
      !this.formEnctype &&
      !this.form &&
      !this.formMethod &&
      !this.formNoValidate &&
      !this.formTarget
    ) {
      this.elementInternals.form.requestSubmit();
      return;
    }

    try {
      this.elementInternals.setFormValue(this.value ?? '');
      this.elementInternals.form.requestSubmit(this);
    } catch (e) {
      // `requestSubmit` throws an error since custom elements may not be able to submit the form.
      // This fallback creates a new slot, then creates a submit button to mirror the custom element's
      // properties. The submit button is then appended to the slot and the form is submitted.
      this.createAndInsertFormSubmissionFallbackControl();

      // workaround: the form value is reset since the fallback control will handle the form submission.
      this.elementInternals.setFormValue(null);
      this.elementInternals.form.requestSubmit(this.formSubmissionFallbackControl);
    }
  }
}

/**
 * @internal
 * @privateRemarks
 * Mark internal because exporting class and interface of the same name confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 */
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface Button extends StartEnd {}
applyMixins(Button, StartEnd);
