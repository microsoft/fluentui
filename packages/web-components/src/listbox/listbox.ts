import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import type { BaseDropdown } from '../dropdown/dropdown.base.js';
import type { DropdownOption } from '../option/option.js';
import { isDropdownOption } from '../option/option.options.js';
import { toggleState } from '../utils/element-internals.js';
import { waitForConnectedDescendants } from '../utils/request-idle-callback.js';
import { uniqueId } from '../utils/unique-id.js';

/**
 * A Listbox Custom HTML Element.
 * Implements the {@link https://w3c.github.io/aria/#listbox | ARIA listbox } role.
 *
 * @tag fluent-listbox
 *
 * @slot - The default slot for the options.
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
   * Updates the multiple selection state of the listbox and its options.
   *
   * @param prev - the previous multiple value
   * @param next - the current multiple value
   */
  public multipleChanged(prev: boolean | undefined, next: boolean | undefined): void {
    this.elementInternals.ariaMultiSelectable = next ? 'true' : 'false';
    toggleState(this.elementInternals, 'multiple', next);
    Updates.enqueue(() => {
      this.options.forEach(x => {
        x.multiple = !!next;
      });
    });
  }

  /**
   * The collection of all child options.
   *
   * @public
   */
  @observable
  public options!: DropdownOption[];

  /**
   * Updates the enabled options collection when properties on the child options change.
   *
   * @param prev - the previous options
   * @param next - the current options
   *
   * @internal
   */
  public optionsChanged(prev: DropdownOption[] | undefined, next: DropdownOption[] | undefined): void {
    next?.forEach((option, index) => {
      option.elementInternals.ariaPosInSet = `${index + 1}`;
      option.elementInternals.ariaSetSize = `${next.length}`;
    });
  }

  /**
   * The index of the first selected and enabled option.
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
   * Handles the `beforetoggle` event on the listbox.
   *
   * @param e - the toggle event
   * @returns true to allow the default popover behavior, undefined to prevent it
   * @internal
   */
  public beforetoggleHandler(e: ToggleEvent): boolean | undefined {
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
   * The collection of child options that are not disabled.
   *
   * @internal
   */
  public get enabledOptions(): DropdownOption[] {
    return this.options?.filter(x => !x.disabled) ?? [];
  }

  /**
   * The collection of child options that are selected.
   *
   * @public
   */
  public get selectedOptions(): DropdownOption[] {
    return this.options?.filter(x => x.selected) ?? [];
  }

  /**
   * Sets the `selected` state on a target option when clicked.
   *
   * @param e - The pointer event
   * @public
   */
  public clickHandler(e: PointerEvent): boolean | void {
    if (this.dropdown) {
      return true;
    }

    const target = e.target as HTMLElement;

    if (isDropdownOption(target)) {
      this.selectOption(this.enabledOptions.indexOf(target));
    }

    return true;
  }

  constructor() {
    super();

    this.elementInternals.role = 'listbox';
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
    if (propertyName === 'multiple') {
      this.multiple = source.multiple;
      return;
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

  /**
   * Handles the `slotchange` event for the default slot.
   * Sets the `options` property to the list of slotted options.
   *
   * @param e - The slotchange event
   * @public
   */
  public slotchangeHandler(e: Event): void {
    const target = e.target as HTMLSlotElement;
    waitForConnectedDescendants(this, () => {
      const options = target
        .assignedElements()
        .filter<DropdownOption>((option): option is DropdownOption => isDropdownOption(option));

      this.options = options;
    });
  }
}
