import { Flipper, flipperTemplate as template } from '@microsoft/fast-foundation';
import { flipperStyles as styles } from './flipper.styles';

/**
 * The Fluent Flipper Element. Implements {@link @microsoft/fast-foundation#Flipper},
 * {@link @microsoft/fast-foundation#flipperTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-flipper\>
 */
export const fluentFlipper = Flipper.compose({
  baseName: 'flipper',
  template,
  styles,
});

/**
 * Styles for Flipper
 * @public
 */
export const flipperStyles = styles;
