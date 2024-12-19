import {
  attr,
  FASTElement,
  Observable,
  observable,
  Updates,
  type ViewTemplate,
  volatile,
} from '@microsoft/fast-element';
import { inRange, limit } from '@microsoft/fast-web-utilities';
import type { Listbox } from '../listbox/listbox.js';
import { isListbox } from '../listbox/listbox.options.js';
import type { Option } from '../option/option.js';
import { isOption } from '../option/option.options.js';
import { swapStates, toggleState } from '../utils/element-internals.js';
import { cancelIdleCallback, requestIdleCallback } from '../utils/idle-callback.js';
import { getLanguage } from '../utils/language.js';
import { AnchorPositioningCSSSupported } from '../utils/support.js';
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
   */
  public controlChanged(prev: HTMLInputElement | undefined, next: HTMLInputElement | undefined): void {
    if (next) {
      next.id = next.id || uniqueId('input-');
      this.controlSlot?.assign(next);
    }
  }

  /**
   * The disabled state of the dropdown.
   * @public
   */
  @attr({ mode: 'boolean' })
  public disabled?: boolean;

  /**
   * Toggles the disabled state of the dropdown when the disabled property changes.
   *
   * @param prev - the previous disabled state
   * @param next - the current disabled state
   * @internal
   */
  public disabledChanged(prev: boolean | undefined, next: boolean | undefined): void {
    toggleState(this.elementInternals, 'disabled', next);
  }

  /**
   * The collection of enabled options.
   * @public
   */
  public get enabledOptions(): Option[] | undefined {
    return this.listbox?.enabledOptions;
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
   * Indicates whether the dropdown allows multiple options to be selected.
   *
   * @public
   * @remarks
   * HTML Attribute: `multiple`
   */
  @attr({ mode: 'boolean' })
  public multiple?: boolean;

  /**
   * The `aria-labelledby` attribute value of the dropdown.
   *
   * @public
   */
  @attr({ attribute: 'aria-labelledby', mode: 'fromView' })
  public ariaLabelledBy!: string;

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
      if (this.isCombobox) {
        return '';
      }

      if (!this.listFormatter) {
        this.listFormatter = new Intl.ListFormat(getLanguage(this), {
          type: 'conjunction',
          style: 'narrow',
        });
      }

      return this.listFormatter.format(this.listbox.selectedOptions.map(x => x.text)) || this.placeholder;
    }

    const displayValue = this.enabledOptions?.find(x => x.checked)?.text;

    if (this.isCombobox) {
      return displayValue ?? '';
    }

    toggleState(this.elementInternals, 'placeholder-shown', !displayValue);

    return displayValue ?? this.placeholder ?? '';
  }

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
   * The initial value of the control. When the control is a combobox, this value is used to set the value of the
   * control when the dropdown is initialized.
   *
   * @public
   * @remarks
   * HTML Attribute: `value`
   */
  @attr({ attribute: 'value' })
  public valueAttribute: string = '';

  public controlSlot!: HTMLSlotElement;

  /**
   * The form-associated flag.
   * @see {@link https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-face-example | Form-associated custom elements}
   *
   * @public
   */
  public static formAssociated = true;

  private get freeformOption(): Option | undefined {
    return this.listbox.enabledOptions.find(x => x.freeform);
  }

  /**
   * The list formatter for the dropdown. Used to format the display value when the dropdown is in multiple selection mode.
   *
   * @internal
   */
  private listFormatter?: Intl.ListFormat;

  /**
   * The index of the first checked option, scoped to the enabled options.
   *
   * @internal
   */
  public get selectedIndex(): number {
    return this.listbox.enabledOptions.findIndex(x => x.checked);
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

    this.updateFreeformOption();

    this.open = e.newState === 'open';
    this.activeIndex = this.selectedIndex;

    if (!this.open) {
      this.control.value = this.displayValue;
    }
  };

  /**
   * Toggles between single and multiple selection modes when the `multiple` property changes.
   *
   * @param prev - the previous multiple state
   * @param next - the next multiple state
   * @internal
   */
  protected multipleChanged(prev: boolean | undefined, next: boolean | undefined): void {
    this.enabledOptions?.forEach(x => (x.checked = false));

    this.elementInternals.ariaMultiSelectable = next ? 'true' : 'false';
    toggleState(this.elementInternals, 'multiple', next);

    Updates.enqueue(() => {
      this.options.forEach(x => x.setMultipleState(next));
    });
  }

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
      if (this.isCombobox) {
        this.control.value = target.text;
        this.updateFreeformOption();
      }

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

    // this.control.focus(options);
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

  private getEnabledIndexInBounds(
    index: number,

    upperBound = this.listbox.enabledOptions.length,
  ): number {
    if (upperBound === 0) {
      return -1;
    }

    return (index + upperBound) % upperBound;
  }

  public inputHandler(e: InputEvent): boolean | void {
    if (!this.open) {
      this.listbox.showPopover();
    }

    this.updateFreeformOption();

    const controlValue = this.control.value;

    const index =
      controlValue !== ''
        ? this.listbox.enabledOptions.findIndex(x => x.value.toLowerCase().startsWith(controlValue.toLowerCase()))
        : -1;

    this.activeIndex = index;

    return true;
  }

  protected updateFreeformOption(value: string = this.control.value): void {
    if (!this.freeformOption) {
      return;
    }

    if (
      value === '' ||
      this.listbox.enabledOptions
        .filter(x => !x.freeform)
        .some(x => x.value.toLowerCase().startsWith(value.toLowerCase()))
    ) {
      this.freeformOption.value = '';
      this.freeformOption.selected = false;
      this.freeformOption.hidden = true;
      return;
    }

    this.freeformOption.value = value;
    this.freeformOption.hidden = false;
  }

  protected insertControl(): void {
    this.controlSlot?.assignedNodes().forEach(x => this.removeChild(x));

    if (this.type === DropdownType.combobox) {
      dropdownInputTemplate.render(this, this);
      return;
    }

    dropdownButtonTemplate.render(this, this);
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

      case 'Enter':
      case 'Tab': {
        if (this.open) {
          this.selectOption(this.activeIndex);
          if (this.multiple) {
            return true;
          }

          this.listbox.hidePopover();
          return e.key === 'Tab';
        }

        this.listbox.showPopover();
        return true;
      }

      case 'Escape': {
        this.activeIndex = this.multiple ? 0 : this.selectedIndex;
        this.listbox.hidePopover();
        return true;
      }

      default: {
        if (e.key.length === 1) {
          console.log(`Key pressed: ${e.key}`);
        }
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

    this.enabledOptions?.forEach((option, index) => {
      option.active = index === optionIndex;
    });

    if (this.open) {
      this.enabledOptions?.[optionIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }

  /**
   * Selects an option by index.
   *
   * @param index - The index of the option to select.
   * @public
   */
  public selectOption(index: number = this.selectedIndex): void {
    this.listbox.selectOption(index);
    this.control.value = this.displayValue;

    this.setValidity();

    this.updateFreeformOption();
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
        anchor ?? this.listbox.enabledOptions[0],
      );
    }
  }
}

