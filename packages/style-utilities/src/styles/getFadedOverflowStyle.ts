import type { IRawStyle } from '@fluentui/merge-styles';
import type { ITheme, ISemanticColors, IPalette } from '../interfaces/index';

interface IRGB {
  r: number;
  g: number;
  b: number;
}

const DEFAULT_HEIGHT = '50%';
const DEFAULT_WIDTH = 20;

/**
 * - Generates a style used to fade out an overflowing content by defining a style for an :after pseudo element.
 * - Apply it to the :after selector for all combination of states the parent of content might have (normal, hover,
 * selected, focus).
 * - Requires the target to have position set to relative and overflow set to hidden.
 *
 * @example
 * ```tsx
 * // Assuming the following DOM structure and the different background colors coming from
 * // the parent holding the content.
 * <div className={classNames.parent}>
 *   <span className={classNames.content}>Overflown Content</span>
 * </div>
 * ```
 * ```ts
 * // This is how the style set would look in Component.styles.ts
 * const { bodyBackground } = theme.semanticColors;
 * const { neutralLighter } = theme.palette;
 *
 * // The second argument of getFadedOverflowStyle function is a string representing a key of
 * // ISemanticColors or IPalette.
 *
 * const styles = {
 *   parent: [
 *     backgroundColor: bodyBackground,
 *     selectors: {
 *       '&:hover: {
 *         backgroundColor: neutralLighter
 *       },
 *       '$content:after': {
 *         ...getFadedOverflowStyle(theme, 'bodyBackground')
 *       },
 *       '&:hover $content:after': {
 *         ...getFadedOverflowStyle(theme, 'neutralLighter')
 *       }
 *     }
 *   ],
 *   content: [
 *     width: '100%',
 *     display: 'inline-block',
 *     position: 'relative',
 *     overflow: 'hidden'
 *   ]
 * }
 * ```
 * @param theme - The theme object to use.
 * @param color - The background color to fade out to. Accepts only keys of ISemanticColors or IPalette.
 * Defaults to 'bodyBackground'.
 * @param direction - The direction of the overflow. Defaults to horizontal.
 * @param width - The width of the fading overflow. Vertical direction defaults it to 100% vs 20px when horizontal.
 * @param height - The Height of the fading overflow. Vertical direction defaults it to 50% vs 100% when horizontal.
 * @returns The style object.
 */
export function getFadedOverflowStyle(
  theme: ITheme,
  color: keyof ISemanticColors | keyof IPalette = 'bodyBackground',
  direction: 'horizontal' | 'vertical' = 'horizontal',
  width: string | number = getDefaultValue('width', direction),
  height: string | number = getDefaultValue('height', direction),
): IRawStyle {
  // Get the color value string from the theme semanticColors or palette.
  const colorValue: string =
    theme.semanticColors[color as keyof ISemanticColors] || theme.palette[color as keyof IPalette];
  // Get the red, green, blue values of the colorValue.
  const rgbColor: IRGB = color2rgb(colorValue);
  // Apply opacity 0 to serve as a start color of the gradient.
  const rgba = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0)`;
  // Get the direction of the gradient. (mergeStyles takes care of RTL direction)
  const gradientDirection = direction === 'vertical' ? 'to bottom' : 'to right';

  return {
    content: '""',
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: width,
    height: height,
    pointerEvents: 'none',
    backgroundImage: `linear-gradient(${gradientDirection}, ${rgba} 0%, ${colorValue} 100%)`,
  };
}

// TODO consider moving this to a separate module along with some more color functions from OUFR/utilities.
/**
 * Helper function to convert a string hex color to an RGB object.
 *
 * @param colorValue - Color to be converted from hex to rgba.
 */
function color2rgb(colorValue: string): IRGB {
  if (colorValue[0] === '#') {
    // If it's a hex code
    return {
      r: parseInt(colorValue.slice(1, 3), 16),
      g: parseInt(colorValue.slice(3, 5), 16),
      b: parseInt(colorValue.slice(5, 7), 16),
    };
  } else if (colorValue.indexOf('rgba(') === 0) {
    // If it's an rgba color string
    colorValue = colorValue.match(/rgba\(([^)]+)\)/)![1];
    const parts = colorValue.split(/ *, */).map(Number);

    return {
      r: parts[0],
      g: parts[1],
      b: parts[2],
    };
  }
  // The only remaining possibility is transparent.
  return {
    r: 255,
    g: 255,
    b: 255,
  };
}

/**
 * Helper function to get the default values for parameters of main function.
 *
 * @param style - Which style to get the default value for.
 * @param direction - What direction to take into consideration.
 */
function getDefaultValue(style: 'width' | 'height', direction: string): number | string {
  if (style === 'width') {
    return direction === 'horizontal' ? DEFAULT_WIDTH : '100%';
  } else {
    return direction === 'vertical' ? DEFAULT_HEIGHT : '100%';
  }
}
