import {
  attr,
  FASTElement,
  nullableNumberConverter,
  Observable,
  observable,
  Updates,
  volatile,
} from '@microsoft/fast-element';
import { findLastIndex } from '@microsoft/fast-web-utilities';
import { isOption, Option } from '../option/option.js';
import { getDirection } from '../utils/direction.js';
import { toggleState } from '../utils/element-internals.js';
import { DropdownAppearance, DropdownSize } from './dropdown.options.js';

/**
 * A Dropdown Custom HTML Element.
 * Implements the {@link https://w3c.github.io/aria/#combobox | ARIA combobox } role.
 *
 * @slot indicator - The indicator glyph
 * @slot default - The default slot for the dropdown options
 *
 * @remarks
 * The Dropdown element does not provide a form association value. Instead, the slotted Option elements handle form
 * association the same way as {@link (Checkbox:class)} elements. See the {@link (Option:class)} element for more details.
 *
 * @public
 */
export class BaseDropdown extends FASTElement {
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
   * The index of the first checked option, scoped to the enabled options.
   *
   * @internal
   */
  @observable
  public checkedIndex!: number;

  /**
   * The collection of checked options.
   *
   * @internal
   */
  public checkedOptions: Set<Option> = new Set();

  @observable
  public control!: HTMLButtonElement;

  /**
   * The disabled state of the dropdown.
   */
  @observable
  public disabled: boolean = false;

  /**
   * The display value of the dropdown.
   * @internal
   */
  @observable
  public displayValue!: string;

  /**
   * The value of the checked option.
   *
   * @public
   * @remarks
   * HTML Attribute: `value`
   */
  @attr({ attribute: 'value', mode: 'fromView' })
  public initialValue?: string;

  @attr({ mode: 'boolean' })
  multiple: boolean = false;

  protected multipleChanged(prev: boolean | undefined, next: boolean | undefined): void {
    Updates.enqueue(() => {
      this.elementInternals.ariaMultiSelectable = this.multiple ? 'true' : 'false';
      toggleState(this.elementInternals, 'multiple', next);
      this.options?.forEach(x => {
        toggleState(x.elementInternals, 'multiple', next);
      });
    });
  }

  @observable
  public listbox!: HTMLDivElement;

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
   */
  @observable
  public open!: boolean;

  public openChanged(prev: boolean | undefined, next: boolean | undefined): void {
    toggleState(this.elementInternals, 'open', next);
    this.elementInternals.ariaExpanded = next ? 'true' : 'false';

    Updates.enqueue(() => {
      this.enabledOptions[this.focusedIndex === -1 ? 0 : this.checkedIndex]?.focus();
    });
  }

  /**
   * The collection of all child options.
   *
   * @public
   */
  @observable
  public options!: Option[];

  /**
   * The placeholder text of the dropdown.
   *
   * @public
   */
  @attr
  public placeholder!: string;

  /**
   * Updates the display value when the placeholder property changes.
   *
   * @param prev - the previous placeholder value
   * @param next - the current placeholder value
   */
  protected placeholderChanged(prev: string | undefined, next: string | undefined): void {
    this.updateDisplayValue();
  }

  /**
   * Updates the enabled options collection when properties on the child options change.
   *
   * @param prev - the previous options
   * @param next - the current options
   */
  public optionsChanged(prev: Option[] | undefined, next: Option[] | undefined): void {
    const setSize = next?.length;
    if (!setSize) {
      return;
    }

    this.control.ariaSetSize = `${setSize}`;
    this.control.ariaHasPopup = 'listbox';

    if (!this.name && next.every(x => x.name === next[0].name)) {
      this.name = next[0].name;
    }

    const checkedIndex = findLastIndex(this.enabledOptions, x => x.initialChecked);

    next.forEach((option, index) => {
      option.setAttribute('role', 'option');
      option.ariaPosInSet = `${index + 1}`;
      option.ariaSetSize = `${setSize}`;

      if (this.initialValue && !this.dirtyState) {
        option.checked = option.value === this.initialValue;
      } else {
        option.checked = index === checkedIndex;
      }

      option.name = this.name ?? option.name;
      option.disabled = this.disabled || option.disabledAttribute;
    });

    if (!this.dirtyState && this.initialValue) {
      this.value = this.initialValue;
    }

    if (!this.value) {
      // TODO: Switch to standard `Array.findLastIndex` when TypeScript 5 is available
      this.checkedIndex = checkedIndex;
    }
  }

  /**
   * The required state of the dropdown.
   */
  @observable
  public required: boolean = false;

  /**
   * Sets that the button tabindex attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `tabindex`
   */
  @attr({ attribute: 'tabindex', mode: 'fromView', converter: nullableNumberConverter })
  public override tabIndex: number = 0;

  /**
   * A collection of child options that are not disabled.
   *
   * @internal
   */
  public get enabledOptions(): Option[] {
    if (this.disabled || !this.options) {
      return [];
    }

    return this.options.filter(x => !x.disabled);
  }

