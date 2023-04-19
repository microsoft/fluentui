import { Observable, attr } from '@microsoft/fast-element';
import { FASTSelect } from '@microsoft/fast-foundation';

/**
 * @class Dropdown component
 *
 * @remarks
 * This class extends the FASTSelect.
 */
export class Dropdown extends FASTSelect {
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
