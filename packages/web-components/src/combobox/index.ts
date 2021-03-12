import { attr, customElement } from '@microsoft/fast-element';
import { Combobox, ComboboxTemplate as template } from '@microsoft/fast-foundation';
import { SelectAppearance } from '../select';
import { ComboboxStyles as styles } from './combobox.styles';

/**
 * Combobox appearances
 * @public
 */
export type ComboboxAppearance = SelectAppearance;

/**
 * The Fluent Combobox Custom Element. Implements {@link @microsoft/fast-foundation#Combobox|Combobox},
 * {@link @microsoft/fast-foundation#ComboboxTemplate|ComboboxTemplate}
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-combobox\>
 *
 */
@customElement({
  name: 'fluent-combobox',
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
})
export class FluentCombobox extends Combobox {
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
 * Styles for combobox
 * @public
 */
export const ComboboxStyles = styles;
