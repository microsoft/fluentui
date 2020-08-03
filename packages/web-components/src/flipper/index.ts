import { customElement } from '@microsoft/fast-element';
import { Flipper, FlipperTemplate as template } from '@microsoft/fast-foundation';
import { FlipperStyles as styles } from './flipper.styles';

/**
 * The FAST Flipper Element. Implements {@link @microsoft/fast-foundation#Flipper},
 * {@link @microsoft/fast-foundation#FlipperTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-flipper\>
 */
@customElement({
  name: 'fast-flipper',
  template,
  styles,
})
export class FASTFlipper extends Flipper {}

/**
 * Styles for Flipper
 * @public
 */
export const FlipperStyles = styles;
