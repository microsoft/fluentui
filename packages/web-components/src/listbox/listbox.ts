import { attr, FASTElement, Notifier, Observable, observable } from '@microsoft/fast-element';
import type { BaseDropdown } from '../dropdown/dropdown.js';
import { isDropdown } from '../dropdown/dropdown.options.js';
import type { Option } from '../option/option.js';
import { isOption } from '../option/option.options.js';
import { toggleState } from '../utils/element-internals.js';
import { uniqueId } from '../utils/unique-id.js';

/**
 * A Listbox Custom HTML Element.
 * Implements the {@link https://w3c.github.io/aria/#listbox | ARIA listbox } role.
 *
 * @slot default - The default slot for the options
 *
 * @remarks
 * The listbox component represents a list of options that can be selected.
 * It is intended to be used in conjunction with the {@link BaseDropdown | Dropdown} component.
 *
 * @public
 */
export class Listbox extends FASTElement {
  /**
   * Sets the listbox ID to a unique value if one is not provided.
   *
   * @override
   * @public
   * @remarks
   * HTML Attribute: `id`
   */
  @attr({ attribute: 'id', mode: 'fromView' })
  public override id: string = uniqueId('listbox-');

  /**
   * Indicates whether the listbox allows multiple selection.
   *
   * @public
   */
  @observable
  public multiple?: boolean;

  /**
   * The collection of all child options.
   *
   * @public
   */
  @observable
  public options!: Option[];

  /**
   * Updates the enabled options collection when properties on the child options change.
   *
   * @param prev - the previous options
   * @param next - the current options
   *
   * @internal
   */
  public optionsChanged(prev: Option[] | undefined, next: Option[] | undefined): void {
    next?.forEach((option, index) => {
      option.elementInternals.ariaPosInSet = `${index + 1}`;
      option.elementInternals.ariaSetSize = `${next.length}`;
    });
  }

  /**
   * The index of the first selected option, scoped to the enabled options.
   *
   * @internal
   */
  @observable
  public selectedIndex!: number;

  /**
   * Reference to the parent dropdown element.
   * @internal
   */
  @observable
  public dropdown?: BaseDropdown;

  /**
   * Updates notifier subscriptions and event listeners when the dropdown property changes.
   *
   * @param prev - the previous dropdown
   * @param next - the current dropdown
   * @internal
   */
  public dropdownChanged(prev: BaseDropdown | undefined, next: BaseDropdown | undefined): void {
    if (!next) {
      return;
    }

    this.parentNotifier = Observable.getNotifier(this.dropdown);
    this.parentNotifier.subscribe(this);

    for (const key of ['disabled', 'multiple', 'listboxSlot']) {
      this.parentNotifier.notify(key);
    }
  }

  public beforetoggleHandler(e: ToggleEvent): boolean | void {
    if (!this.dropdown) {
      return true;
    }

    if (this.dropdown.disabled) {
      this.dropdown.open = false;
      return;
    }

    this.dropdown.open = e.newState === 'open';
    return true;
  }

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * A collection of child options that are not disabled.
   *
   * @internal
   */
  public get enabledOptions(): Option[] {
    return this.options?.filter(x => !x.disabled) ?? [];
  }

  /**
   * Notifier for the listbox.
   * @internal
   */
  private notifier!: Notifier;

  /**
   * Notifier for the parent dropdown.
   * @internal
   */
  private parentNotifier!: Notifier;

  /**
   * The collection of child options that are selected.
   *
   * @public
   */
  public get selectedOptions(): Option[] {
    return this.options?.filter(x => x.selected) ?? [];
  }

  /**
   * Sets the `selected` state on a target option when clicked.
   *
   * @param e - The pointer event
   * @public
   */
  public clickHandler(e: PointerEvent): boolean | void {
    const target = e.target as HTMLElement;

    if (isOption(target)) {
      this.selectOption(this.enabledOptions.indexOf(target));
    }

    return true;
  }

  constructor() {
    super();

    this.elementInternals.role = 'listbox';

    this.notifier = Observable.getNotifier(this);
    this.notifier.subscribe(this);
  }

  connectedCallback(): void {
    super.connectedCallback();

    if (isDropdown(this.parentElement)) {
      this.dropdown = this.parentElement;
    }
  }

  disconnectedCallback(): void {
    this.parentNotifier?.unsubscribe(this);
    Observable.getNotifier(this).unsubscribe(this);

    super.disconnectedCallback();
  }

  /**
   * Handles observable subscriptions for the listbox.
   *
   * @param source - The source of the observed change
   * @param propertyName - The name of the property that changed
   *
   * @internal
   */
  handleChange(source: any, propertyName?: string): void {
    switch (propertyName) {
      case 'multiple': {
        this.multiple = source.multiple;
        this.elementInternals.ariaMultiSelectable = this.multiple ? 'true' : 'false';
        toggleState(this.elementInternals, 'multiple', this.multiple);
        this.options?.forEach(x => toggleState(x.elementInternals, 'multiple', this.multiple));

        break;
      }

      case 'listboxSlot': {
        if (this.dropdown) {
          this.dropdown.listbox = this;
          this.dropdown.listboxSlot.assign(this);
        }

        break;
      }
    }
  }

  /**
   * Selects an option by index.
   *
   * @param index - The index of the option to select.
   * @public
   */
  public selectOption(index: number = this.selectedIndex): void {
    let selectedIndex = this.selectedIndex;

    if (!this.multiple) {
      this.enabledOptions.forEach((item, i) => {
        const shouldCheck = i === index;
        item.selected = shouldCheck;
        if (shouldCheck) {
          selectedIndex = i;
        }
      });
    } else {
      const option = this.enabledOptions[index];
      if (option) {
        option.selected = !option.selected;
      }
      selectedIndex = index;
    }

    this.selectedIndex = selectedIndex;
  }
}
