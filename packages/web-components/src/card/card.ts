import { attr, FASTElement } from '@microsoft/fast-element';

/**
 * Types of card appearance.
 * @public
 */
export type CardAppearance = 'filled' | 'filled-alternative' | 'subtle' | 'outline';

/**
 * @internal
 */
export class Card extends FASTElement {
  /**
   * The appearance the card should have.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance: CardAppearance = 'filled';

  /**
   * The card is interactive.
   * While this is applied in the v9 React implementation by checking props,
   * checking for event listeners being applied doesn't work as elegantly in HTML and setting the attr is preferred
   *
   * @public
   * @remarks
   * HTML Attribute: interactive
   */
  @attr({ mode: 'boolean' })
  public interactive: boolean = false;
}