  /**
   * Indicates that the value has been changed by the user.
   *
   * @internal
   */
  private dirtyState: boolean = false;

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * The index of the currently focused option.
   *
   * @internal
   */
  private focusedIndex: number = 0;

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
    return this.enabledOptions.find(x => x.checked)?.value ?? null;
  }

  public set value(next: string | null) {
    const index = this.enabledOptions.findIndex(x => x.value === next);
    this.checkedIndex = index;

    if (this.$fastController.isConnected) {
      this.setValidity();
    }

    Observable.track(this, 'value');
  }

  /**
   * Handles opening and closing the dropdown based on the disabled state.
   * @param e - the event object
   *
   * @public
   */
  public beforetoggleHandler(e: ToggleEvent): boolean | void {
    if (this.disabled) {
      this.open = false;
      return;
    }

    this.open = e.newState === 'open';
    return true;
  }

  /**
   * Handles the change events for the dropdown.
   *
   * @param e - the event object
   * @returns - true if the event should be propagated, false otherwise
   *
   * @public
   */
  public changeHandler(e: Event): boolean | void {
    if (this === e.target) {
      return true;
    }

    this.dirtyState = true;
    const optionIndex = this.enabledOptions.indexOf(e.target as Option);
    this.selectOption(optionIndex);

    return true;
  }

  /**
   * Handles the click events for the dropdown.
   *
   * @param e - the event object
   * @returns - true if the event should be propagated, false otherwise
   *
   * @public
   */
  public clickHandler(e: MouseEvent): boolean | void {
    const target = e.target as Element;
    if (isOption(target)) {
      if (target.checked && !this.multiple) {
        this.listbox.hidePopover();
        this.control.focus();
      }
    }

    return true;
  }

  /**
   * Focuses the checked radio or the first enabled radio.
   *
   * @internal
   */
  public focus() {
    this.control.focus();
  }

  private getEnabledIndexInBounds(index: number, upperBound = this.enabledOptions.length): number {
    if (upperBound === 0) {
      return -1;
    }

    return (index + upperBound) % upperBound;
  }

  public keydownHandler(e: KeyboardEvent): boolean | void {
    const isRtl = getDirection(this) === 'rtl';
    let increment = 0;

    switch (e.key) {
      case 'ArrowLeft': {
        increment = isRtl ? 1 : -1;
        break;
      }

      case 'ArrowUp': {
        increment = -1;
        break;
      }

      case 'ArrowRight': {
        increment = isRtl ? -1 : 1;
        break;
      }

      case 'ArrowDown': {
        increment = 1;
        break;
      }

      case 'Tab': {
        this.listbox.hidePopover();
        break;
      }

      case 'Enter':
      case ' ': {
        const target = e.target as Element;
        if (isOption(target)) {
          target.click();
          return;
        }
        break;
      }
    }

    if (!increment) {
      return true;
    }

    if (!this.open) {
      this.listbox.showPopover();
      return true;
    }

    let nextIndex = this.focusedIndex;
    if (this.open) {
      nextIndex += increment;
    } else {
      e.preventDefault();
      this.listbox.showPopover();
      return true;
    }

    this.focusedIndex = this.getEnabledIndexInBounds(nextIndex);

    this.enabledOptions[this.focusedIndex]?.focus();
  }

  public selectOption(index: number = this.checkedIndex): void {
    let checkedIndex = this.checkedIndex;

    if (!this.multiple) {
      this.checkedOptions.clear();
    }

    this.enabledOptions.forEach((item, i) => {
      const shouldCheck = i === index;
      if (!this.multiple) {
        item.checked = shouldCheck;
      }
      if (shouldCheck) {
        checkedIndex = i;
      }
    });

    const checkedOption = this.enabledOptions[checkedIndex];

    if (this.enabledOptions[checkedIndex]?.checked) {
      this.checkedOptions.add(checkedOption);
    } else {
      this.checkedOptions.delete(checkedOption);
    }

    this.checkedIndex = checkedIndex;
    this.updateDisplayValue();
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
        anchor ?? this.enabledOptions[0],
      );
    }
  }

  /**
   * Updates the collection of child options when the slot changes.
   *
   * @param e - the slot change event
   * @internal
   */
  public slotchangeHandler(e: Event): void {
    const target = e.target as HTMLSlotElement;
    this.options = target.assignedElements().filter(isOption);
  }

  /**
   * Updates the display value for the control.
   *
   * @public
   */
  protected updateDisplayValue(): void {
    toggleState(
      this.elementInternals,
      'placeholder-visible',
      this.enabledOptions.length === 0 || this.checkedIndex === -1 || (this.multiple && this.checkedOptions.size === 0),
    );

    if (this.multiple) {
      if (this.checkedOptions.size === 0) {
        this.displayValue = this.placeholder;
        return;
      }

      this.displayValue = [...this.checkedOptions].map(x => x.textContent).join(', ') ?? this.placeholder;
      return;
    }

    this.displayValue = this.enabledOptions.find(x => x.checked)?.textContent ?? this.placeholder ?? '';
  }
}

/**
 * The Fluent Dropdown Custom HTML Element.
 *
 * @public
 */
export class Dropdown extends BaseDropdown {
  /**
   * The size of the dropdown.
   *
   * @public
   * @remarks
   * HTML Attribute: `size`
   */
  @attr
  public size: DropdownSize = DropdownSize.medium;

  /**
   * Applies size states when the `size` property changes.
   *
   * @param prev - the previous state
   * @param next - the next state
   * @internal
   */
  protected sizeChanged(prev: DropdownSize | undefined, next: DropdownSize | undefined) {
    prev && toggleState(this.elementInternals, `${prev}`, false);

    if (next && next in DropdownSize) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * The styled appearance of the dropdown.
   *
   * @public
   * @remarks
   * HTML Attribute: `appearance`
   */
  @attr
  public appearance: DropdownAppearance = DropdownAppearance.outline;

  /**
   * Applies appearance states when the `appearance` property changes.
   *
   * @param prev - the previous state
   * @param next - the next state
   * @internal
   */
  public appearanceChanged(prev?: DropdownAppearance, next?: DropdownAppearance) {
    prev && toggleState(this.elementInternals, `${prev}`, false);
    next && toggleState(this.elementInternals, `${next}`, true);
  }
}
