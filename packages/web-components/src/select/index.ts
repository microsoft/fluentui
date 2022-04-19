import { attr } from '@microsoft/fast-element';
import { Select as FoundationSelect, SelectOptions, selectTemplate as template } from '@microsoft/fast-foundation';
import { fillColor, neutralLayerFloating } from '../design-tokens';
import { selectStyles as styles } from './select.styles';

/**
 * Select appearances
 * @public
 */
export type SelectAppearance = 'filled' | 'outline' | 'stealth';

/**
 * The Fluent select class
 * @internal
 */
export class Select extends FoundationSelect {
  /**
   * The appearance of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr({ mode: 'fromView' })
  public appearance: SelectAppearance;

  /**
   * @internal
   */
  public appearanceChanged(oldValue: SelectAppearance, newValue: SelectAppearance): void {
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
 * The Fluent select Custom Element. Implements, {@link @microsoft/fast-foundation#Select}
 * {@link @microsoft/fast-foundation#selectTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-select\>
 *
 */
export const fluentSelect = Select.compose<SelectOptions>({
  baseName: 'select',
  baseClass: FoundationSelect,
  template,
  styles,
  indicator: `
    <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.15 4.65c.2-.2.5-.2.7 0L6 7.79l3.15-3.14a.5.5 0 11.7.7l-3.5 3.5a.5.5 0 01-.7 0l-3.5-3.5a.5.5 0 010-.7z"/>
    </svg>
  `,
});

/**
 * Styles for Select
 * @public
 */
export const selectStyles = styles;
