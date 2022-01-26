import { attr } from '@microsoft/fast-element';
import { TextArea as FoundationTextArea, textAreaTemplate as template } from '@microsoft/fast-foundation';
import { textAreaStyles as styles } from './text-area.styles';

/**
 * Text area appearances
 * @public
 */
export type TextAreaAppearance = 'filled' | 'outline';

/**
 * The Fluent TextArea class
 * @internal
 */
export class TextArea extends FoundationTextArea {
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
 * The Fluent Text Area Custom Element. Implements {@link @microsoft/fast-foundation#TextArea},
 * {@link @microsoft/fast-foundation#textAreaTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-text-area\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
export const fluentTextArea = TextArea.compose({
  baseName: 'text-area',
  baseClass: FoundationTextArea,
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});

/**
 * Styles for TextArea
 * @public
 */
export const textAreaStyles = styles;
