import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { toggleState } from '../utils/element-internals.js';
import { LabelPosition, SlottableInput, ValidationFlags } from './field.options.js';

/**
 * A Field Custom HTML Element.
 *
 * @public
 */
export class Field extends FASTElement {
  /**
   * The position of the label relative to the input.
   *
   * @public
   * @remarks
   * HTML Attribute: `label-position`
   */
  @attr({ attribute: 'label-position' })
  public labelPosition: LabelPosition = LabelPosition.above;

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
    this.input = next?.[0] as SlottableInput;

    if (this.input) {
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
  public input!: SlottableInput;

  /**
   * Calls the `setStates` method when a `change` event is emitted from the slotted input.
   *
   * @param e - the event object
   * @internal
   */
  public changeHandler(e: Event): void {
    this.setStates();
  }

  /**
   * Redirects `click` events to the slotted input.
   *
   * @internal
   */
  public clickHandler(e: MouseEvent): boolean | void {
    if (this.isSameNode(e.target as Node | null)) {
      this.input.focus();
      this.input.click();
      return;
    }

    return true;
  }

  /**
   * Applies the `focus-visible` state to the element when the slotted input receives visible focus.
   *
   * @param e - the focus event
   * @internal
   */
  public focusinHandler(e: FocusEvent): boolean | void {
    if ((e.target as HTMLElement).matches(':focus-visible')) {
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

    this.setStates();
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

      if (!this.input.validity) {
        return;
      }

      for (const [flag, value] of Object.entries(ValidationFlags)) {
        toggleState(this.elementInternals, value, !!this.input.validity[flag as keyof ValidityState]);
      }
    }
  }
}
