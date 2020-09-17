import { ColorRGBA64, parseColorHexRGB } from '@microsoft/fast-colors';
import { designSystemProperty, designSystemProvider, CardTemplate as template } from '@microsoft/fast-foundation';
import { createColorPalette, DesignSystem } from '@microsoft/fast-components-styles-msft';
import { FluentDesignSystemProvider } from '..';
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
})
export class FluentCard extends FluentDesignSystemProvider
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
  protected backgroundColorChanged(): void {
    const parsedColor = parseColorHexRGB(this.backgroundColor);
    this.neutralPalette = createColorPalette(parsedColor as ColorRGBA64);
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

  connectedCallback(): void {
    super.connectedCallback();

    if (this.backgroundColor === undefined) {
      this.setAttribute('use-defaults', '');
    }
  }
}

/**
 * Styles for Card
 * @public
 */
export const CardStyles = styles;
