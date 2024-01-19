import { attr, ElementStyles } from '@microsoft/fast-element';
import { FASTSelect } from '../select/select.js';
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
}
