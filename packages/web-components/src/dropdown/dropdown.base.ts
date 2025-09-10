import { attr, FASTElement, Observable, observable, Updates, volatile } from '@microsoft/fast-element';
import type { Listbox } from '../listbox/listbox.js';
import { isListbox } from '../listbox/listbox.options.js';
import type { DropdownOption } from '../option/option.js';
import { isDropdownOption } from '../option/option.options.js';
import { getDirection } from '../utils/direction.js';
import { toggleState } from '../utils/element-internals.js';
import { getLanguage } from '../utils/language.js';
import { AnchorPositioningCSSSupported } from '../utils/support.js';
import { uniqueId } from '../utils/unique-id.js';
import { waitForConnectedDescendants } from '../utils/request-idle-callback.js';
import { DropdownType } from './dropdown.options.js';
import { dropdownButtonTemplate, dropdownInputTemplate } from './dropdown.template.js';

/**
 * A Dropdown Custom HTML Element.
 * Implements the {@link https://w3c.github.io/aria/#combobox | ARIA combobox } role.
 *
 * @remarks
 * The Dropdown element does not provide a form association value. Instead, the slotted Option elements handle form
 * association the same way as {@link (Checkbox:class)} elements. See the {@link (DropdownOption:class)} element for
 * more details.
 *
 * @slot - The default slot. Accepts a {@link (Listbox:class)} element.
 * @slot indicator - The indicator slot.
 * @slot control - The control slot. This slot is automatically populated and should not be manually manipulated.
 *
 * @public
 */
export class BaseDropdown extends FASTElement {
  /**
   * Static property for the anchor positioning fallback observer. The observer is used to flip the listbox when it is
   * out of view.
   * @remarks This is only used when the browser does not support CSS anchor positioning.
   * @internal
   */
  private static AnchorPositionFallbackObserver: IntersectionObserver;

  /**
   * The ID of the current active descendant.
   *
   * @public
   */
  @volatile
  public get activeDescendant(): string | undefined {
    if (this.open) {
      return this.enabledOptions[this.activeIndex]?.id;
    }

    return undefined;
  }

  /**
   * The index of the currently active option.
   *
   * @internal
   */
  @observable
  public activeIndex: number = 0;

  /**
   * Sets the active index when the active index property changes.
   *
   * @param prev - the previous active index
   * @param next - the current active index
   * @internal
   */
  public activeIndexChanged(prev: number | undefined, next: number | undefined): void {
    if (typeof next === 'number') {
      const optionIndex = this.matches(':has(:focus-visible)') ? next : -1;

      this.enabledOptions.forEach((option, index) => {
        option.active = index === optionIndex;
      });

      if (this.open) {
        this.enabledOptions[optionIndex]?.scrollIntoView({ block: 'nearest' });
      }
    }
  }

  /**
   * The `aria-labelledby` attribute value of the dropdown.
   *
   * @public
   */
  @attr({ attribute: 'aria-labelledby', mode: 'fromView' })
  public ariaLabelledBy!: string;

  /**
   * Reference to the control element.
   * @internal
   */
  @observable
  public control!: HTMLInputElement;

  /**
   * Updates properties on the control element when the control slot changes.
   *
   * @param prev - the previous control element
   * @param next - the current control element
   * @internal
   * @remarks
   * The control element is assigned to the dropdown via the control slot with manual slot assignment.
   */
  public controlChanged(prev: HTMLInputElement | undefined, next: HTMLInputElement | undefined): void {
    if (next) {
      next.id = next.id || uniqueId('input-');
    }
  }

  /**
   * The disabled state of the dropdown.
   * @public
   */
  @attr({ mode: 'boolean' })
  public disabled?: boolean;

  /**
   * Updates the disabled state of the options when the disabled property changes.
   *
   * @param prev - the previous disabled state
   * @param next - the current disabled state
   */
  public disabledChanged(prev: boolean | undefined, next: boolean | undefined): void {
    Updates.enqueue(() => {
      this.options.forEach(option => {
        option.disabled = option.disabledAttribute || this.disabled;
      });
    });
  }

