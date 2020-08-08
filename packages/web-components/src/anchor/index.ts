import { attr, customElement } from '@microsoft/fast-element';
import { Anchor, AnchorTemplate as template } from '@microsoft/fast-foundation';
import { ButtonAppearance } from '../button';
import { AnchorStyles as styles } from './anchor.styles';

/**
 * Types of anchor appearance.
 * @public
 */
export type AnchorAppearance = ButtonAppearance | 'hypertext';

/**
 * The Fluent Anchor Element. Implements {@link @microsoft/fast-foundation#Anchor},
 * {@link @microsoft/fast-foundation#AnchorTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-anchor\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
@customElement({
  name: 'fluent-anchor',
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
})
export class FluentAnchor extends Anchor {
  /**
   * The appearance the anchor should have.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance: AnchorAppearance;
  public appearanceChanged(oldValue: AnchorAppearance, newValue: AnchorAppearance): void {
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
      this.appearance = 'neutral';
    }
  }
}

/**
 * Styles for Anchor
 * @public
 */
export const AnchorStyles = styles;
