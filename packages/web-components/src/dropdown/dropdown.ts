import { attr, css, Observable, Updates } from '@microsoft/fast-element';
import { FASTListboxOption, FASTSelect } from '@microsoft/fast-foundation';
import { colorNeutralForeground1, colorNeutralForeground3 } from '../theme/design-tokens.js';
import { DropdownAppearance, DropdownControlSizes } from './dropdown.options.js';

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
  public styleSizes?: DropdownControlSizes;

  @attr({ attribute: 'placeholder' })
  public placeholder: string = '';

  public get collapsible(): boolean {
    return true;
  }

  public get displayValue(): string {
    Observable.track(this, 'displayValue');
    if ((this.selectedOptions.length == 0 || this.selectedIndex == -1) && this.placeholder) {
      Updates.enqueue(() => {
        this.$fastController.addStyles(css`
          :host {
            --placeholder-visible: ${colorNeutralForeground3};
          }
        `);
      });
      this.currentValue = '';
      return this.placeholder;
    }
    if (this.multiple) {
      Updates.enqueue(() => {
        this.$fastController.addStyles(css`
          :host {
            --placeholder-visible: ${colorNeutralForeground1};
          }
        `);
      });
      const selectedOptionsText = this.selectedOptions.map(option => option.text);
      this.currentValue = this.firstSelectedOption?.text;
      return selectedOptionsText.join(', ') || '';
    } else {
      Updates.enqueue(() => {
        this.$fastController.addStyles(css`
          :host {
            --placeholder-visible: ${colorNeutralForeground1};
          }
        `);
      });
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

  private prevSelectedOption?: FASTListboxOption;

  public handleOptionSelection(e: CustomEvent) {
    const selectedOption = e.target as FASTListboxOption;
    if (selectedOption.disabled) {
      return;
    }

    const dataSelectedAttribute = 'data-selected';

    if (selectedOption instanceof FASTListboxOption) {
      if (this.multiple) {
        const isSelected = selectedOption.hasAttribute(dataSelectedAttribute);

        // Toggle the data-selected attribute on the clicked option
        selectedOption.toggleAttribute(dataSelectedAttribute, !isSelected);
      } else {
        // Remove data-selected from previously selected option
        const prevSelectedOption = this.options.find(option => option.hasAttribute(dataSelectedAttribute));
        if (prevSelectedOption && prevSelectedOption !== selectedOption) {
          prevSelectedOption.removeAttribute(dataSelectedAttribute);
        }

        // Toggle data-selected for the clicked option
        selectedOption.setAttribute(dataSelectedAttribute, '');

        this.prevSelectedOption = selectedOption;
      }

      // Prevent the fluent-dropdown element from receiving the attribute
      this.removeAttribute(dataSelectedAttribute);
    }

    if (this.multiple) {
      this.open = true;
    }
  }

  public clickHandler(e: MouseEvent): boolean | void {
    super.clickHandler(e);
    this.handleOptionSelection(e);
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
