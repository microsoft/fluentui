import {
  attr,
  FASTElement,
  Observable,
  observable,
  Updates,
  type ViewTemplate,
  volatile,
} from '@microsoft/fast-element';
import type { Listbox } from '../listbox/listbox.js';
import type { Option } from '../option/option.js';
import { isOption } from '../option/option.options.js';
import { swapStates, toggleState } from '../utils/element-internals.js';
import { uniqueId } from '../utils/unique-id.js';
import { DropdownAppearance, DropdownSize, DropdownType } from './dropdown.options.js';
import { dropdownButtonTemplate, dropdownIndicatorTemplate, dropdownInputTemplate } from './dropdown.template.js';

/**
 * A Dropdown Custom HTML Element.
 * Implements the {@link https://w3c.github.io/aria/#combobox | ARIA combobox } role.
 *
 * @remarks
 * The Dropdown element does not provide a form association value. Instead, the slotted Option elements handle form
 * association the same way as {@link (Checkbox:class)} elements. See the {@link (Option:class)} element for more details.
 *
 * @public
 */
export class BaseDropdown extends FASTElement {
  /**
   * The index of the first checked option, scoped to the enabled options.
   *
   * @internal
   */
  public get selectedIndex(): number {
    return this.listbox.enabledOptions.findIndex(x => x.checked);
  }

  /**
   * The collection of checked options.
   *
   * @internal
   */
  public checkedOptions: Set<Option> = new Set();

  @observable
  public control!: HTMLInputElement;

  public controlChanged(prev: HTMLInputElement | undefined, next: HTMLInputElement | undefined): void {
    if (next) {
      next.ariaHasPopup = 'listbox';
      next.id = next.id || uniqueId('input-');
      this.controlSlot?.assign(next);
    }
  }

  public controlSlot!: HTMLSlotElement;

  /**
   * The disabled state of the dropdown.
   */
  @attr({ mode: 'boolean' })
  public disabled?: boolean;

  public disabledChanged(prev: boolean | undefined, next: boolean | undefined): void {
    toggleState(this.elementInternals, 'disabled', next);
  }

  /**
   * The display value for the control.
   *
   * @public
   */
  @volatile
  public get displayValue(): string {
    if (!this.$fastController.isConnected || !this.control) {
      return '';
    }

    if (this.multiple) {
      return this.type === DropdownType.dropdown
        ? [...(this.listbox?.selectedOptions ?? [])].map(x => x.textContent).join(', ') || this.placeholder
        : '';
    }

    const displayValue = this.listbox?.enabledOptions.find(x => x.checked)?.textContent;

    if (this.isCombobox) {
      return displayValue ?? '';
    }

    toggleState(this.elementInternals, 'placeholder-shown', !displayValue);

    return displayValue ?? this.placeholder ?? '';
  }

  /**
   * Sets the listbox ID to a unique value if one is not provided.
   *
   * @override
   * @public
   * @remarks
   * HTML Attribute: `id`
   */
  @attr({ attribute: 'id' })
  public override id: string = uniqueId('dropdown-');

  /**
   * Reference to the indicator button element.
   *
   * @internal
   */
  @observable
  public indicator!: HTMLDivElement;

  /**
   * Reference to the indicator slot element.
   *
   * @internal
   */
  @observable
  public indicatorSlot?: HTMLSlotElement;

  /**
   * The value of the checked option.
   *
   * @public
   * @remarks
   * HTML Attribute: `value`
   */
  @attr({ attribute: 'value', mode: 'fromView' })
  public initialValue?: string;

  /**
   * The dropdown type.
   *
   * @public
   * @remarks
   * HTML Attribute: `type`
   */
  @attr
  public type: DropdownType = DropdownType.dropdown;

  /**
   * Changes the slotted control element based on the dropdown type.
   *
   * @param prev - the previous dropdown type
   * @param next - the current dropdown type
   * @internal
   */
  public typeChanged(prev: DropdownType | undefined, next: DropdownType | undefined): void {
    if (this.$fastController.isConnected) {
      this.insertControl();
    }
  }

