import { attr } from '@microsoft/fast-element';
import { swapStates } from '../utils/element-internals.js';
import { BaseDropdown } from './dropdown.base.js';
import { DropdownAppearance, DropdownSize } from './dropdown.options.js';

/**
 * The Fluent Dropdown Element. Implements {@link @microsoft/fast-foundation#BaseDropdown}.
 *
 * @tag fluent-dropdown
 * 
 * @slot - The default slot. Accepts a {@link (Listbox:class)} element.
 * @slot indicator - The indicator slot.
 * @slot control - The control slot. This slot is automatically populated and should not be manually manipulated.
 *
 */
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
}
