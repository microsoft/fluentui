import { customElement } from '@microsoft/fast-element';
import { Card, CardTemplate as template } from '@microsoft/fast-foundation';
import { CardStyles as styles } from './card.styles';

/**
 * The FAST Card Element. Implements {@link @microsoft/fast-foundation#Card},
 * {@link @microsoft/fast-foundation#CardTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-card\>
 */
@customElement({
  name: 'fast-card',
  template,
  styles,
})
export class FASTCard extends Card {}