export class Dropdown extends BaseDropdown {
  /**
   * Static property for the anchor positioning fallback observer. The observer is used to flip the listbox when it is
   * out of view.
   *
   * @remarks This is only used when the browser does not support CSS anchor positioning, and the CSS anchor polyfill is
   * not present.
   *
   * @internal
   */
  private static AnchorPositionFallbackObserver: IntersectionObserver;

  /**
   * Static property for the anchor positioning fallback style elements.
   *
   * @remarks This is only used when the browser does not support CSS anchor positioning, and the CSS anchor polyfill is
   * present.
   *
   * @internal
   */
  private static AnchorPositionFallbackStyleElements: Map<BaseDropdown, HTMLStyleElement> = new Map();

  /**
   * Static property for the anchor positioning fallback timeout reference. This is used to prevent multiple idle
   * callbacks from being scheduled when multiple dropdowns are created in quick succession.
   *
   * @remarks This is only used when the browser does not support CSS anchor positioning, and the CSS anchor polyfill is
   * present.
   *
   * @internal
   */
  private static AnchorPositionFallbackTimeout: number | null;

  /**
   * Fallback style element for anchor positioning.
   *
   * @remarks This is only used when the browser does not support CSS anchor positioning, and the CSS anchor polyfill is
   * present.
   *
   * @internal
   */
  private anchorPositionFallbackStyleElement: HTMLStyleElement | null = null;

