import { attr, FASTElement, nullableNumberConverter, observable } from '@microsoft/fast-element';
import { StartEnd } from '../patterns/start-end.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { toggleState } from '../utils/element-internals.js';
import { TextAreaAutocomplete, TextAreaControlSize, TextAreaResize } from './textarea.options.js';
import { TextAreaAppearance } from './textarea.options.js';

/**
 * A Text Area Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea | `<textarea>`} element.
 * @public
 */
export class TextArea extends FASTElement {
  @observable
  public control!: ElementContentEditable & HTMLElement;

  @observable
  public defaultContent: string = '';

  /**
   * @internal
   */
  public textbox!: HTMLDivElement;

  @observable
  public content!: Node[];

  public contentChanged(prev: Node[], next: Node[]): void {
    if (this.$fastController.isConnected) {
      this.defaultContent = next
        .filter(node => node.nodeType === Node.TEXT_NODE)
        .map(node => node.textContent)
        .join('')
        .trim();
    }
  }
  /**
   * Indicates the styled appearance of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: `appearance`
   */
  @attr
  public appearance?: TextAreaAppearance;

  /**
   * Handles changes to appearance attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public appearanceChanged(prev: TextAreaAppearance | undefined, next: TextAreaAppearance | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * Indicates the element's autocomplete state.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/autocomplete | `autocomplete`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `autocomplete`
   */
  @attr
  public autocomplete?: TextAreaAutocomplete;

  /**
   * Indicates that the element should get focus after the page finishes loading.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Element/input#autofocus | `autofocus`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `autofocus`
   */
  @attr({ mode: 'boolean' })
  public autofocus!: boolean;

  /**
   * Sets the size of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `control-size`
   */
  @attr({ attribute: 'control-size' })
  public controlSize?: TextAreaControlSize;

  /**
   * Handles changes to `control-size` attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public controlSizeChanged(prev: TextAreaControlSize | undefined, next: TextAreaControlSize | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * The default slotted content. This is the content that appears in the text field label.
   *
   * @internal
   */
  @observable
  public defaultSlottedNodes!: Node[];

  /**
   * Updates the control label visibility based on the presence of default slotted content.
   *
   * @internal
   */
  public defaultSlottedNodesChanged(prev: Node[] | undefined, next: Node[] | undefined): void {
    if (this.$fastController.isConnected) {
      this.controlLabel.hidden = !next?.length;
    }
  }

  /**
   * Sets the directionality of the element to be submitted with form data.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/dirname | `dirname`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `dirname`
   */
  @attr
  public dirname?: string;

  /**
   * Sets the element's disabled state.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/disabled | `disabled`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `disabled`
   */
  @attr({ mode: 'boolean' })
  disabled?: boolean;

  /**
   * The id of a form to associate the element to.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Element/input#form | `form`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `form`
   */
  @attr({ attribute: 'form' })
  public formAttribute?: string;

  /**
   * The maximum number of characters a user can enter.
   *
   * @public
   * @remarks
   * HTML Attribute: `maxlength`
   */
  @attr({ converter: nullableNumberConverter })
  public maxlength!: number;

  /**
   * The minimum number of characters a user can enter.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/minlength | `minlength`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `minlength`
   */
  @attr({ converter: nullableNumberConverter })
  public minlength!: number;

  /**
   * The name of the element. This element's value will be surfaced during form submission under the provided name.
   *
   * @public
   * @remarks
   * HTML Attribute: `name`
   */
  @attr
  public name!: string;

  /**
   * Sets the placeholder value of the element, generally used to provide a hint to the user.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/placeholder | `placeholder`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `placeholder`
   * This attribute is not a valid substitute for a label.
   */
  @attr
  public placeholder: string = '';

  /**
   * When true, the control will be immutable by user interaction.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/readonly | `readonly`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `readonly`
   */
  @attr({ attribute: 'readonly', mode: 'boolean' })
  public readOnly?: boolean;

  /**
   * Syncs the `ElementInternals.ariaReadOnly` property when the `readonly` property changes.
   *
   * @internal
   */
  public readOnlyChanged(): void {
    if (this.$fastController.isConnected) {
      this.elementInternals.ariaReadOnly = `${!!this.readOnly}`;
    }
  }

  /**
   * The element's required attribute.
   *
   * @public
   * @remarks
   * HTML Attribute: `required`
   */
  @attr({ mode: 'boolean' })
  public required!: boolean;

  /**
   * Syncs the element's internal `aria-required` state with the `required` attribute.
   *
   * @param previous - the previous required state
   * @param next - the current required state
   *
   * @internal
   */
  public requiredChanged(previous: boolean, next: boolean): void {
    if (this.$fastController.isConnected) {
      this.elementInternals.ariaRequired = `${!!next}`;
    }
  }

  /**
   * Sets the width of the element to a specified number of characters.
   *
   * @public
   * @remarks
   * HTML Attribute: `size`
   */
  @attr({ converter: nullableNumberConverter })
  public size!: number;

  /**
   * Controls whether or not to enable spell checking for the input field, or if the default spell checking configuration should be used.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/spellcheck | `spellcheck`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `spellcheck`
   */
  @attr({
    converter: {
      fromView: value => (typeof value === 'string' ? ['true', ''].includes(value.trim().toLowerCase()) : null),
      toView: value => value.toString(),
    },
  })
  public spellcheck!: boolean;

