import { attr } from '@microsoft/fast-element';
import { FASTSelect } from '@microsoft/fast-foundation';
import { DropdownStyleSizes } from './dropdown.options.js';

/**
 * @class Dropdown component
 *
 * @remarks
 * This class extends the FASTSelect.
 */
export class Dropdown extends FASTSelect {
  /**
   * Style Sizes
   *
   * @public
   * @remarks
   * HTML attribute: style-sizes.
   */
  @attr({ attribute: 'style-sizes' })
  public styleSizes?: DropdownStyleSizes;

  protected sizeChanged(prev: number | undefined, next: number): void {
    super.sizeChanged(prev, next);
    this.updateComputedStylesheet();
  }

  /**
   * Updates an internal stylesheet with calculated CSS custom properties.
   *
   * @internal
   */
  protected updateComputedStylesheet(): void {
    this.style.setProperty('--size', `${this.size}`);
  }
}
