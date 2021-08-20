import { attr } from '@microsoft/fast-element';
import { Combobox as FoundationCombobox, comboboxTemplate as template } from '@microsoft/fast-foundation';
import { comboboxStyles as styles } from './combobox.styles';
import type { ComboboxOptions } from '@microsoft/fast-foundation';
import type { SelectAppearance } from '../select';

/**
 * Combobox appearances
 * @public
 */
export type ComboboxAppearance = SelectAppearance;

/**
 * The Fluent combobox class
 * @internal
 */
export class Combobox extends FoundationCombobox {
  /**
   * The appearance of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr({ mode: 'fromView' })
  public appearance: ComboboxAppearance;

  /**
   * @internal
   */
  public appearanceChanged(oldValue: ComboboxAppearance, newValue: ComboboxAppearance): void {
    if (oldValue !== newValue) {
      this.classList.add(newValue);
      this.classList.remove(oldValue);
    }
  }

  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();

    if (!this.appearance) {
      this.appearance = 'outline';
    }
  }
}

/**
 * The Fluent Combobox Custom Element. Implements {@link @microsoft/fast-foundation#Combobox},
 * {@link @microsoft/fast-foundation#comboboxTemplate}
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-combobox\>
 *
 */
export const fluentCombobox = Combobox.compose<ComboboxOptions>({
  baseName: 'combobox',
  template,
  styles,
  indicator: `
    <svg
        class="select-indicator"
        part="select-indicator"
        viewBox="0 0 12 7"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M11.85.65c.2.2.2.5 0 .7L6.4 6.84a.55.55 0 01-.78 0L.14 1.35a.5.5 0 11.71-.7L6 5.8 11.15.65c.2-.2.5-.2.7 0z"
        />
    </svg>
  `,
});

/**
 * Styles for combobox
 * @public
 */
export const comboboxStyles = styles;
