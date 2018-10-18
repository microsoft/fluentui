import { IPartialThemeCore, IThemeCore, ITypography, ILayer } from '../interfaces/index';
import { merge } from './merge';
import { mergeLayerCollections, stripNonStyleProps } from './layers';
import { getContrastingColor } from '../colors/index';
import { IPartialStyle } from './styleResolution';
import { resolveFontChoice } from './typography';

/**
 * @internal This is an experimental interface and will be changed post design review.
 *
 * Take a partial theme definition and a parent definition and produce a new theme
 * @param definition - new theme definition, this contains a partial set of properties to map on top
 * of the parent values.
 * @param parent - theme to base the newly created theme off of
 */
export function resolveThemeCore(definition: IPartialThemeCore | undefined, parent: IThemeCore): IThemeCore {
  if (!definition) {
    definition = {};
  }

  const mergedLayerDefs = mergeLayerCollections(definition.layers, parent.layers);

  return {
    palette: Object.assign({}, parent.palette, definition.palette),
    typography: merge<ITypography>({}, parent.typography, definition.typography as ITypography),
    layers: mergedLayerDefs,
    layerCache: { ...mergedLayerDefs }
  };
}

const _colorsToResolve: Array<keyof ILayer> = ['backgroundColor', 'color', 'textColor', 'borderColor', 'iconColor'];

// hack!  This just allows us to not add this to theming-core right now
const _semanticColorsKey = 'semanticColors';

function _resolveColors(theme: IThemeCore, style: object): void {
  const palette = theme.palette;
  const semantic = theme[_semanticColorsKey] as object || {};
  for (const key of _colorsToResolve) {
    const color = style[key];
    if (color && typeof color === 'string') {
      const resolved = palette[color] || semantic[color];
      if (resolved) {
        style[key] = resolved;
      }
    }
  }
}

/**
 * Take a style object and if it has a textColor set it into color with potential color adjustments
 * along the way
 *
 * @param style - style where if a textColor is set, the color should be set to either the specified
 * color if it meets contrast requirements, or a shaded version of the color which does contrast
 * @param backgroundColor - the background color to use for contrast adjustment purposes
 */
function _resolveTextColor(style: { color?: string; textColor?: string; backgroundColor?: string }, baseStyle?: IPartialStyle): void {
  const textColor = style.textColor || (baseStyle && baseStyle.textColor);
  if (textColor) {
    const bgColor = style.backgroundColor || (baseStyle && baseStyle.backgroundColor) || 'white';
    style.color = getContrastingColor(textColor, bgColor);
  }
}

/**
 * Take a theme layer and turn it into a resolved style suitable for sending to the system
 * @param theme - theme to use for lookup purposes
 * @param layer - current layer to be turned into a style
 * @param style - baseline style to use for things such as bg color for text processing
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export function resolveLayerToStyle(theme: IThemeCore, layer: ILayer, style: IPartialStyle): IPartialStyle {
  const result = Object.assign({}, layer, resolveFontChoice(layer, theme.typography));
  _resolveColors(theme, result);
  _resolveTextColor(result, style);
  stripNonStyleProps(result);
  return result;
}