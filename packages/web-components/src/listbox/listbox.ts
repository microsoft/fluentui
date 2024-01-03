import { attr, FASTElement, observable, Observable } from '@microsoft/fast-element';
import {
  findLastIndex,
  keyArrowDown,
  keyArrowUp,
  keyEnd,
  keyEnter,
  keyEscape,
  keyHome,
  keySpace,
  keyTab,
  uniqueId,
} from '@microsoft/fast-web-utilities';
import { FASTListboxOption, isListboxOption } from '../listbox-option/listbox-option.js';
import { ARIAGlobalStatesAndProperties } from '../patterns/index.js';
import { applyMixins } from '../utils/apply-mixins.js';

/**
 * A Listbox Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#listbox | ARIA listbox }.
 *
 * @slot - The default slot for the listbox options
 *
 * @public
 */
export abstract class FASTListbox extends FASTElement {
  /**
   * The internal unfiltered list of selectable options.
   *
   * @internal
   */
  protected _options: FASTListboxOption[] = [];

  /**
   * The first selected option.
   *
   * @internal
   */
  public get firstSelectedOption(): FASTListboxOption {
    return this.selectedOptions[0] ?? null;
  }

  /**
   * Returns true if there is one or more selectable option.
   *
   * @internal
   */
  protected get hasSelectableOptions(): boolean {
    return this.options.length > 0 && !this.options.every(o => o.disabled);
  }

  /**
   * The number of options.
   *
   * @public
   */
  public get length(): number {
    return this.options?.length ?? 0;
  }

  /**
   * The list of options.
   *
   * @public
   */
  public get options(): FASTListboxOption[] {
    Observable.track(this, 'options');
    return this._options;
  }

  public set options(value: FASTListboxOption[]) {
    this._options = value;
    Observable.notify(this, 'options');
  }

  /**
   * Flag for the typeahead timeout expiration.
   *
   * @deprecated use `Listbox.typeaheadExpired`
   * @internal
   */
  protected get typeAheadExpired(): boolean {
    return this.typeaheadExpired;
  }

  protected set typeAheadExpired(value: boolean) {
    this.typeaheadExpired = value;
  }

  /**
   * The disabled state of the listbox.
   *
   * @public
   * @remarks
   * HTML Attribute: `disabled`
   */
  @attr({ mode: 'boolean' })
  public disabled?: boolean;

  /**
   * The index of the selected option.
   *
   * @public
   */
  @observable
  public selectedIndex: number = -1;

  /**
   * A collection of the selected options.
   *
   * @public
   */
  @observable
  public selectedOptions: FASTListboxOption[] = [];

  /**
   * A standard `click` event creates a `focus` event before firing, so a
   * `mousedown` event is used to skip that initial focus.
   *
   * @internal
   */
  protected shouldSkipFocus: boolean = false;

  /**
   * A static filter to include only selectable options.
   *
   * @param n - element to filter
   * @public
   */
  public static slottedOptionFilter(n: HTMLElement) {
    return isListboxOption(n) && !n.hidden;
  }

  /**
   * The default slotted elements.
   *
   * @internal
   */
  @observable
  public slottedOptions: Element[] = [];

  /**
   * Typeahead timeout in milliseconds.
   *
   * @internal
   */
  protected static readonly TYPE_AHEAD_TIMEOUT_MS = 1000;

  /**
   * The current typeahead buffer string.
   *
   * @internal
   */
  @observable
  protected typeaheadBuffer: string = '';

  /**
   * Flag for the typeahead timeout expiration.
   *
   * @internal
   */
  protected typeaheadExpired: boolean = true;

  /**
   * The timeout ID for the typeahead handler.
   *
   * @internal
   */
  protected typeaheadTimeout: number = -1;

  /**
   * Handle click events for listbox options.
   *
   * @internal
   */
  public clickHandler(e: MouseEvent): boolean | void {
    const captured = (e.target as HTMLElement).closest(`option,[role=option]`) as FASTListboxOption;

    if (captured && !captured.disabled) {
      this.selectedIndex = this.options.indexOf(captured);
      return true;
    }
  }

