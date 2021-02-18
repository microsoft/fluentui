import { attr, Notifier, Observable } from '@microsoft/fast-element';
import { parseColorHexRGB } from '@microsoft/fast-colors';
import { designSystemProvider, CardTemplate as template } from '@microsoft/fast-foundation';
import { neutralFillCard } from '../color';
import { DesignSystem } from '../fluent-design-system';
import { FluentDesignSystemProvider } from '../design-system-provider';
import { CardStyles as styles } from './card.styles';

/**
 * The Fluent Card Element. Implements {@link @microsoft/fast-foundation#Card},
 * {@link @microsoft/fast-foundation#CardTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-card\>
 */
@designSystemProvider({
  name: 'fluent-card',
  template,
  styles,
  shadowOptions: {
    mode: 'closed',
  },
})
export class FluentCard extends FluentDesignSystemProvider {
  /**
   * Background color for the card component. Sets context for the design system.
   * @public
   * @remarks
   * HTML Attribute: card-background-color
   */
  @attr({
    attribute: 'card-background-color',
  })
  public cardBackgroundColor: string;
  private cardBackgroundColorChanged(prev: string | void, next: string | void): void {
    if (next) {
      const parsedColor = parseColorHexRGB(this.cardBackgroundColor);

      if (parsedColor !== null) {
        this.neutralBaseColor = this.cardBackgroundColor;
        this.backgroundColor = this.cardBackgroundColor;
      }
    } else if (this.provider && this.provider.designSystem) {
      this.handleChange(this.provider.designSystem as DesignSystem, 'backgroundColor');
    }
  }

  /**
   * @internal
   */
  public handleChange(source: DesignSystem, name: string): void {
    if (!this.cardBackgroundColor) {
      if (this.neutralBaseColor) {
        this.backgroundColor = neutralFillCard(this.designSystem as DesignSystem);
      } else {
        this.backgroundColor = neutralFillCard(source);
      }
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    const parentDSNotifier: Notifier = Observable.getNotifier(this.provider?.designSystem);
    parentDSNotifier.subscribe(this, 'backgroundColor');
    parentDSNotifier.subscribe(this, 'neutralPalette');
    this.handleChange(this.provider?.designSystem as DesignSystem, 'backgroundColor');
  }
}

/**
 * Styles for Card
 * @public
 */
export const CardStyles = styles;