  /**
   * A reference to the internal label element.
   *
   * @internal
   */
  @observable
  public controlLabel!: HTMLLabelElement;

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  @attr({ mode: 'fromView' })
  public resize?: TextAreaResize = TextAreaResize.none;

  protected resizeChanged(prev: TextAreaResize | undefined, next: TextAreaResize | undefined): void {
    if (prev) {
      toggleState(this.elementInternals, `resize-${prev}`, false);
    }

    if (next) {
      toggleState(this.elementInternals, `resize-${next}`, true);
    }
  }

  /**
   * The form-associated flag.
   * @see {@link https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-face-example | Form-associated custom elements}
   *
   * @public
   */
  static readonly formAssociated = true;

  /**
   * The element's validity state.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/validity | `ElementInternals.validity`} property.
   */
  public get validity(): ValidityState {
    return this.elementInternals.validity;
  }

  /**
   * The validation message.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/validationMessage | `ElementInternals.validationMessage`} property.
   */
  public get validationMessage(): string {
    return this.elementInternals.validationMessage ?? 'error';
  }

  /**
   * Determines if the control can be submitted for constraint validation.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/willValidate | `ElementInternals.willValidate`} property.
   */
  public get willValidate(): boolean {
    return this.elementInternals.willValidate;
  }

  /**
   * The associated form element.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/form | `ElementInternals.form`} property.
   */
  public get form(): HTMLFormElement | null {
    return this.elementInternals.form;
  }

  public beforeinputHandler(e: InputEvent): boolean | void {
    if (this.disabled) {
      e.preventDefault();
      return false;
    }

    // don't allow the slot to be deleted
    if (e.inputType === 'deleteContentBackward') {
      console.log('deleteContentBackward', e);
    }

    return true;
  }

  /**
   * Change event handler for inner control.
   *
   * @internal
   * @privateRemarks
   * "Change" events are not `composable` so they will not permeate the shadow DOM boundary. This function effectively
   * proxies the change event, emitting a `change` event whenever the internal control emits a `change` event.
   */
  public changeHandler(e: InputEvent): boolean | void {
    this.setValidity();
    this.$emit('change', e, {
      bubbles: true,
      composed: true,
    });

    return true;
  }

  /**
   * Checks the validity of the element and returns the result.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/checkValidity | `HTMLInputElement.checkValidity()`} method.
   */
  public checkValidity(): boolean {
    return this.elementInternals.checkValidity();
  }

  constructor() {
    super();

    this.elementInternals.role = 'textbox';
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.setContentEditable(true);
    // this.setFormValue(this.value);
    this.setValidity();
  }

  /**
   * Resets the value to its initial value when the form is reset.
   *
   * @internal
   */
  public formResetCallback(): void {
    // this.value = this.initialValue;
    // this.dirtyValue = false;
  }

  /**
   * Handles the internal control's `input` event.
   *
   * @internal
   */
  public inputHandler(e: InputEvent): boolean | void {
    // this.dirtyValue = true;
    // this.value = this.control.value;

    return true;
  }

  /**
   * Sets the custom validity message.
   * @param message - The message to set
   *
   * @public
   */
  public setCustomValidity(message: string): void {
    this.elementInternals.setValidity({ customError: true }, message);
    this.reportValidity();
  }

  /**
   * Reports the validity of the element.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/reportValidity | `HTMLInputElement.reportValidity()`} method.
   */
  public reportValidity(): boolean {
    return this.elementInternals.reportValidity();
  }

  /**
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/setFormValue | `ElementInternals.setFormValue()`} method.
   *
   * @internal
   */
  public setFormValue(value: File | string | FormData | null, state?: File | string | FormData | null): void {
    this.elementInternals.setFormValue(value, value ?? state);
  }

  /**
   * Sets the validity of the control.
   *
   * @param flags - Validity flags. If not provided, the control's `validity` will be used.
   * @param message - Optional message to supply. If not provided, the control's `validationMessage` will be used. If the control does not have a `validationMessage`, the message will be empty.
   * @param anchor - Optional anchor to use for the validation message. If not provided, the control will be used.
   *
   * @internal
   */
  public setValidity(
    flags: Partial<ValidityState> = {},
    message: string = this.validationMessage,
    anchor: HTMLElement = this.control,
  ): void {
    if (this.$fastController.isConnected) {
      if (this.disabled) {
        this.elementInternals.setValidity({});
        return;
      }

      this.elementInternals.setValidity(flags, message, anchor);
    }
  }

  /**
   * @internal
   */
  public setContentEditable(edtiable: boolean) {
    if (!edtiable) {
      this.textbox.contentEditable = 'false';
    } else {
      try {
        this.textbox.contentEditable = 'plaintext-only';
      } catch {
        // Firefox does’t support `plaintext-only` yet.
        this.textbox.contentEditable = 'true';
      }
    }
  }
}

/**
 * @internal
 * @privateRemarks
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/rushstack/issues/1308
 */
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface TextArea extends StartEnd {}
applyMixins(TextArea, StartEnd);
