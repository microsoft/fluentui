import { attr, FASTElement, Observable, observable, Updates } from '@microsoft/fast-element';
import type { Start } from '../patterns/start-end.js';
import { toggleState } from '../utils/element-internals.js';
import { uniqueId } from '../utils/unique-id.js';

/**
 * A DropdownOption Custom HTML Element.
 * Implements the {@link https://w3c.github.io/aria/#option | ARIA option } role.
 *
 * @tag fluent-dropdown-option
 *
 * @slot - The default slot for the option's content.
 * @slot checked-indicator - The checked indicator.
 * @slot description - Optional description content.
 *
 * @remarks
 * To support single and multiple selection modes with the {@link (BaseDropdown:class)} element, the Option element
 * itself handles form association and value submission, rather than its parent Dropdown element. In this way, the
 * Option element is a variation of the Checkbox element that is specifically designed for use in the Dropdown element.
 *
 * This class is named `DropdownOption` to avoid conflicts with the native `Option` global. Related constructs are also
 * titled with `DropdownOption` to maintain consistency.
 *
 * @public
 */
export class DropdownOption extends FASTElement implements Start {
  /**
   * Indicates that the option is active.
   *
   * @public
   */
  @observable
  public active: boolean = false;

  /**
   * Changes the active state of the option when the active property changes.
   *
   * @param prev - the previous active state
   * @param next - the current active state
   * @internal
   */
  protected activeChanged(prev: boolean, next: boolean): void {
    toggleState(this.elementInternals, 'active', next);
  }

  /**
   * The current selected state of the option.
   *
   * @internal
   */
  @attr({ attribute: 'current-selected', mode: 'boolean' })
  public currentSelected?: boolean;

  /**
   * Sets the selected property to match the currentSelected state.
   *
   * @param prev - the previous selected state
   * @param next - the current selected state
   * @internal
   */
  public currentSelectedChanged(prev: boolean | undefined, next: boolean | undefined): void {
    this.selected = !!next;
  }

  /**
   * The initial selected state of the option.
   *
   * @public
   * @remarks
   * HTML Attribute: `checked`
   */
  @attr({ attribute: 'selected', mode: 'boolean' })
  public defaultSelected?: boolean;

  /**
   * Updates the selected state when the `selected` attribute is changed, unless the selected state has been changed by the user.
   *
   * @param prev - The previous initial selected state
   * @param next - The current initial selected state
   * @internal
   */
  protected defaultSelectedChanged(prev: boolean | undefined, next: boolean | undefined): void {
    this.selected = !!next;
  }

  /**
   * The collection of slotted description elements.
   *
   * @internal
   */
  @observable
  public descriptionSlot!: Node[];

  /**
   * Changes the description state of the option when the description slot changes.
   *
   * @param prev - the previous collection of description elements
   * @param next - the current collection of description elements
   * @internal
   */
  public descriptionSlotChanged(prev: Node[] | undefined, next: Node[] | undefined): void {
    toggleState(this.elementInternals, 'description', !!next?.length);
  }

  /**
   * The current disabled state of the option.
   *
   * @public
   */
  @observable
  public disabled?: boolean;

  /**
   * Toggles the disabled state when the user changes the `disabled` property.
   *
   * @internal
   */
  protected disabledChanged(prev: boolean | undefined, next: boolean | undefined): void {
    this.elementInternals.ariaDisabled = this.disabled ? 'true' : 'false';
    toggleState(this.elementInternals, 'disabled', this.disabled);
    this.setFormValue(!this.disabled && this.selected ? this.value : null);
  }

  /**
   * The initial disabled state of the option.
   *
   * @public
   * @remarks
   * HTML Attribute: `disabled`
   */
  @attr({ attribute: 'disabled', mode: 'boolean' })
  public disabledAttribute?: boolean;

  /**
   * Sets the disabled state when the `disabled` attribute changes.
   *
   * @param prev - the previous value
   * @param next - the current value
   * @internal
   */
  protected disabledAttributeChanged(prev: boolean | undefined, next: boolean | undefined): void {
    this.disabled = !!next;
  }

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
   * Indicates that the option value should sync with the value of the dropdown's control.
   *
   * @public
   * @remarks
   * HTML Attribute: `freeform`
   */
  @attr({ mode: 'boolean' })
  public freeform?: boolean;

  /**
   * The id of the option. If not provided, a unique id will be assigned.
   *
   * @override
   * @public
   * @remarks
   * HTML Attribute: `id`
   */
  @attr({ attribute: 'id' })
  public override id: string = uniqueId('option-');

