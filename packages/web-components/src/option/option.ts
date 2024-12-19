import { attr, observable, Observable } from '@microsoft/fast-element';
import { BaseCheckbox } from '../checkbox/checkbox.js';
import { CheckboxMode } from '../checkbox/checkbox.options.js';
import type { Start } from '../patterns/start-end.js';
import { toggleState } from '../utils/element-internals.js';
import { uniqueId } from '../utils/unique-id.js';

/**
 * An Option Custom HTML Element.
 * Implements the {@link https://w3c.github.io/aria/#option | ARIA option } role.
 *
 * @slot checked-indicator - The checked indicator
 * @slot indeterminate-indicator - The indeterminate indicator
 * @fires change - Emits a custom change event when the checked state changes
 * @fires input - Emits a custom input event when the checked state changes
 *
 * @remarks
 * To support single and multiple selection modes with the {@link Dropdown} element, the Option element itself handles
 * form association and value submission, rather than its parent Dropdown element. In this way, the Option element is
 * a variation of the Checkbox element that is specifically designed for use in the Dropdown element.
 *
 * @public
 */
export class Option extends BaseCheckbox implements Start {
  /**
   * Indicates that the option is active.
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
   * The collection of slotted description elements.
   * @internal
   */
  @observable
  public descriptionSlot!: Node[];

  /**
   * Changes the description state of the option when the description slot changes.
   *
   * @param prev - the previous collection of description elements
   * @param next - the current collection of description elements
   */
  public descriptionSlotChanged(prev: Node[] | undefined, next: Node[] | undefined): void {
    toggleState(this.elementInternals, 'description', !!next?.length);
  }

  /**
   * Indicates that the option value matches the value of the dropdown's control.
   *
   * @public
   * @remarks
   * HTML Attribute: `freeform`
   */
  @attr({ mode: 'boolean' })
  public freeform?: boolean;

  /**
   * The collection of slotted `output` elements, used to display the value when the option is freeform.
   *
   * @internal
   */
  public freeformOutputs?: HTMLOutputElement[];

  /**
   * The id of the option. If not provided, a unique id will be assigned.
   *
   * @override
   * @public
   * @remarks
   * HTML Attribute: `id`
   */
  @attr({ attribute: 'id', mode: 'fromView' })
  public override id: string = uniqueId('option-');

  /**
   * The initial selected state of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: `selected`
   */
  @attr({ attribute: Option.mode, mode: 'boolean' })
  public initial?: boolean;

  /**
   * Reference to the start slot.
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
   * The collection of slotted title elements.
   *
   * @internal
   */
  @observable
  public titleSlot!: Node[];

  /**
   * Changes the title state of the option when the title slot changes.
   *
   * @param prev - the previous collection of title elements
   * @param next - the current collection of title elements
   * @internal
   */
  public titleSlotChanged(prev: Node[] | undefined, next: Node[] | undefined): void {
    toggleState(this.elementInternals, 'title', !!next?.length);
  }

  /**
   * The initial value of the element.
   *
   * @override
   * @public
   * @remarks
   * HTML Attribute: `value`
   */
  public override initialValue: string = '';

  /**
   * The toggle mode.
   *
   * @internal
   */
  public static mode: CheckboxMode = CheckboxMode.selected;

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

  public get value(): string {
    Observable.track(this, 'value');
    return super.value ?? this.text;
  }

  public set value(value: string) {
    super.value = value;

    this.freeformOutputs?.forEach(output => {
      output.value = value;
    });
  }

  connectedCallback(): void {
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
   * Sets the ARIA selected state.
   *
   * @param value - The selected state
   * @internal
   */
  protected setAriaProperties(value: boolean = this[this.mode]) {
    this.elementInternals.ariaSelected = value ? 'true' : 'false';
  }

  /**
   * Sets the multiple state.
   *
   * @param force - force the multiple state
   * @internal
   */
  public setMultipleState(force?: boolean) {
    toggleState(this.elementInternals, 'multiple', force);
  }
}