  /**
   * The display value for the control.
   *
   * @public
   */
  @volatile
  public get displayValue(): string {
    if (!this.$fastController.isConnected || !this.control || (this.isCombobox && this.multiple)) {
      toggleState(this.elementInternals, 'placeholder-shown', false);
      return '';
    }

    this.listFormatter =
      this.listFormatter ??
      new Intl.ListFormat(getLanguage(this), {
        type: 'conjunction',
        style: 'narrow',
      });

    const displayValue = this.listFormatter.format(this.selectedOptions.map(x => x.text));
    toggleState(this.elementInternals, 'placeholder-shown', !displayValue);

    if (this.isCombobox) {
      // comboboxes use an input element for the control, which provides the placeholder behavior
      return displayValue;
    }

    return displayValue || this.placeholder;
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
   * The value of the selected option.
   *
   * @public
   * @remarks
   * HTML Attribute: `value`
   */
  @attr({ attribute: 'value', mode: 'fromView' })
  public initialValue?: string;

  /**
   * Reference to the slotted listbox element.
   *
   * @internal
   */
  @observable
  public listbox!: Listbox;

  /**
   * Updates properties on the listbox element when the listbox reference changes.
   *
   * @param prev - the previous listbox element
   * @param next - the current listbox element
   * @internal
   *
   * @remarks
   * The listbox element is assigned to the dropdown via the default slot with manual slot assignment.
   */
  public listboxChanged(prev: Listbox | undefined, next: Listbox | undefined): void {
    if (prev) {
      Observable.getNotifier(this).unsubscribe(prev);
    }

    if (next) {
      next.dropdown = this;
      next.popover = 'manual';
      next.tabIndex = -1;

      const notifier = Observable.getNotifier(this);
      notifier.subscribe(next);

      for (const key of ['disabled', 'multiple']) {
        notifier.notify(key);
      }

      Updates.enqueue(() => {
        this.enabledOptions
          .filter(x => x.defaultSelected)
          .forEach((x, i) => {
            x.selected = this.multiple || i === 0;
          });

        this.setValidity();
      });

      if (AnchorPositioningCSSSupported) {
        // The `anchor-name` property seems to not be isolated between instances in Safari Technology Preview 220 (18.4).
        // It's unclear if the spec requires the `anchor-name` to be unique when styled on the `:host`.
        const anchorName = uniqueId('--dropdown-anchor-');
        this.style.setProperty('anchor-name', anchorName);
        this.listbox.style.setProperty('position-anchor', anchorName);
      }
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
    this.elementInternals.ariaMultiSelectable = next ? 'true' : 'false';
    toggleState(this.elementInternals, 'multiple', next);
    this.value = null;
  }

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
   * Updates the name of the options when the name property changes.
   *
   * @param prev - the previous name
   * @param next - the current name
   */
  nameChanged(prev: string, next: string): void {
    Updates.enqueue(() => {
      this.options.forEach(option => {
        option.name = next;
      });
    });
  }

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

    if (!AnchorPositioningCSSSupported) {
      this.anchorPositionFallback(next);
    }
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
   * The initial value of the control. When the control is a combobox, this value is used to set the value of the
   * control when the dropdown is initialized.
   *
   * @public
   * @remarks
   * HTML Attribute: `value`
   */
  @attr({ attribute: 'value' })
  public valueAttribute: string = '';

  /**
   * The slot element for the control.
   * @internal
   */
  public controlSlot!: HTMLSlotElement;

  /**
   * An abort controller to remove scroll and resize event listeners when the dropdown is closed or disconnected. Used
   * when the browser does not support CSS anchor positioning.
   *
   * @internal
   */
  private debounceController?: AbortController;

  /**
   * Repositions the listbox to align with the control element. Used when the browser does not support CSS anchor
   * positioning.
   *
   * @internal
   */
  private repositionListbox = () => {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }

    this.frameId = requestAnimationFrame(() => {
      const controlRect = this.getBoundingClientRect();
      const right = window.innerWidth - controlRect.right;
      const left = controlRect.left;

      this.listbox.style.minWidth = `${controlRect.width}px`;
      this.listbox.style.top = `${controlRect.top}px`;

      if (
        left + controlRect.width > window.innerWidth ||
        (getDirection(this) === 'rtl' && right - controlRect.width > 0)
      ) {
        this.listbox.style.right = `${right}px`;
        this.listbox.style.left = 'unset';
      } else {
        this.listbox.style.left = `${left}px`;
        this.listbox.style.right = 'unset';
      }
    });
  };

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * The collection of enabled options.
   * @public
   */
  public get enabledOptions(): DropdownOption[] {
    return this.listbox?.enabledOptions ?? [];
  }

  /**
   * The form-associated flag.
   * @see {@link https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-face-example | Form-associated custom elements}
   *
   * @public
   */
  public static formAssociated = true;

  /**
   * The ID of the frame used for repositioning the listbox when the browser does not support CSS anchor positioning.
   *
   * @internal
   */
  private frameId?: number;

  /**
   * A reference to the first freeform option, if present.
   *
   * @internal
   */
  private get freeformOption(): DropdownOption | undefined {
    return this.enabledOptions.find(x => x.freeform);
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
   * A reference to all associated label elements.
   *
   * @public
   */
  public get labels(): ReadonlyArray<Node> {
    return Object.freeze(Array.from(this.elementInternals.labels));
  }

  /**
   * The list formatter for the dropdown. Used to format the display value when the dropdown is in multiple selection mode.
   *
   * @internal
   */
  private listFormatter?: Intl.ListFormat;

  /**
   * The list collator for the dropdown. Used to filter options based on the input value.
   *
   * @internal
   */
  private listCollator?: Intl.Collator;

  /**
   * The collection of all child options.
   *
   * @public
   */
  public get options(): DropdownOption[] {
    return this.listbox?.options ?? [];
  }

  /**
   * The index of the first selected option, scoped to the enabled options.
   *
   * @internal
   * @remarks
   * This property is a reflection of {@link Listbox.selectedIndex}.
   */
  public get selectedIndex(): number {
    return this.enabledOptions.findIndex(x => x.selected) ?? -1;
  }

  /**
   * The collection of selected options.
   *
   * @public
   * @remarks
   * This property is a reflection of {@link Listbox.selectedOptions}.
   */
  public get selectedOptions(): DropdownOption[] {
    return this.listbox?.selectedOptions ?? [];
  }

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
      validationMessageFallbackControl.name = 'validation-message-fallback';
      validationMessageFallbackControl.required = true;
      validationMessageFallbackControl.checked = false;

      this._validationFallbackMessage = validationMessageFallbackControl.validationMessage;
    }

    if (!this.disabled && this.required && this.listbox.selectedOptions.length === 0) {
      return this._validationFallbackMessage;
    }

    return '';
  }

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
   * The current value of the selected option.
   *
   * @public
   */
  public get value(): string | null {
    Observable.notify(this, 'value');
    return this.enabledOptions.find(x => x.selected)?.value ?? null;
  }

