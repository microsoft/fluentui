import { BaseDropdown } from './dropdown.base.js';
import type { DropdownAppearance, DropdownSize } from './dropdown.options.js';

/**
 * The Fluent Dropdown Element. Implements {@link @microsoft/fast-foundation#BaseDropdown}.
 *
 * @tag fluent-dropdown
 *
 * @slot - The default slot. Accepts a {@link (Listbox:class)} element.
 * @slot indicator - The indicator slot.
 * @slot control - The control slot. This slot is automatically populated and should not be manually manipulated.
 *
 * @presentational {DropdownAppearance} [appearance=outline] - The appearance of the dropdown.
 * @presentational {DropdownSize} [size=medium] - The size of the dropdown.
 *
 * @public
 */
export class Dropdown extends BaseDropdown {}