  /**
   * Ensures that the provided option is focused and scrolled into view.
   *
   * @param optionToFocus - The option to focus
   * @internal
   */
  protected focusAndScrollOptionIntoView(optionToFocus: FASTListboxOption | null = this.firstSelectedOption): void {
    // To ensure that the browser handles both `focus()` and `scrollIntoView()`, the
    // timing here needs to guarantee that they happen on different frames. Since this
    // function is typically called from the `openChanged` observer, `DOM.queueUpdate`
    // causes the calls to be grouped into the same frame. To prevent this,
    // `requestAnimationFrame` is used instead of `DOM.queueUpdate`.
    if (this.contains(document.activeElement) && optionToFocus !== null) {
      optionToFocus.focus();
      requestAnimationFrame(() => {
        optionToFocus.scrollIntoView({ block: 'nearest' });
      });
    }
  }

  /**
   * Handles `focusin` actions for the component. When the component receives focus,
   * the list of selected options is refreshed and the first selected option is scrolled
   * into view.
   *
   * @internal
   */
  public focusinHandler(e: FocusEvent): void {
    if (!this.shouldSkipFocus && e.target === e.currentTarget) {
      this.setSelectedOptions();
      this.focusAndScrollOptionIntoView();
    }

    this.shouldSkipFocus = false;
  }