  /**
   * Indicates whether the dropdown allows multiple options to be selected.
   *
   * @public
   * @remarks
   * HTML Attribute: `multiple`
   */
  @attr({ mode: 'boolean' })
  public multiple?: boolean;

  /**
   * Toggles between single and multiple selection modes when the `multiple` property changes.
   *
   * @param prev - the previous multiple state
   * @param next - the next multiple state
   * @internal
   */
  protected multipleChanged(prev: boolean | undefined, next: boolean | undefined): void {
    this.listbox?.enabledOptions.forEach(x => (x.checked = false));

    this.elementInternals.ariaMultiSelectable = next ? 'true' : 'false';
    toggleState(this.elementInternals, 'multiple', next);

    Updates.enqueue(() => {
      this.options.forEach(x => x.setMultipleState(next));
    });
  }

  /**
   * The `aria-labelledby` attribute value of the dropdown.
   *
   * @public
   */
  @attr({ attribute: 'aria-labelledby', mode: 'fromView' })
  public ariaLabelledBy!: string;

  /**
   * Reference to the listbox slot element.
   *
   * @internal
   */
  @observable
  public listboxSlot!: HTMLSlotElement;

  /**
   * Reference to the slotted listbox element.
   *
   * @internal
   */
  @observable
  public listbox!: Listbox;

  /**
   * The name of the dropdown.
   *
   * @public
   * @remarks
   * HTML Attribute: `name`
   */
  @attr
  public name!: string;

  /**
   * Indicates whether the dropdown is open.
   *
   * @public
   * @remarks
   * HTML Attribute: `open`
   */
  @observable
  public open!: boolean;

  /**
   * Handles the open state of the dropdown.
   *
   * @param prev - the previous open state
   * @param next - the current open state
   *
   * @internal
   */
  public openChanged(prev: boolean | undefined, next: boolean | undefined): void {
    toggleState(this.elementInternals, 'open', next);
    this.elementInternals.ariaExpanded = next ? 'true' : 'false';
    this.activeIndex = this.selectedIndex ?? -1;
  }

  /**
   * Indicates whether the dropdown is a combobox.
   *
   * @internal
   */
  private get isCombobox(): boolean {
    return this.type === DropdownType.combobox;
  }

  /**
   * The collection of all child options.
   *
   * @public
   */
  public get options(): Option[] {
    return this.listbox?.options ?? [];
  }

  /**
   * The placeholder text of the dropdown.
   *
   * @public
   */
  @attr
  public placeholder!: string;

  /**
   * The required state of the dropdown.
   *
   * @public
   * @remarks
   * HTML Attribute: `required`
   */
  @attr({ mode: 'boolean' })
  public required: boolean = false;

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * The index of the currently active option.
   *
   * @internal
   */
  @observable
  public activeIndex: number = 0;

  public activeIndexChanged(prev: number, next: number): void {
    this.setActiveOption();
  }

  /**
   * The ID of the current active descendant.
   *
   * @public
   */
  @volatile
  public get activeDescendant(): string | null {
    return this.open ? this.listbox.enabledOptions[this.activeIndex]?.id : null;
  }

  /**
   * The form-associated flag.
   * @see {@link https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-face-example | Form-associated custom elements}
   *
   * @public
   */
  public static formAssociated = true;

  /**
   * The fallback validation message, taken from a native `<input>` element.
   *
   * @internal
   */
  private _validationFallbackMessage!: string;

  /**
   * The validation message. Uses the browser's default validation message for native checkboxes if not otherwise
   * specified (e.g., via `setCustomValidity`).
   *
   * @internal
   */
  public get validationMessage(): string {
    if (this.elementInternals.validationMessage) {
      return this.elementInternals.validationMessage;
    }

    if (!this._validationFallbackMessage) {
      const validationMessageFallbackControl = document.createElement('input');
      validationMessageFallbackControl.type = 'radio';
      validationMessageFallbackControl.required = true;
      validationMessageFallbackControl.checked = false;

      this._validationFallbackMessage = validationMessageFallbackControl.validationMessage;
    }

    return this._validationFallbackMessage;
  }

