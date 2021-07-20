import { Flipper, FlipperOptions, flipperTemplate as template } from '@microsoft/fast-foundation';
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
export const fluentFlipper = Flipper.compose<FlipperOptions>({
  baseName: 'flipper',
  template,
  styles,
  next: `
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.57 11.84A1 1 0 016 11.02V4.98a1 1 0 011.57-.82l3.79 2.62c.85.59.85 1.85 0 2.44l-3.79 2.62z"/>
    </svg>
  `,
  previous: `
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.43 11.84a1 1 0 001.57-.82V4.98a1 1 0 00-1.57-.82L5.64 6.78c-.85.59-.85 1.85 0 2.44l3.79 2.62z"/>
    </svg>
  `,
});

/**
 * Styles for Flipper
 * @public
 */
export const flipperStyles = styles;

/**
 * Base class for Flipper
 * @public
 */
export { Flipper };
