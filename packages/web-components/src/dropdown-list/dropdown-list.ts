import { attr, FASTElement, observable } from '@microsoft/fast-element';

import { toggleState } from '../utils/element-internals.js';
import type { Option } from '../option/option.js';

/**
 * Base class for a DropdownList custom element.
 *
 * @public
 */
export class BaseDropdownList extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  @attr({ mode: 'boolean' })
  public multiple = false;
  protected multipleChanged() {
    this.elementInternals.ariaMultiSelectable = this.multiple.toString();

    if (this.$fastController.isConnected) {
      this.toggleOptionsMultipleState();
    }
  }

  /**
   * @internal
   */
  @observable
  public slottedOptions!: Option[];
  protected slottedOptionsChanged() {
    this.toggleOptionsMultipleState();
  }

  /**
   * The option elements.
   *
   * @readonly
   * @public
   */
  public get options(): Option[] {
    return this.slottedOptions;
  }

  constructor() {
    super();
    this.elementInternals.role = 'listbox';
  }

  private toggleOptionsMultipleState() {
    for (const option of this.options) {
      if (!option.elementInternals) {
        continue;
      }
      toggleState(option.elementInternals, 'multiple', this.multiple);
    }
  }
}

/**
 * A DropdownList custom element.
 *
 * @public
 */
export class DropdownList extends BaseDropdownList {}
