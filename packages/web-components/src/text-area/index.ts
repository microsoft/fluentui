import { attr, customElement } from '@microsoft/fast-element';
import { TextAreaTemplate as template, TextArea } from '@microsoft/fast-foundation';
import { TextAreaStyles as styles } from './text-area.styles';

/**
 * Text area appearances
 * @public
 */
export type TextAreaAppearance = 'filled' | 'outline';

/**
 * The Fluent Text Area Custom Element. Implements {@link @microsoft/fast-foundation#TextArea},
 * {@link @microsoft/fast-foundation#TextAreaTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-text-area\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
@customElement({
  name: 'fluent-text-area',
  template,
  styles,
})
export class FluentTextArea extends TextArea {
  /**
   * The appearance of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance: TextAreaAppearance;

  /**
   * @internal
   */
  public appearanceChanged(oldValue: TextAreaAppearance, newValue: TextAreaAppearance): void {
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
 * Styles for TextArea
 * @public
 */
export const TextAreaStyles = styles;
