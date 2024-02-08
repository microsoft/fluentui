import { attr, nullableNumberConverter, observable, Updates } from '@microsoft/fast-element';
import { ARIAGlobalStatesAndProperties, StartEnd, StartEndOptions } from '../patterns/index.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { TextInputAppearance, TextInputControlSize } from './text-input.options.js';
import { TextFieldType } from './text-input.options.js';
import { FormAssociatedTextField } from './text-field.form-associated.js';

export { TextFieldType };

export type TextFieldOptions = StartEndOptions<TextInput>;

export class TextInput extends FormAssociatedTextField {
  /**
   * Defines TextInput control size
   *
   * @public
   * @default 'medium'
   * @remarks
   * HTML Attribute: control-size
   */
  @attr({ attribute: 'control-size' })
  public controlSize?: TextInputControlSize;

  /**
   * Defines TextInput appearance.
   *
   * @public
   * @default 'outline'
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance?: TextInputAppearance;

  /**
   * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
   * @public
   * @remarks
   * HTML Attribute: readonly
   */
  @attr({ attribute: 'readonly', mode: 'boolean' })
  public readOnly!: boolean;
  protected readOnlyChanged(): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.readOnly = this.readOnly;
      this.validate();
    }
  }

  /**
   * Indicates that this element should get focus after the page finishes loading. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautofocus | autofocus HTML attribute} for more information.
   * @public
   * @remarks
   * HTML Attribute: autofocus
   */
  @attr({ mode: 'boolean' })
  public autofocus!: boolean;
  protected autofocusChanged(): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.autofocus = this.autofocus;
      this.validate();
    }
  }

  /**
   * Sets the placeholder value of the element, generally used to provide a hint to the user.
   * @public
   * @remarks
   * HTML Attribute: placeholder
   * Using this attribute does is not a valid substitute for a labeling element.
   */
  @attr
  public placeholder!: string;
  protected placeholderChanged(): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.placeholder = this.placeholder;
    }
  }

  /**
   * Allows setting a type or mode of text.
   * @public
   * @remarks
   * HTML Attribute: type
   */
  @attr
  public type: TextFieldType = TextFieldType.text;
  private typeChanged(): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.type = this.type;
      this.validate();
    }
  }

  /**
   * Allows associating a {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist | datalist} to the element by {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/id}.
   * @public
   * @remarks
   * HTML Attribute: list
   */
  @attr
  public list!: string;
  protected listChanged(): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.setAttribute('list', this.list);
      this.validate();
    }
  }

  /**
   * The maximum number of characters a user can enter.
   * @public
   * @remarks
   * HTMLAttribute: maxlength
   */
  @attr({ converter: nullableNumberConverter })
  public maxlength!: number;
  protected maxlengthChanged(): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.maxLength = this.maxlength;
      this.validate();
    }
  }

  /**
   * The minimum number of characters a user can enter.
   * @public
   * @remarks
   * HTMLAttribute: minlength
   */
  @attr({ converter: nullableNumberConverter })
  public minlength!: number;
  protected minlengthChanged(): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.minLength = this.minlength;
      this.validate();
    }
  }

  /**
   * A regular expression that the value must match to pass validation.
   * @public
   * @remarks
   * HTMLAttribute: pattern
   */
  @attr
  public pattern!: string;
  protected patternChanged(): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.pattern = this.pattern;
      this.validate();
    }
  }

  /**
   * Sets the width of the element to a specified number of characters.
   * @public
   * @remarks
   * HTMLAttribute: size
   */
  @attr({ converter: nullableNumberConverter })
  public size!: number;
  protected sizeChanged(): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.size = this.size;
    }
  }

  /**
   * Controls whether or not to enable spell checking for the input field, or if the default spell checking configuration should be used.
   * @public
   * @remarks
   * HTMLAttribute: size
   */
  @attr({ mode: 'boolean' })
  public spellcheck!: boolean;
  protected spellcheckChanged(): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.spellcheck = this.spellcheck;
    }
  }

  /**
   * @internal
   */
  @observable
  public defaultSlottedNodes!: Node[];

  /**
   * A reference to the internal input element
   * @internal
   */
  public control!: HTMLInputElement;

  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();

    this.proxy.setAttribute('type', this.type);
    this.validate();

    if (this.autofocus) {
      Updates.enqueue(() => {
        this.focus();
      });
    }
  }

  /**
   * Selects all the text in the text field
   *
   * @public
   */
  public select(): void {
    this.control.select();

    /**
     * The select event does not permeate the shadow DOM boundary.
     * This fn effectively proxies the select event,
     * emitting a `select` event whenever the internal
     * control emits a `select` event
     */
    this.$emit('select');
  }

  /**
   * Handles the internal control's `input` event
   * @internal
   */
  public handleTextInput(): void {
    this.value = this.control.value;
  }

  /**
   * Change event handler for inner control.
   * @remarks
   * "Change" events are not `composable` so they will not
   * permeate the shadow DOM boundary. This fn effectively proxies
   * the change event, emitting a `change` event whenever the internal
   * control emits a `change` event
   * @internal
   */
  public handleChange(): void {
    this.$emit('change');
  }

  /** {@inheritDoc (FormAssociated:interface).validate} */
  public validate(): void {
    super.validate(this.control);
  }
}

/**
 * Includes ARIA states and properties relating to the ARIA textbox role
 *
 * @public
 */
export class DelegatesARIATextbox {}

export type DelegatesARIATextbox = ARIAGlobalStatesAndProperties;
applyMixins(DelegatesARIATextbox, ARIAGlobalStatesAndProperties);

export interface TextInput extends StartEnd, DelegatesARIATextbox {}
applyMixins(TextInput, StartEnd, DelegatesARIATextbox);
