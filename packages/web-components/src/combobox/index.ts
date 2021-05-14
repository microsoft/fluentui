import { attr } from '@microsoft/fast-element';
import { Combobox as FoundationCombobox, comboboxTemplate as template } from '@microsoft/fast-foundation';
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
export const fluentCombobox = Combobox.compose({
  baseName: 'combobox',
  template,
  styles,
});

/**
 * Styles for combobox
 * @public
 */
export const comboboxStyles = styles;
