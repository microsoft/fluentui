import { IThemeCore, IFontFamilies } from '../interfaces/index';
import { createTypography } from '../utilities/index';
import { DefaultPalette } from './DefaultColors';
import { DefaultLayers } from './DefaultLayers';

/**
 * @internal This is an experimental interface and will be changed post design review.
 */
export function createThemeCore(families: IFontFamilies): IThemeCore {
  return {
    palette: DefaultPalette,
    typography: createTypography(families),
    layers: DefaultLayers,
    layerCache: {}
  };
}
