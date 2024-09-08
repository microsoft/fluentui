import { attr } from '@microsoft/fast-element';
import { toggleState } from '../utils/element-internals.js';
import { AbstractCombobox } from '../patterns/abstract-combobox.js';
import { DropdownAppearance, DropdownSize } from './dropdown.options.js';

/**
 * Base class for a Dropdown custom element.
 *
 * @slot trigger-indicator
 *
 * @public
 */
export class BaseDropdown extends AbstractCombobox {}

/**
 * A Dropdown custom element.
 *
 * @public
 */
export class Dropdown extends BaseDropdown {
  /**
   * Indicates the visual appearance of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: `appearance`
   */
  @attr({ mode: 'fromView' })
  public appearance: DropdownAppearance = DropdownAppearance.outline;
  protected appearanceChanged(prev: DropdownAppearance | undefined, next: DropdownAppearance | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }

    if (!next || !Array.from(Object.values(DropdownAppearance)).includes(next)) {
      toggleState(this.elementInternals, DropdownAppearance.outline, true);
    } else {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * Sets the element's block state.
   *
   * @public
   * @remarks
   * HTML Attribute: `block`
   */
  @attr({ mode: 'boolean' })
  public block = false;
  protected blockChanged() {
    toggleState(this.elementInternals, 'block', this.block);
  }

  /**
   * Sets the size of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `size`
   */
  @attr({ mode: 'fromView' })
  public size: DropdownSize = DropdownSize.medium;
  protected sizeChanged(prev: DropdownSize | undefined, next: DropdownSize | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }

    if (!next || !Array.from(Object.values(DropdownSize)).includes(next)) {
      toggleState(this.elementInternals, DropdownSize.medium, true);
    } else {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }
}
