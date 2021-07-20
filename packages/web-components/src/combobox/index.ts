import { attr } from '@microsoft/fast-element';
import {
  ComboboxOptions,
  Combobox as FoundationCombobox,
  comboboxTemplate as template,
} from '@microsoft/fast-foundation';
import { SelectAppearance } from '../select';
import { comboboxStyles as styles } from './combobox.styles';

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
  baseClass: FoundationCombobox,
  template,
  styles,
  indicator: `
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.15 5.65c.2-.2.5-.2.7 0L8 9.79l4.15-4.14a.5.5 0 01.7.7l-4.5 4.5a.5.5 0 01-.7 0l-4.5-4.5a.5.5 0 010-.7z"/>
    </svg>
  `,
});

/**
 * Styles for combobox
 * @public
 */
export const comboboxStyles = styles;
