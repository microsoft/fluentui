import { composedParent, Card as FoundationCard, CardTemplate as template } from '@microsoft/fast-foundation';
import { attr, Notifier, Observable } from '@microsoft/fast-element';
import { parseColorHexRGB } from '@microsoft/fast-colors';
import { fillColor, neutralFillLayerRecipe, neutralPalette } from '../design-tokens';
import { Swatch, SwatchRGB } from '../color-vNext/swatch';
import { PaletteRGB } from '../color-vNext/palette';
import { CardStyles as styles } from './card.styles';

/**
 * @public
 */
export class Card extends FoundationCard {
  /**
   * Fill color for the card component. Sets context for the design system.
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
        this.neutralBaseColor = next;
        fillColor.setValueFor(
          this,
          SwatchRGB.create(parsedColor.r, parsedColor.g, parsedColor.b)
        );
      }
    }
  }

  /**
   * Neutral palette base color for the card component. Sets context for the design system.
   * @public
   * @remarks
   * HTML Attribute: neutral-base-color
   */
  @attr({
    attribute: 'neutral-base-color',
    mode: 'fromView',
  })
  public neutralBaseColor: string;
  private neutralBaseColorChanged(prev: string | void, next: string | void): void {
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
          neutralFillLayerRecipe.getValueFor(target).evaluate(target, fillColor.getValueFor(source)),
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
  template,
  styles,
});

/**
 * Styles for Card
 * @public
 */
export const cardStyles = styles;
