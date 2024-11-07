import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import { toggleState } from '../utils/element-internals.js';
import { LabelPosition, type SlottableInput, ValidationFlags } from './field.options.js';

/**
 * A Field Custom HTML Element.
 *
 * @public
 */
export class BaseField extends FASTElement {
  /**
   * The slotted label elements.
   *
   * @internal
   */
  @observable
  public labelSlot: Node[] = [];

  /**
   * Updates attributes on the slotted label elements.
   *
   * @param prev - the previous list of slotted label elements
   * @param next - the current list of slotted label elements
   */
  protected labelSlotChanged(prev: Node[], next: Node[]) {
    if (next && this.input) {
      this.setLabelProperties();
      this.setStates();
    }
  }

  /**
   * The slotted message elements. Filtered to only include elements with a `flag` attribute.
   *
   * @internal
   */
  @observable
  public messageSlot!: Element[];

  /**
   * Adds or removes the `invalid` event listener based on the presence of slotted message elements.
   *
   * @param prev - the previous list of slotted message elements
   * @param next - the current list of slotted message elements
   * @internal
   */
  public messageSlotChanged(prev: Element[], next: Element[]) {
    toggleState(this.elementInternals, 'has-message', !!next.length);

    if (!next.length) {
      this.removeEventListener('invalid', this.invalidHandler, { capture: true });
      return;
    }

    this.addEventListener('invalid', this.invalidHandler, { capture: true });
  }

  /**
   * The slotted inputs.
   *
   * @internal
   * @privateRemarks
   * This field is populated with the `children` directive in the template rather than `slotted`.
   */
  @observable
  public slottedInputs!: SlottableInput[];

  /**
   * Sets the `input` property to the first slotted input.
   *
   * @param prev - The previous collection of inputs.
   * @param next - The current collection of inputs.
   * @internal
   */
  public slottedInputsChanged(prev: SlottableInput[] | undefined, next: SlottableInput[] | undefined) {
    if (next?.length) {
      this.input = next?.[0] as SlottableInput;
      this.setStates();
    }
  }

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * Reference to the first slotted input.
   *
   * @public
   */
  @observable
  public input!: SlottableInput;

  /**
   * Updates the field's states and label properties when the assigned input changes.
   *
   * @param prev - the previous input
   * @param next - the current input
   */
  public inputChanged(prev: SlottableInput | undefined, next: SlottableInput | undefined) {
    if (next) {
      this.setStates();
      this.setLabelProperties();
    }
  }

  /**
   * Calls the `setStates` method when a `change` event is emitted from the slotted input.
   *
   * @param e - the event object
   * @internal
   */
  public changeHandler(e: Event): boolean | void {
    this.setStates();
    this.setValidationStates();

    return true;
  }

  /**
   * Redirects `click` events to the slotted input.
   *
   * @param e - the event object
   * @internal
   */
  public clickHandler(e: MouseEvent): boolean | void {
    if (this === e.target) {
      this.input.click();
    }

    return true;
  }

  constructor() {
    super();
    this.elementInternals.role = 'presentation';
  }

  /**
   * Applies the `focus-visible` state to the element when the slotted input receives visible focus.
   *
   * @param e - the focus event
   * @internal
   */
  public focusinHandler(e: FocusEvent): boolean | void {
    if (this.matches(':focus-within:has(> :focus-visible)')) {
      toggleState(this.elementInternals, 'focus-visible', true);
    }

    return true;
  }

  /**
   * Removes the `focus-visible` state from the field when a slotted input loses focus.
   *
   * @param e - the focus event
   * @internal
   */
  public focusoutHandler(e: FocusEvent): boolean | void {
    toggleState(this.elementInternals, 'focus-visible', false);
    return true;
  }

  /**
   * Toggles validity state flags on the element when the slotted input emits an `invalid` event (if slotted validation messages are present).
   *
   * @param e - the event object
   * @internal
   */
  public invalidHandler(e: Event): boolean | void {
    if (this.messageSlot.length) {
      e.preventDefault();
    }

    this.setValidationStates();
  }

  /**
   * Sets ARIA and form-related attributes on slotted label elements.
   *
   * @internal
   */
  private setLabelProperties() {
    if (this.$fastController.isConnected) {
      this.input.id = this.input.id || uniqueId('input');

      this.labelSlot?.forEach(label => {
        if (label instanceof HTMLLabelElement) {
          label.htmlFor = label.htmlFor || this.input.id;
          label.id = label.id || `${this.input.id}--label`;
          label.setAttribute('aria-hidden', 'true');
          this.input.setAttribute('aria-labelledby', label.id);
        }
      });
    }
  }

  /**
   * Toggles the field's states based on the slotted input.
   *
   * @internal
   */
  public setStates() {
    if (this.$fastController.isConnected) {
      toggleState(this.elementInternals, 'disabled', !!this.input.disabled);
      toggleState(this.elementInternals, 'readonly', !!this.input.readOnly);
      toggleState(this.elementInternals, 'required', !!this.input.required);
      toggleState(this.elementInternals, 'checked', !!this.input.checked);
    }
  }

  public setValidationStates() {
    if (!this.input.validity) {
      return;
    }

    for (const [flag, value] of Object.entries(ValidationFlags)) {
      toggleState(this.elementInternals, value, this.input.validity[flag as keyof ValidityState]);
    }
  }
}

/**
 * A Field Custom HTML Element.
 * Based on BaseField and includes style and layout specific attributes
 *
 * @public
 */
export class Field extends BaseField {
  /**
   * The position of the label relative to the input.
   *
   * @public
   * @remarks
   * HTML Attribute: `label-position`
   */
  @attr({ attribute: 'label-position' })
  public labelPosition: LabelPosition = LabelPosition.above;
}