  /**
   * The current value of the checked option.
   *
   * @public
   */
  public get value(): string | null {
    Observable.notify(this, 'value');
    return this.listbox.enabledOptions.find(x => x.checked)?.value ?? null;
  }

  public set value(next: string | null) {
    this.selectOption(this.listbox.enabledOptions.findIndex(x => x.value === next));
    Observable.track(this, 'value');
  }

  /**
   * Handles opening and closing the dropdown based on the disabled state.
   *
   * @param e - the event object
   *
   * @public
   */
  public beforetoggleListboxHandler = (e: ToggleEvent): boolean | void => {
    if (this.disabled) {
      this.open = false;
      return;
    }

    this.open = e.newState === 'open';
    this.activeIndex = this.selectedIndex;
    return true;
  };

  /**
   * Handles the change events for the dropdown.
   *
   * @param e - the event object
   *
   * @public
   */
  public changeHandler(e: Event): boolean | void {
    if (this === e.target) {
      return true;
    }

    if (!this.isCombobox) {
      const optionIndex = this.listbox.enabledOptions.indexOf(e.target as Option);
      this.selectOption(optionIndex);
    } else {
      const optionIndex = this.listbox.enabledOptions.findIndex(x => x.text === this.control.value);
      this.selectOption(optionIndex);
    }

    return true;
  }

  /**
   * Handles the click events for the dropdown.
   *
   * @param e - the event object
   *
   * @public
   */
  public clickHandler(e: PointerEvent): boolean | void {
    if (this.disabled) {
      return;
    }

    const target = e.target as HTMLElement;

    this.focus();

    if (!this.open) {
      this.listbox.showPopover();
      return true;
    }

    if (isOption(target) && !this.multiple) {
      this.listbox.hidePopover();
    }

    return true;
  }

  constructor() {
    super();

    this.elementInternals.role = 'presentation';

    Updates.enqueue(() => {
      this.insertControl();
    });
  }

  /**
   * Focuses the checked radio or the first enabled radio.
   *
   * @internal
   */
  public focus(options?: FocusOptions): void {
    if (this.disabled) {
      return;
    }

    this.control.focus(options);
  }

  /**
   * Removes the `focus-visible` state from the field when a slotted input loses focus.
   *
   * @param e - the focus event
   * @internal
   */
  public focusoutHandler(e: FocusEvent): boolean | void {
    const relatedTarget = e.relatedTarget as HTMLElement | null;

    if (this.open && !this.contains(relatedTarget)) {
      this.listbox.togglePopover();
    }

    return true;
  }

  private getEnabledIndexInBounds(index: number, upperBound = this.listbox.enabledOptions.length): number {
    if (upperBound === 0) {
      return -1;
    }

    return (index + upperBound) % upperBound;
  }

  public inputHandler(e: InputEvent): boolean | void {
    if (!this.open) {
      this.listbox.showPopover();
    }

    const index = this.listbox.enabledOptions.findIndex(x =>
      x.textContent?.toLowerCase().startsWith(this.control.value.toLowerCase()),
    );

    this.activeIndex = index;

    return true;
  }

  protected insertControl(): void {
    this.controlSlot?.assignedNodes().forEach(x => this.removeChild(x));
    switch (this.type) {
      case DropdownType.combobox: {
        dropdownInputTemplate.render(this, this);
        break;
      }

      case DropdownType.dropdown:
      default: {
        dropdownButtonTemplate.render(this, this);
        break;
      }
    }
  }

  public keydownHandler(e: KeyboardEvent): boolean | void {
    let increment = 0;

    switch (e.key) {
      case 'ArrowUp': {
        e.preventDefault();
        increment = -1;
        break;
      }

      case 'ArrowDown': {
        e.preventDefault();
        increment = 1;
        break;
      }

      case ' ': {
        if (this.type === 'combobox') {
          break;
        }
      }

      case 'Enter': {
        if (this.open) {
          this.selectOption(this.activeIndex);
          if (this.multiple) {
            return true;
          }

          this.listbox.hidePopover();
          return;
        }

        this.listbox.showPopover();
        return;
      }

      case 'Escape': {
        this.activeIndex = this.multiple ? 0 : this.selectedIndex;
        this.listbox.hidePopover();
        return true;
      }
    }

    if (!increment) {
      return true;
    }

    let nextIndex = this.activeIndex;
    if (this.open) {
      nextIndex += increment;
    } else {
      this.listbox.showPopover();
      return;
    }

    this.activeIndex = this.getEnabledIndexInBounds(nextIndex);

    this.setActiveOption(true);

    return true;
  }

