import { attr, ElementStyles } from '@microsoft/fast-element';
import { FASTSelect } from '@microsoft/fast-foundation/select.js';
import { DropdownAppearance, DropdownControlSize } from './dropdown.options.js';

/**
 * @class Dropdown component
 *
 * @remarks
 * This class extends the FASTSelect.
 */
export class Dropdown extends FASTSelect {
  /**
   * Appearance
   *
   * @public
   * @remarks
   * HTML attribute: control-size
   */
  @attr
  public appearance?: DropdownAppearance;

  /**
   * Control Size
   *
   * @public
   * @remarks
   * HTML attribute: control-size
   */
  @attr({ attribute: 'control-size' })
  public controlSize?: DropdownControlSize;

  /**
   * styles
   * used in the class for storing the css variables
   */
  private styles: ElementStyles | undefined;

  /**
   * Overrides the default behavior of the Select class.
   * The dropdown will always be collapsible.
   *
   * @returns {boolean} - Whether the dropdown is collapsible.
   */
  public get collapsible(): boolean {
    return true;
  }
}
