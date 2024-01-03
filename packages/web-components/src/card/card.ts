import { attr } from '@microsoft/fast-element';
import { FASTCard } from '@microsoft/fast-foundation';
import { CardAppearance, CardSize } from './card.options.js';

/**
 * @class Card component
 *
 * @remarks
 * This class extends the FASTCard. a flexible content container
 */
export class Card extends FASTCard {
  /**
   * @property size
   * @default medium
   * @remarks
   * Determines the size of the card
   */
  @attr({ attribute: 'size' })
  public size?: CardSize;

  /**
   * @property appearance;
   * @default filled
   * @remarks
   * Determines the appearance of the card
   */
  @attr
  public appearance?: CardAppearance;
}
