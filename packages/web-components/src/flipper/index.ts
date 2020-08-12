import { customElement } from '@microsoft/fast-element';
import { Flipper, FlipperTemplate as template } from '@microsoft/fast-foundation';
import { FlipperStyles as styles } from './flipper.styles';

/**
 * The Fluent Flipper Element. Implements {@link @microsoft/fast-foundation#Flipper},
 * {@link @microsoft/fast-foundation#FlipperTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-flipper\>
 */
@customElement({
  name: 'fluent-flipper',
  template,
  styles,
})
export class FluentFlipper extends Flipper {}

/**
 * Styles for Flipper
 * @public
 */
export const FlipperStyles = styles;