  /**
   * Returns the options which match the current typeahead buffer.
   *
   * @internal
   */
  protected getTypeaheadMatches(): FASTListboxOption[] {
    const pattern = this.typeaheadBuffer.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`^${pattern}`, 'gi');
    return this.options.filter((o: FASTListboxOption) => o.text.trim().match(re));
  }

  /**
   * Determines the index of the next option which is selectable, if any.
   *
   * @param prev - the previous selected index
   * @param next - the next index to select
   *
   * @internal
   */
  protected getSelectableIndex(prev: number = this.selectedIndex, next: number) {
    const direction = prev > next ? -1 : prev < next ? 1 : 0;
    const potentialDirection = prev + direction;

    let nextSelectableOption: FASTListboxOption | null = null;

    switch (direction) {
      case -1: {
        nextSelectableOption = this.options.reduceRight(
          (nextSelectableOption: FASTListboxOption | null, thisOption, index) =>
            !nextSelectableOption && !thisOption.disabled && index < potentialDirection
              ? thisOption
              : nextSelectableOption,
          null,
        );
        break;
      }

      case 1: {
        nextSelectableOption = this.options.reduce(
          (nextSelectableOption: FASTListboxOption | null, thisOption, index) =>
            !nextSelectableOption && !thisOption.disabled && index > potentialDirection
              ? thisOption
              : nextSelectableOption,
          nextSelectableOption,
        );
        break;
      }
    }

    return this.options.indexOf(nextSelectableOption as any);
  }

  /**
   * Handles external changes to child options.
   *
   * @param source - the source object
   * @param propertyName - the property
   *
   * @internal
   */
  public handleChange(source: any, propertyName: string) {
    switch (propertyName) {
      case 'selected': {
        if (FASTListbox.slottedOptionFilter(source)) {
          this.selectedIndex = this.options.indexOf(source);
        }
        this.setSelectedOptions();
        break;
      }
    }
  }

  /**
   * Moves focus to an option whose label matches characters typed by the user.
   * Consecutive keystrokes are batched into a buffer of search text used
   * to match against the set of options.  If `TYPE_AHEAD_TIMEOUT_MS` passes
   * between consecutive keystrokes, the search restarts.
   *
   * @param key - the key to be evaluated
   *
   * @internal
   */
  public handleTypeAhead(key: string): void {
    if (this.typeaheadTimeout) {
      window.clearTimeout(this.typeaheadTimeout);
    }

    this.typeaheadTimeout = window.setTimeout(() => (this.typeaheadExpired = true), FASTListbox.TYPE_AHEAD_TIMEOUT_MS);

    if (key.length > 1) {
      return;
    }

    this.typeaheadBuffer = `${this.typeaheadExpired ? '' : this.typeaheadBuffer}${key}`;
  }

  /**
   * Handles `keydown` actions for listbox navigation and typeahead.
   *
   * @internal
   */
  public keydownHandler(e: KeyboardEvent): boolean | void {
    if (this.disabled) {
      return true;
    }

    this.shouldSkipFocus = false;

    const key = e.key;

    switch (key) {
      // Select the first available option
      case keyHome: {
        if (!e.shiftKey) {
          e.preventDefault();
          this.selectFirstOption();
        }
        break;
      }

      // Select the next selectable option
      case keyArrowDown: {
        if (!e.shiftKey) {
          e.preventDefault();
          this.selectNextOption();
        }
        break;
      }

      // Select the previous selectable option
      case keyArrowUp: {
        if (!e.shiftKey) {
          e.preventDefault();
          this.selectPreviousOption();
        }
        break;
      }

      // Select the last available option
      case keyEnd: {
        e.preventDefault();
        this.selectLastOption();
        break;
      }

      case keyTab: {
        this.focusAndScrollOptionIntoView();
        return true;
      }

      case keyEnter:
      case keyEscape: {
        return true;
      }

      case keySpace: {
        if (this.typeaheadExpired) {
          return true;
        }
      }

      // Send key to Typeahead handler
      default: {
        if (key.length === 1) {
          this.handleTypeAhead(`${key}`);
        }
        return true;
      }
    }
  }

  /**
   * Prevents `focusin` events from firing before `click` events when the
   * element is unfocused.
   *
   * @internal
   */
  public mousedownHandler(e: MouseEvent): boolean | void {
    this.shouldSkipFocus = !this.contains(document.activeElement);
    return true;
  }

  /**
   * Switches between single-selection and multi-selection mode.
   *
   * @param prev - the previous value of the `multiple` attribute
   * @param next - the next value of the `multiple` attribute
   *
   * @internal
   */
  public multipleChanged(prev: boolean | undefined, next: boolean): void {
    this.ariaMultiSelectable = next ? 'true' : null;
  }

  /**
   * Updates the list of selected options when the `selectedIndex` changes.
   *
   * @param prev - the previous selected index value
   * @param next - the current selected index value
   *
   * @internal
   */
  public selectedIndexChanged(prev: number | undefined, next: number): void {
    if (!this.hasSelectableOptions) {
      this.selectedIndex = -1;
      return;
    }

    if (this.options[this.selectedIndex]?.disabled && typeof prev === 'number') {
      const selectableIndex = this.getSelectableIndex(prev, next);
      const newNext = selectableIndex > -1 ? selectableIndex : prev;
      this.selectedIndex = newNext;
      if (next === newNext) {
        this.selectedIndexChanged(next, newNext);
      }
      return;
    }

    this.setSelectedOptions();
  }

  /**
   * Updates the selectedness of each option when the list of selected options changes.
   *
   * @param prev - the previous list of selected options
   * @param next - the current list of selected options
   *
   * @internal
   */
  protected selectedOptionsChanged(prev: FASTListboxOption[] | undefined, next: FASTListboxOption[]): void {
    const filteredNext = next.filter(FASTListbox.slottedOptionFilter);
    this.options?.forEach(o => {
      const notifier = Observable.getNotifier(o);
      notifier.unsubscribe(this, 'selected');
      o.selected = filteredNext.includes(o);
      notifier.subscribe(this, 'selected');
    });
  }

  /**
   * Moves focus to the first selectable option.
   *
   * @public
   */
  public selectFirstOption(): void {
    if (!this.disabled) {
      this.selectedIndex = this.options?.findIndex(o => !o.disabled) ?? -1;
    }
  }

  /**
   * Moves focus to the last selectable option.
   *
   * @internal
   */
  public selectLastOption(): void {
    if (!this.disabled) {
      this.selectedIndex = findLastIndex(this.options, o => !o.disabled);
    }
  }

  /**
   * Moves focus to the next selectable option.
   *
   * @internal
   */
  public selectNextOption(): void {
    if (!this.disabled && this.selectedIndex < this.options.length - 1) {
      this.selectedIndex += 1;
    }
  }

  /**
   * Moves focus to the previous selectable option.
   *
   * @internal
   */
  public selectPreviousOption(): void {
    if (!this.disabled && this.selectedIndex > 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
  }

  /**
   * Updates the selected index to match the first selected option.
   *
   * @internal
   */
  protected setDefaultSelectedOption() {
    this.selectedIndex = this.options?.findIndex(el => el.defaultSelected) ?? -1;
  }

  /**
   * Sets an option as selected and gives it focus.
   *
   * @public
   */
  protected setSelectedOptions() {
    if (this.options?.length) {
      this.selectedOptions = [this.options[this.selectedIndex]];
      this.ariaActiveDescendant = this.firstSelectedOption?.id ?? '';
      this.focusAndScrollOptionIntoView();
    }
  }

  /**
   * Updates the list of options and resets the selected option when the slotted option content changes.
   *
   * @param prev - the previous list of slotted options
   * @param next - the current list of slotted options
   *
   * @internal
   */
  public slottedOptionsChanged(prev: Element[] | undefined, next: Element[]) {
    this.options = next.reduce<FASTListboxOption[]>((options, item) => {
      if (isListboxOption(item)) {
        options.push(item);
      }
      return options;
    }, []);

    const setSize = `${this.options.length}`;
    this.options.forEach((option, index) => {
      if (!option.id) {
        option.id = uniqueId('option-');
      }
      option.ariaPosInSet = `${index + 1}`;
      option.ariaSetSize = setSize;
    });

    if (this.$fastController.isConnected) {
      this.setSelectedOptions();
      this.setDefaultSelectedOption();
    }
  }

  /**
   * Updates the filtered list of options when the typeahead buffer changes.
   *
   * @param prev - the previous typeahead buffer value
   * @param next - the current typeahead buffer value
   *
   * @internal
   */
  public typeaheadBufferChanged(prev: string, next: string): void {
    if (this.$fastController.isConnected) {
      const typeaheadMatches = this.getTypeaheadMatches();

      if (typeaheadMatches.length) {
        const selectedIndex = this.options.indexOf(typeaheadMatches[0]);
        if (selectedIndex > -1) {
          this.selectedIndex = selectedIndex;
        }
      }

      this.typeaheadExpired = false;
    }
  }
}

