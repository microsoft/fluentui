import { Flipper, flipperTemplate as template } from '@microsoft/fast-foundation';
import type { FlipperOptions } from '@microsoft/fast-foundation';
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
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M4.023 15.273L11.29 8 4.023.727l.704-.704L12.71 8l-7.984 7.977-.704-.704z"
        />
    </svg>
  `,
  previous: `
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M11.273 15.977L3.29 8 11.273.023l.704.704L4.71 8l7.266 7.273-.704.704z"
        />
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
