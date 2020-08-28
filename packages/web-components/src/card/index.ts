import { customElement } from '@microsoft/fast-element';
import { Card, CardTemplate as template } from '@microsoft/fast-foundation';
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
@customElement({
  name: 'fluent-card',
  template,
  styles,
})
export class FluentCard extends Card {}

/**
 * Styles for Card
 * @public
 */
export const CardStyles = styles;
