import { attr } from '@microsoft/fast-element';
import { Select as FoundationSelect, selectTemplate as template } from '@microsoft/fast-foundation';
import { selectStyles as styles } from './select.styles';

/**
 * Select appearances
 * @public
 */
export type SelectAppearance = 'filled' | 'outline';

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
export const fluentSelect = Select.compose({
  baseName: 'select',
  template,
  styles,
});

/**
 * Styles for Select
 * @public
 */
export const selectStyles = styles;