  public set value(next: string | null) {
    if (this.multiple) {
      return;
    }
    this.selectOption(this.enabledOptions.findIndex(x => x.value === next));
    Observable.track(this, 'value');
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

    const optionIndex = this.isCombobox
      ? this.enabledOptions.findIndex(x => x.text === this.control.value)
      : this.enabledOptions.indexOf(e.target as DropdownOption);

    this.selectOption(optionIndex, true);

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

    if (target === this.control && !this.isCombobox) {
      this.listbox.togglePopover();
      return true;
    }

    if (!this.open) {
      this.listbox.showPopover();
      return true;
    }

    if (isDropdownOption(target)) {
      if (target.disabled) {
        return;
      }

      this.selectOption(this.enabledOptions.indexOf(target), true);

      if (!this.multiple) {
        if (this.isCombobox) {
          this.control.value = target.text;
          this.updateFreeformOption();
        }

        this.listbox.hidePopover();
      }
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
   * Filters the options based on the input value.
   *
   * @param value - the input value to filter the options by
   * @param collection - the collection of options to filter
   * @returns the filtered options
   * @internal
   */
  public filterOptions(value: string, collection: DropdownOption[] = this.enabledOptions): DropdownOption[] {
    if (!this.listCollator) {
      this.listCollator = new Intl.Collator(getLanguage(this), { usage: 'search', sensitivity: 'base' });
    }

    return collection.filter(x => {
      return this.listCollator!.compare(x.text.substring(0, Math.min(x.text.length, value.length)), value) === 0;
    });
  }

  /**
   * Focuses the control when the dropdown receives focus.
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
   * Toggles the listbox when the control element loses focus.
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

  /**
   * Resets the form value to its initial value when the form is reset.
   *
   * @internal
   */
  formResetCallback(): void {
    this.enabledOptions.forEach((x, i) => {
      if (this.multiple) {
        x.selected = !!x.defaultSelected;
        return;
      }

      if (!x.defaultSelected) {
        x.selected = false;
        return;
      }

      this.selectOption(i);
    });

    this.setValidity();
  }

  /**
   * Ensures the active index is within bounds of the enabled options. Out-of-bounds indices are wrapped to the opposite
   * end of the range.
   *
   * @param index - the desired index
   * @param upperBound - the upper bound of the range
   * @returns the index in bounds
   * @internal
   */
  private getEnabledIndexInBounds(index: number, upperBound = this.enabledOptions.length || 0): number {
    if (upperBound === 0) {
      return -1;
    }

    return (index + upperBound) % upperBound;
  }

  /**
   * Handles the input events for the dropdown from the control element.
   *
   * @param e - the input event
   * @public
   */
  public inputHandler(e: InputEvent): boolean | void {
    if (!this.open) {
      this.listbox.showPopover();
    }

    this.updateFreeformOption();

    const controlValue = this.control.value;
    const index = this.enabledOptions.indexOf(this.filterOptions(controlValue)[0] ?? null);

    this.activeIndex = index;

    return true;
  }

  /**
   * Inserts the control element based on the dropdown type.
   *
   * @public
   * @remarks
   * This method can be overridden in derived classes to provide custom control elements, though this is not recommended.
   */
  protected insertControl(): void {
    this.controlSlot?.assignedNodes().forEach(x => this.removeChild(x));

    if (this.type === DropdownType.combobox) {
      dropdownInputTemplate.render(this, this);
      return;
    }

    dropdownButtonTemplate.render(this, this);
  }

  /**
   * Handles the keydown events for the dropdown.
   *
   * @param e - the keyboard event
   * @public
   */
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
        if (this.isCombobox) {
          break;
        }

        e.preventDefault();
      }

      case 'Enter':
      case 'Tab': {
        if (this.open) {
          this.selectOption(this.activeIndex, true);
          if (this.multiple) {
            break;
          }

          this.listbox.hidePopover();
          return e.key === 'Tab';
        }

        this.listbox.showPopover();
        break;
      }

      case 'Escape': {
        this.activeIndex = this.multiple ? 0 : this.selectedIndex;
        this.listbox.hidePopover();
        break;
      }
    }