  /**
   * Applies the `--listbox-max-height` style to the listbox based on the dropdown's position in the viewport. This
   * prevents the listbox from growing beyond the available space.
   *
   * @internal
   */
  private scrollWindowHandler = () => {
    const rect = this.getBoundingClientRect();
    if (rect.top < window.innerHeight - rect.bottom) {
      this.style.setProperty(
        '--listbox-max-height',
        `${limit(0, window.innerHeight, window.innerHeight - rect.bottom)}px`,
      );
    } else {
      this.style.setProperty('--listbox-max-height', `${limit(0, window.innerHeight, rect.top)}px`);
    }
  };

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

  connectedCallback(): void {
    super.connectedCallback();
    Updates.enqueue(() => this.setAnchorPositionFallbackStyles());
  }

  disconnectedCallback(): void {
    const styles = Dropdown.AnchorPositionFallbackStyleElements.get(this);

    if (styles) {
      styles.remove();
      Dropdown.AnchorPositionFallbackStyleElements.delete(this);
    }

    super.disconnectedCallback();
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

  /**
   * Adds or removes the window event listener based on the open state.
   *
   * @param prev - the previous open state
   * @param next - the current open state
   * @internal
   */
  public openChanged(prev: boolean | undefined, next: boolean | undefined): void {
    super.openChanged(prev, next);

    if (next) {
      Dropdown.AnchorPositionFallbackObserver?.observe(this.listbox);
      window.addEventListener('scroll', this.scrollWindowHandler, { passive: true });
      this.scrollWindowHandler();
      return;
    }

    Dropdown.AnchorPositionFallbackObserver?.unobserve(this.listbox);
    window.removeEventListener('scroll', this.scrollWindowHandler);
  }

  /**
   * Applies anchor positioning fallback styles.
   *
   * @internal
   */
  private setAnchorPositionFallbackStyles(): void {
    const anchorName = `--${this.id}`;

    if (AnchorPositioningCSSSupported) {
      return;
    }

    if (!window.CSS_ANCHOR_POLYFILL) {
      const observerCallback = (entries: IntersectionObserverEntry[]): void => {
        entries.forEach(entry => {
          const target = entry.target as Listbox;
          if (isListbox(target)) {
            if (inRange(entry.intersectionRatio, 0, 1)) {
              toggleState(
                target.dropdown?.elementInternals,
                'flip-block',
                entry.intersectionRect.bottom >= window.innerHeight,
              );
            }
          }
        });
      };

      Dropdown.AnchorPositionFallbackObserver =
        Dropdown.AnchorPositionFallbackObserver ?? new IntersectionObserver(observerCallback, { threshold: [0, 1] });

      toggleState(this.elementInternals, 'anchor-position-fallback', true);
      return;
    }

    if (Dropdown.AnchorPositionFallbackTimeout) {
      cancelIdleCallback(Dropdown.AnchorPositionFallbackTimeout);
      Dropdown.AnchorPositionFallbackTimeout = null;
    }

    this.anchorPositionFallbackStyleElement =
      this.anchorPositionFallbackStyleElement ?? document.createElement('style');

    this.anchorPositionFallbackStyleElement.textContent = /* css */ `
      #${this.id} { anchor-name: ${anchorName}; }

      #${this.listbox.id} {
        position-anchor: ${anchorName};
        top: anchor(bottom);
        left: anchor(left);
        position-try-fallbacks: block-start, flip-inline, flip-block;
        max-height: var(--listbox-max-height, calc(100vh - anchor-size(self-block)));
        min-width: anchor-size(width);
      }
    `;

    Dropdown.AnchorPositionFallbackStyleElements.set(this, this.anchorPositionFallbackStyleElement);

    Dropdown.AnchorPositionFallbackTimeout = requestIdleCallback(
      () => {
        const styleElements: HTMLStyleElement[] = [];
        Dropdown.AnchorPositionFallbackStyleElements.forEach(styleElement => {
          const element = styleElement.cloneNode(true) as HTMLStyleElement;
          (document.head ?? document.body).append(element);
          styleElements.push(element);
        });

        (window as any).CSS_ANCHOR_POLYFILL({
          elements: styleElements,
        });
      },
      { timeout: 100 },
    );
  }
}
