import { attr, FASTElement, observable, Observable } from '@microsoft/fast-element';
import { toggleState } from '../utils/element-internals.js';
import { LabelPosition, SlottableInput, ValidationFlags } from './field.options.js';

/**
 * A Field Custom HTML Element.
 *
 * @public
 */
export class Field extends FASTElement {
  /**
   * The internal ElementInternals instance for the field.
   *
   * @internal
   */
  protected elementInternals: ElementInternals = this.attachInternals();

  /**
   * Reference to the first slotted input element.
   *
   * @public
   */
  @observable
  protected input?: SlottableInput;

  /**
   * Removes notifiers from the previous input element and subscribes to the new input element.
   *
   * @param prev - the previous input element
   * @param next - the current input element
   * @internal
   */
  protected inputChanged(prev: SlottableInput | undefined, next: SlottableInput | undefined): void {
    if (prev && !next?.isSameNode(prev)) {
      this.unsubscribeFromInputObservables(prev);
    }

    this.subscribeToInputObservables();
  }

  /**
   * Contents of the input slot.
   *
   * @internal
   */
  @observable
  public inputSlot!: Node[];

  /**
   * Sets the `input` property when the input slot content changes.
   *
   * @param prev - the previous collection of elements in the slot
   * @param next - the current collection of elements in the slot
   * @internal
   */
  public inputSlotChanged(prev: Node[] | undefined, next: Node[] | undefined): void {
    this.input = next?.[0] as SlottableInput;
  }

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
   * The slotted message elements.
   *
   * @internal
   */
  @observable
  public messageSlot!: Node[];

  /**
   * Redirects `click` events to the slotted input element.
   *
   * @internal
   */
  public clickHandler(e: MouseEvent): boolean | void {
    if (e.target === this) {
      this.input?.click();
    }

    return true;
  }

  public connectedCallback() {
    super.connectedCallback();
    this.addEventListener('invalid', this.invalidHandler, { capture: true });
  }

  public disconnectedCallback() {
    this.removeEventListener('invalid', this.invalidHandler, { capture: true });
    this.unsubscribeFromInputObservables();
    super.disconnectedCallback();
  }

  /**
   * Applies the `focus-visible` state to the element when the slotted input element receives visible focus.
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
   * Removes the `focus-visible` state from the field when a slotted input element loses focus.
   *
   * @param e - the focus event
   * @internal
   */
  public focusoutHandler(e: FocusEvent): boolean | void {
    toggleState(this.elementInternals, 'focus-visible', false);
    return true;
  }

  /**
   * Sets the `disabled` state based on the `disabled` state of the slotted input element.
   *
   * @param source - the source element
   * @param propertyName - the observed property name
   * @internal
   */
  public handleChange(source: any, propertyName?: string) {
    toggleState(this.elementInternals, 'disabled', !!source.disabled);
    toggleState(this.elementInternals, 'readonly', !!(source.readOnly ?? source.readonly));
    toggleState(this.elementInternals, 'required', !!source.required);
  }

  /**
   * Toggles validity state flags on the element when the slotted input element emits an `invalid` event.
   *
   * @param e - the event object
   * @internal
   */
  public invalidHandler(e: Event): boolean | void {
    if (this.messageSlot.length) {
      e.preventDefault();
    }

    for (const flag of Object.keys(ValidationFlags)) {
      toggleState(this.elementInternals, flag, (e.target as SlottableInput).validity[flag as keyof ValidityState]);
    }
  }

  /**
   * Subscribes to the `disabled`, `readonly`, and `required` states of the input elements.
   *
   * @param input - The input element to subscribe to
   * @internal
   */
  private subscribeToInputObservables(input: SlottableInput | undefined = this.input) {
    const notifier = Observable.getNotifier(input);
    notifier.subscribe(this, 'disabled');
    notifier.subscribe(this, 'readonly');
    notifier.subscribe(this, 'required');

    this.handleChange(input);
  }

  /**
   * Unsubscribes from the `disabled`, `readonly`, and `required` states of the input elements.
   *
   * @param input - The input element to unsubscribe from
   * @internal
   */
  private unsubscribeFromInputObservables(input: SlottableInput | undefined = this.input): void {
    const notifier = Observable.getNotifier(input);
    notifier.unsubscribe(this, 'disabled');
    notifier.unsubscribe(this, 'readonly');
    notifier.unsubscribe(this, 'required');
  }
}