    if (!increment) {
      return true;
    }

    if (!this.open) {
      this.listbox.showPopover();
      return;
    }

    let nextIndex = this.activeIndex;
    nextIndex += increment;

    let indexInBounds = this.getEnabledIndexInBounds(nextIndex);

    if (indexInBounds === 0 && this.freeformOption?.hidden) {
      indexInBounds = this.getEnabledIndexInBounds(nextIndex + increment);
    }

    this.activeIndex = indexInBounds;

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
    if (this.disabled || (e.target === this.control && !this.isCombobox)) {
      return;
    }

    return !isDropdownOption(e.target as HTMLElement);
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
   * Selects an option by index.
   *
   * @param index - The index of the option to select.
   * @public
   */
  public selectOption(index: number = this.selectedIndex, shouldEmit: boolean = false): void {
    this.listbox.selectOption(index);
    this.control.value = this.displayValue;

    this.setValidity();

    this.updateFreeformOption();

    if (shouldEmit) {
      this.$emit('change');
    }
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

      const valueMissing = this.required && this.listbox.selectedOptions.length === 0;

      this.elementInternals.setValidity(
        { valueMissing, ...flags },
        message ?? this.validationMessage,
        anchor ?? this.control,
      );
    }
  }

  /**
   * Handles the `slotchange` event for the dropdown.
   * Sets the `listbox` property when a valid listbox is assigned to the default slot.
   *
   * @param e - the slot change event
   * @internal
   */
  public slotchangeHandler(e: Event): boolean | void {
    const target = e.target as HTMLSlotElement;

    waitForConnectedDescendants(this, () => {
      const listbox = target.assignedElements().find((el): el is Listbox => isListbox(el));
      if (listbox) {
        this.listbox = listbox;
      }
    });
  }

  /**
   * Updates the freeform option with the provided value.
   *
   * @param value - the value to update the freeform option with
   * @internal
   */
  protected updateFreeformOption(value: string = this.control.value): void {
    if (!this.freeformOption) {
      return;
    }

    if (
      value === '' ||
      this.filterOptions(
        value,
        this.enabledOptions.filter(x => !x.freeform),
      ).length
    ) {
      this.freeformOption.value = '';
      this.freeformOption.selected = false;
      this.freeformOption.hidden = true;
      return;
    }

    this.freeformOption.value = value;
    this.freeformOption.hidden = false;
  }

  disconnectedCallback(): void {
    BaseDropdown.AnchorPositionFallbackObserver?.disconnect();
    this.debounceController?.abort();

    super.disconnectedCallback();
  }

  /**
   * When anchor positioning isn't supported, an intersection observer is used to flip the listbox when it hits the
   * viewport bounds. One static observer is used for all dropdowns.
   *
   * @internal
   */
  private anchorPositionFallback(shouldObserve?: boolean): void {
    if (!BaseDropdown.AnchorPositionFallbackObserver) {
      BaseDropdown.AnchorPositionFallbackObserver = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]): void => {
          entries.forEach(({ boundingClientRect, isIntersecting, target }) => {
            if (isListbox(target)) {
              if (boundingClientRect.bottom > window.innerHeight) {
                toggleState(target.elementInternals, 'flip-block', true);
                return;
              }

              if (boundingClientRect.top < 0) {
                toggleState(target.elementInternals, 'flip-block', false);
              }
            }
          });
        },
        { threshold: 1 },
      );
    }

    if (shouldObserve) {
      this.debounceController = new AbortController();
      BaseDropdown.AnchorPositionFallbackObserver.observe(this.listbox);

      window.addEventListener('scroll', this.repositionListbox, {
        passive: true,
        capture: true,
        signal: this.debounceController.signal,
      });

      window.addEventListener('resize', this.repositionListbox, {
        passive: true,
        signal: this.debounceController.signal,
      });

      this.repositionListbox();

      return;
    }

    BaseDropdown.AnchorPositionFallbackObserver.unobserve(this.listbox);
    this.debounceController?.abort();

    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = undefined;
    }
  }
}