/**
 * Includes ARIA states and properties relating to the ARIA listbox role
 *
 * @public
 */
export class DelegatesARIAListbox {
  /**
   * See {@link https://www.w3.org/TR/wai-aria-1.2/#listbox} for more information
   * @public
   * @remarks
   * HTML Attribute: `aria-activedescendant`
   */
  @observable
  public ariaActiveDescendant?: string | null;

  /**
   * See {@link https://www.w3.org/TR/wai-aria-1.2/#listbox} for more information
   * @public
   * @remarks
   * HTML Attribute: `aria-disabled`
   */
  @observable
  public ariaDisabled?: 'true' | 'false' | string | null;

  /**
   * See {@link https://www.w3.org/TR/wai-aria-1.2/#listbox} for more information
   * @public
   * @remarks
   * HTML Attribute: `aria-expanded`
   */
  @observable
  public ariaExpanded?: 'true' | 'false' | string | null;

  /**
   * See {@link https://w3c.github.io/aria/#listbox} for more information
   * @public
   * @remarks
   * HTML Attribute: `aria-multiselectable`
   */
  @observable
  public ariaMultiSelectable?: 'true' | 'false' | string | null;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
/* eslint-disable-next-line */
export interface DelegatesARIAListbox extends ARIAGlobalStatesAndProperties {}
applyMixins(DelegatesARIAListbox, ARIAGlobalStatesAndProperties);

/**
 * @internal
 */
export interface FASTListbox extends DelegatesARIAListbox {}
applyMixins(FASTListbox, DelegatesARIAListbox);
