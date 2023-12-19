import { ElementStyles, attr } from '@microsoft/fast-element';
import { FASTSelect } from '@microsoft/fast-foundation';
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

  /**
   * Handles the change in size property.
   * @param oldValue - The previous value of the size property.
   * @param newValue - The new value of the size property.
   */
  public controlSizeChanged(oldValue: number, newValue: number): void {
    if (oldValue !== newValue) {
      this.styles = css/**css*/ `
        :host {
          --size: ${this.controlSize};
        }
      `;
      this.$fastController.addStyles(this.styles);
    }
  }
}
