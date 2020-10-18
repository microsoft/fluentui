import { attr, Notifier, Observable } from '@microsoft/fast-element';
import { parseColorHexRGB } from '@microsoft/fast-colors';
import {
  designSystemProperty,
  DesignSystemProvider,
  designSystemProvider,
  CardTemplate as template,
} from '@microsoft/fast-foundation';
import { createColorPalette, DesignSystem, neutralFillCard } from '@microsoft/fast-components-styles-msft';
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
export class FluentCard extends DesignSystemProvider
  implements Pick<DesignSystem, 'backgroundColor' | 'neutralPalette'> {
  /**
   * Background color for the banner component. Sets context for the design system.
   * @public
   * @remarks
   * HTML Attribute: background-color
   */
  @designSystemProperty({
    attribute: 'background-color',
    default: '#FFFFFF',
  })
  public backgroundColor: string;

  /**
   * Background color for the banner component. Sets context for the design system.
   * @public
   * @remarks
   * HTML Attribute: background-color
   */
  @attr({
    attribute: 'card-background-color',
  })
  public cardBackgroundColor: string;
  private cardBackgroundColorChanged(prev: string | void, next: string | void): void {
    if (next) {
      const parsedColor = parseColorHexRGB(this.cardBackgroundColor);

      if (parsedColor !== null) {
        this.neutralPalette = createColorPalette(parsedColor);
        this.backgroundColor = this.cardBackgroundColor;
      }
    } else if (this.provider && this.provider.designSystem) {
      this.handleChange(this.provider.designSystem as DesignSystem, 'backgroundColor');
    }
  }

  /**
   * Neutral pallette for the the design system provider.
   * @internal
   */
  @designSystemProperty({
    attribute: false,
    default: createColorPalette(parseColorHexRGB('#FFFFFF')!),
    cssCustomProperty: false,
  })
  public neutralPalette: string[];

  /**
   * @internal
   */
  public handleChange(source: DesignSystem, name: string): void {
    if (!this.cardBackgroundColor) {
      this.backgroundColor = neutralFillCard(source);
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
