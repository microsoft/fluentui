import { attr, customElement } from '@microsoft/fast-element';
import { Select, SelectTemplate as template } from '@microsoft/fast-foundation';
import { SelectStyles as styles } from './select.styles';

/**
 * Select appearances
 * @public
 */
export type SelectAppearance = 'filled' | 'outline';

/**
 * The Fluent Select Element. Implements {@link @microsoft/fast-foundation#Select},
 * {@link @microsoft/fast-foundation#SelectTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-select\>
 */
@customElement({
  name: 'fluent-select',
  template,
  styles,
})
export class FluentSelect extends Select {
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
 * Styles for Select
 * @public
 */
export const SelectStyles = styles;