  /**
   * The initial value of the option.
   *
   * @public
   * @remarks
   * HTML Attribute: `value`
   */
  @attr({ attribute: 'value', mode: 'fromView' })
  public initialValue: string = '';

  /**
   * Sets the value of the option when the `value` attribute changes.
   *
   * @param prev - The previous initial value
   * @param next - The current initial value
   * @internal
   */
  protected initialValueChanged(prev: string, next: string): void {
    this._value = next;
  }

  /**
   * Indicates that the option is in a multiple selection mode context.
   * @public
   */
  @observable
  public multiple: boolean = false;

  /**
   * Updates the multiple state of the option when the multiple property changes.
   *
   * @param prev - the previous multiple state
   * @param next - the current multiple state
   */
  public multipleChanged(prev: boolean, next: boolean): void {
    toggleState(this.elementInternals, 'multiple', next);
    this.selected = false;
  }

  /**
   * The name of the option. This option's value will be surfaced during form submission under the provided name.
   *
   * @public
   * @remarks
   * HTML Attribute: `name`
   */
  @attr
  public name!: string;

  /**
   * Reference to the start slot element.
   *
   * @internal
   */
  @observable
  public start!: HTMLSlotElement;

  /**
   * The text to display in the dropdown control when the option is selected.
   *
   * @public
   * @remarks
   * HTML Attribute: `text`
   */
  @attr({ attribute: 'text', mode: 'fromView' })
  public textAttribute?: string;

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * The associated `<form>` element.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/form | `ElementInternals.form`} property.
   */
  public get form(): HTMLFormElement | null {
    return this.elementInternals.form;
  }

  /**
   * The collection of slotted `output` elements, used to display the value when the option is freeform.
   *
   * @internal
   */
  public freeformOutputs?: HTMLOutputElement[];

  /**
   * The form-associated flag.
   * @see {@link https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-face-example | Form-associated custom elements}
   *
   * @public
   */
  public static formAssociated = true;

  /**
   * A reference to all associated `<label>` elements.
   *
   * @public
   */
  public get labels(): ReadonlyArray<HTMLLabelElement> {
    return Object.freeze(Array.from(this.elementInternals.labels) as HTMLLabelElement[]);
  }

  /**
   * The option's current selected state.
   *
   * @public
   */
  public get selected(): boolean {
    Observable.track(this, 'selected');
    return !!this.currentSelected;
  }

  public set selected(next: boolean) {
    this.currentSelected = next;

    Updates.enqueue(() => {
      if (this.$fastController.isConnected) {
        this.setFormValue(next ? this.value : null);

        this.elementInternals.ariaSelected = next ? 'true' : 'false';
        toggleState(this.elementInternals, 'selected', next);
      }
    });
    Observable.notify(this, 'selected');
  }

  /**
   * The display text of the option.
   *
   * @public
   * @remarks
   * When the option is freeform, the text is the value of the option.
   */
  public get text(): string {
    if (this.freeform) {
      return this.value.replace(/\s+/g, ' ').trim();
    }

    return (this.textAttribute ?? this.textContent)?.replace(/\s+/g, ' ').trim() ?? '';
  }

  /**
   * The internal value of the option.
   *
   * @internal
   */
  private _value: string = this.initialValue;

  /**
   * The current value of the option.
   *
   * @public
   */
  public get value(): string {
    Observable.track(this, 'value');
    return this._value ?? this.text;
  }

  public set value(value: string) {
    this._value = value;

    if (this.$fastController.isConnected) {
      this.setFormValue(this.selected ? value : null);

      this.freeformOutputs?.forEach(output => {
        output.value = value;
      });

      Observable.notify(this, 'value');
    }
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.freeform) {
      this.value = '';
      this.hidden = true;
      this.selected = false;
    }
  }

  constructor() {
    super();
    this.elementInternals.role = 'option';
  }

  /**
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/setFormValue | `ElementInternals.setFormValue()`} method.
   *
   * @internal
   */
  public setFormValue(value: File | string | FormData | null, state?: File | string | FormData | null): void {
    if (this.disabled) {
      this.elementInternals.setFormValue(null);
      return;
    }
    this.elementInternals.setFormValue(value, value ?? state);
  }

  /**
   * Toggles the selected state of the control.
   *
   * @param force - Forces the element to be checked or unchecked
   * @public
   */
  public toggleSelected(force: boolean = !this.selected): void {
    this.selected = force;
  }
}
