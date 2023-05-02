import { attr, Observable } from '@microsoft/fast-element';
import { FASTListboxOption, FASTSelect } from '@microsoft/fast-foundation';
import { DropdownControlSizes } from './dropdown.options.js';

/**
 * @class Dropdown component
 *
 * @remarks
 * This class extends the FASTSelect.
 */
export class Dropdown extends FASTSelect {
  /**
   * Control Size
   *
   * @public
   * @remarks
   * HTML attribute: control-size
   */
  @attr({ attribute: 'control-size' })
  public styleSizes?: DropdownControlSizes;

  @attr({ attribute: 'placeholder' })
  public placeholder: string = '';

  public get displayValue(): string {
    Observable.track(this, 'displayValue');
    if (this.selectedIndex === -1) {
      return this.placeholder;
    }
    if (this.multiple) {
      const selectedOptionsText = this.selectedOptions.map(option => option.text);
      return selectedOptionsText.join(', ') || '';
    } else {
      return this.firstSelectedOption?.text ?? '';
    }
  }

  protected setDefaultSelectedOption(): void {
    const options: FASTListboxOption[] =
      this.options ?? Array.from(this.children).filter(el => (el as HTMLElement)?.tagName === 'fluent-option');

    const selectedIndex = options?.findIndex(
      el => el.hasAttribute('selected') || el.selected || el.value === this.value,
    );

    if (selectedIndex !== -1) {
      this.selectedIndex = selectedIndex;
      return;
    }

    this.selectedIndex = -1;
  }

  public sizeChanged(prev: number | undefined, next: number): void {
    super.sizeChanged(prev, next);
    this.updateComputedStylesheet();
  }

  /**
   * Updates an internal stylesheet with calculated CSS custom properties.
   *
   * @internal
   */
  private updateComputedStylesheet(): void {
    if (typeof this.size === 'number') {
      this.style.setProperty('--size', `${this.size}`);
    }
  }
}
