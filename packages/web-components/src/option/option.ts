import { attr, volatile } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import { toggleState } from '../utils/element-internals.js';
import { BaseCheckbox } from '../checkbox/checkbox.js';
import { CheckboxMode } from '../checkbox/checkbox.options.js';
import { AbstractCombobox } from '../patterns/abstract-combobox.js';

/**
 * Determines if the element is an {@link Option}.
 *
 * @param el - the element to check
 * @public
 */
export function isOption(el: Element): el is Option {
  return el instanceof Option;
}

/**
 * Base class for an Option custom element.
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
export class BaseOption extends BaseCheckbox {
  /**
   * The toggle mode.
   *
   * @internal
   */
  protected mode: CheckboxMode = CheckboxMode.selected;

  /**
   * Sets that the option id attribute.
   *
   * @override
   * @public
   * @remarks
   * HTML Attribute: `id`
   */
  @attr({ attribute: 'id', mode: 'fromView' })
  public override id: string = uniqueId('fluent-option-');

  /**
   * The element’s label.
   *
   * @public
   * @remarks
   * HTML Attribute: `label`
   */
  @attr({ attribute: 'label' })
  public initialLabel?: string;
  public get label(): string {
    return this.initialLabel?.trim() ?? this.text ?? '';
  }
  public set label(next: string) {
    if (this.initialLabel?.trim()) {
      this.initialLabel = next.trim();
    } else {
      this.text = next.trim();
    }
  }

  /**
   * The element’s text content.
   *
   * @public
   */
  public get text(): string {
    return this.textContent?.trim() ?? '';
  }
  public set text(next: string) {
    this.textContent = next.trim();
  }

  /**
   * The initial selected state of the element.
   *
   * @override
   * @public
   * @remarks
   * HTML Attribute: `selected`
   */
  @attr({ attribute: 'selected', mode: 'boolean' })
  public override initialChecked?: boolean;

  /**
   * The element's current selected state.
   *
   * @public
   */
  @volatile
  public get selected(): boolean {
    return this.checked;
  }

  public set selected(next: boolean) {
    this.checked = next;
  }

  private _active = false;

  /**
   * The element’s current ARIA active state.
   *
   * @public
   */
  public get active(): boolean {
    return this._active;
  }

  public set active(next: boolean) {
    this._active = next;
    toggleState(this.elementInternals, 'aria-active', next);
  }

  constructor() {
    super();
    this.elementInternals.role = 'option';
  }

  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();

    this.setName();
  }

  /**
   * Resets the form value to its initial value when the form is reset.
   *
   * @internal
   */
  formResetCallback(): void {
    this.selected = this.initialChecked ?? false;
    this.dirtyState = false;
    this.setValidity();
  }

  /**
   * Sets the ARIA selected state.
   *
   * @param value - The selected state
   * @internal
   */
  protected setAriaProperties(value: boolean = this.selected) {
    this.elementInternals.ariaSelected = value ? 'true' : 'false';
  }

  /**
   * If no `name` is defined, sets the name according to its connected combobox
   * element.
   *
   * @internal
   */
  protected setName() {
    if (this.name) {
      return;
    }

    const combobox = this.getCombobox();
    if (combobox?.name) {
      this.name = combobox.name as string;
    }
  }

  public override clickHandler(e: MouseEvent): boolean | void {
    // @ts-expect-error - Baseline 2024
    if (!this.elementInternals.states.has('multiple') && this.selected) {
      this.$emit('input');
      return;
    }
    super.clickHandler(e);
  }

  private getCombobox(): AbstractCombobox | null {
    const listboxShadowRoot = this.assignedSlot?.getRootNode();
    if (!listboxShadowRoot || !(listboxShadowRoot instanceof ShadowRoot)) {
      return null;
    }

    const listbox = listboxShadowRoot.host;

    const rootNode = this.getRootNode();
    const combobox = (rootNode instanceof ShadowRoot ? rootNode : document).querySelector(
      `[aria-controls="${listbox.id}"]`,
    );

    return combobox instanceof AbstractCombobox ? combobox : null;
  }
}

/**
 * An option custom element.
 *
 * @public
 */
export class Option extends BaseOption {}