  /**
   * Prevents the default behavior of the mousedown event. This is necessary to prevent the input from losing focus
   * when the dropdown is open.
   *
   * @param e - the mouse event
   *
   * @internal
   */
  public mousedownHandler(e: MouseEvent): boolean | void {
    if (this.disabled) {
      return;
    }
    return !isOption(e.target as HTMLElement);
  }

  /**
   * Sets the `active` state on the currently focused option.
   *
   * @internal
   */
  public setActiveOption(force?: boolean): void {
    const optionIndex = this.matches(':has(:focus-visible)') || force ? this.activeIndex : -1;

    this.listbox?.enabledOptions.forEach((option, index) => {
      option.setActiveState(index === optionIndex);
    });

    this.listbox?.enabledOptions[optionIndex]?.scrollIntoView({ block: 'nearest' });
  }

  /**
   * Selects an option by index.
   *
   * @param index - The index of the option to select.
   * @public
   */
  public selectOption(index: number = this.selectedIndex): void {
    this.listbox.selectOption(index);
    this.setValidity();
  }

  /**
   * Sets the validity of the element.
   *
   * @param flags - Validity flags to set.
   * @param message - Optional message to supply. If not provided, the element's `validationMessage` will be used.
   * @param anchor - Optional anchor to use for the validation message.
   *
   * @internal
   */
  public setValidity(flags?: Partial<ValidityState>, message?: string, anchor?: HTMLElement): void {
    if (this.$fastController.isConnected) {
      if (this.disabled || !this.required) {
        this.elementInternals.setValidity({});
        return;
      }

      const valueMissing = this.required && this.checkedOptions.size === 0;

      this.elementInternals.setValidity(
        { valueMissing, ...flags },
        message ?? this.validationMessage,
        anchor ?? this.listbox.enabledOptions[0],
      );
    }
  }
}

export class Dropdown extends BaseDropdown {
  /**
   * The appearance of the dropdown.
   *
   * @public
   * @remarks
   * HTML Attribute: `appearance`
   */
  @attr
  public appearance: DropdownAppearance = DropdownAppearance.outline;

  /**
   * Swaps appearance states when the appearance property changes.
   *
   * @param prev - the previous appearance state
   * @param next - the current appearance state
   * @internal
   */
  public appearanceChanged(prev: DropdownAppearance | undefined, next: DropdownAppearance | undefined): void {
    swapStates(this.elementInternals, prev, next, DropdownAppearance);
  }

  /**
   * The size of the dropdown.
   * @public
   * @remarks
   * HTML Attribute: `size`
   */
  @attr
  public size?: DropdownSize;

  /**
   * Swaps size states when the size property changes.
   *
   * @param prev - the previous size state
   * @param next - the current size state
   * @internal
   */
  public sizeChanged(prev: DropdownSize | undefined, next: DropdownSize | undefined): void {
    swapStates(this.elementInternals, prev, next, DropdownSize);
  }

  /**
   * Inserts the control element.
   *
   * @internal
   */
  protected insertControl(): void {
    super.insertControl();
    this.insertIndicator();
  }

  /**
   * Removes any existing indicators and inserts a new one.
   *
   * @param template - The template to use for the indicator.
   * @internal
   */
  protected insertIndicator(template: ViewTemplate = dropdownIndicatorTemplate): void {
    this.indicatorSlot?.assignedNodes().forEach(x => this.removeChild(x));
    template.render(this, this);
    this.append(this.indicator);
    this.indicatorSlot?.assign(this.indicator);
  }
}
