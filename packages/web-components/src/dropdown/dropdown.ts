import { attr } from '@microsoft/fast-element';
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
 * @public
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
   * The size of the dropdown.
   * @public
   * @remarks
   * HTML Attribute: `size`
   */
  @attr
  public size?: DropdownSize;
}
