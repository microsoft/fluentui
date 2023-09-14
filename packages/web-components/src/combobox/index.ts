import { attr } from '@microsoft/fast-element';
import {
  ComboboxOptions,
  Combobox as FoundationCombobox,
  comboboxTemplate as template,
} from '@microsoft/fast-foundation';
import { fillColor, neutralLayerFloating } from '../design-tokens';
import { comboboxStyles as styles } from './combobox.styles';

/**
 * Combobox appearances
 * @public
 */
export type ComboboxAppearance = 'filled' | 'outline';

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

    if (this.listbox) {
      fillColor.setValueFor(this.listbox, neutralLayerFloating);
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
  shadowOptions: {
    delegatesFocus: true,
  },
  template,
  styles,
  indicator: `
    <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.15 4.65c.2-.2.5-.2.7 0L6 7.79l3.15-3.14a.5.5 0 11.7.7l-3.5 3.5a.5.5 0 01-.7 0l-3.5-3.5a.5.5 0 010-.7z"/>
    </svg>
  `,
});

/**
 * Styles for combobox
 * @public
 */
export const comboboxStyles = styles;
