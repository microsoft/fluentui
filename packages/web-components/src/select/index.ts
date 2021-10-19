import { attr } from '@microsoft/fast-element';
import { Select as FoundationSelect, SelectOptions, selectTemplate as template } from '@microsoft/fast-foundation';
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
export const fluentSelect = Select.compose<SelectOptions>({
  baseName: 'select',
  baseClass: FoundationSelect,
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
 * Styles for Select
 * @public
 */
export const selectStyles = styles;
