import { composedParent, Card as FoundationCard, cardTemplate as template } from '@microsoft/fast-foundation';
import { attr, Notifier, Observable } from '@microsoft/fast-element';
import { parseColorHexRGB } from '@microsoft/fast-colors';
import { fillColor, neutralFillLayerRecipe, neutralPalette } from '../design-tokens';
import { Swatch, SwatchRGB } from '../color/swatch';
import { PaletteRGB } from '../color/palette';
import { cardStyles as styles } from './card.styles';

/**
 * @public
 */
export class Card extends FoundationCard {
  /**
   * Fill color for the card component. Sets context for the design system.
   *
   * Updates the neutral palette and sets the card to the source color. For tinting use neutral-palette-source instead.
   * @public
   * @remarks
   * HTML Attribute: card-fill-color
   */
  @attr({
    attribute: 'card-fill-color',
    mode: 'fromView',
  })
  public cardFillColor: string;
  private cardFillColorChanged(prev: string | void, next: string | void): void {
    if (next) {
      const parsedColor = parseColorHexRGB(next);

      if (parsedColor !== null) {
        this.neutralPaletteSource = next;
        fillColor.setValueFor(this, SwatchRGB.create(parsedColor.r, parsedColor.g, parsedColor.b));
      }
    }
  }

  /**
   * Neutral palette source color for the card component. Sets context for the design system.
   *
   * This allows for tinting the card while maintaining the light or dark context. For a fixed color use card-fill-color instead.
   * @public
   * @remarks
   * HTML Attribute: neutral-palette-source
   */
  @attr({
    attribute: 'neutral-palette-source',
    mode: 'fromView',
  })
  public neutralPaletteSource: string;
  private neutralPaletteSourceChanged(prev: string | void, next: string | void): void {
    if (next) {
      const color = parseColorHexRGB(next)!;
      const swatch = SwatchRGB.create(color.r, color.g, color.b);
      neutralPalette.setValueFor(this, PaletteRGB.create(swatch));
    }
  }

  /**
   * @internal
   */
  public handleChange(source: any, propertyName: string): void {
    if (!this.cardFillColor) {
      fillColor.setValueFor(
        this,
        (target: HTMLElement): Swatch =>
          neutralFillLayerRecipe.getValueFor(target).evaluate(target, fillColor.getValueFor(source)).rest,
      );
    }
  }

  connectedCallback(): void {
    super.connectedCallback();

    const parent = composedParent(this);

    if (parent) {
      const parentNotifier: Notifier = Observable.getNotifier(parent);
      parentNotifier.subscribe(this, 'fillColor');
      parentNotifier.subscribe(this, 'neutralPalette');
      this.handleChange(parent, 'fillColor');
    }
  }
}

/**
 * The Fluent Card Element. Implements {@link @microsoft/fast-foundation#Card},
 * {@link @microsoft/fast-foundation#CardTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-card\>
 */
export const fluentCard = Card.compose({
  baseName: 'card',
  baseClass: FoundationCard,
  template,
  styles,
});

/**
 * Styles for Card
 * @public
 */
export const cardStyles = styles;
