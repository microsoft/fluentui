import { IRawStyle } from '@uifabric/merge-styles';
import { HighContrastSelector } from './CommonStyles';
import { ITheme } from '../interfaces';

export interface IRGB {
  r: number;
  g: number;
  b: number;
}

const DEFAULT_HEIGHT = '50%';
const DEFAULT_WIDTH = 20;

/**
 * - Generates a style used to fade out an overflowing content by defining a style for an :after pseudo element.
 * - Apply it to the :after selector for all combination of states the parent of content might have (normal, hover, selected, focus).
 * - Requires the target to have position set to relative and overflow set to hidden.
 *
 * @example
 * ```tsx
 * // Assuming the following DOM structure and the different background colors coming from the parent holding the content.
 * <div className={classNames.parent}>
 *   <span className={classNames.content}>Overflown Content</span>
 * </div>
 * ```
 * ```ts
 * // This is how the style set would look in Component.styles.ts
 * const {bodyBackground, hoverBackground} = theme.semanticColors;
 *
 * const styles = {
 *   parent: [
 *     backgroundColor: bodyBackground,
 *     selectors: {
 *       '&:hover: {
 *         backgroundColor: hoverBackground
 *       },
 *       '$content:after': {
 *         ...getFadedOverflowStyle(theme, bodyBackground)
 *       },
 *       '&:hover $content:after': {
 *         ...getFadedOverflowStyle(theme, hoverBackground)
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
 * @param color - The background color to fade out to. Defaults to theme.semanticColors.bodyBackground.
 * @param direction - The direction of the overflow. Defaults to horizontal.
 * @param width - The width of the fading overflow. Vertical direction defaults it to 100% vs 20px when horizontal.
 * @param height - The Height of the fading overflow. Vertical direction defaults it to 50% vs 100% when horizontal.
 * @returns The style object.
 */
export function getFadedOverflowStyle(
  theme: ITheme,
  color: string = theme.semanticColors.bodyBackground,
  direction: 'horizontal' | 'vertical' = 'horizontal',
  width: string | number = getDefaultValue('width', direction),
  height: string | number = getDefaultValue('height', direction)
): IRawStyle {
  const rgbColor: IRGB = hex2rgb(color);
  const rgba = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0)`; // opacity = 0 for starting color of gradient.
  const gradientDirection = direction === 'vertical' ? 'to bottom' : 'to right'; // mergeStyles take care of RTL direction.

  return {
    content: '""',
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: width,
    height: height,
    pointerEvents: 'none',
    backgroundImage: `linear-gradient(${gradientDirection}, ${rgba} 0%, ${color} 100%)`,
    selectors: {
      [HighContrastSelector]: {
        backgroundImage: 'none'
      }
    }
  };
}

// TODO consider moving this to a separate module along with some more color functions from OUFR/utilities.
/**
 * Helper function to convert a string hex color to an RGB object.
 *
 * @param color - Color to be converted from hex to rgba.
 */
function hex2rgb(color: string): IRGB {
  return {
    r: parseInt(color.slice(1, 3), 16),
    g: parseInt(color.slice(3, 5), 16),
    b: parseInt(color.slice(5, 7), 16)
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
