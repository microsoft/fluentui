import { IPalette } from './IPalette';
import { ITypography, IPartialTypography } from './ITypography';
import { ILayers, ILayerContents } from './ILayers';
import { IThemeLayersBase } from '../generics/themeLayers';

/**
 * @internal This is an experimental interface and will be changed post design review.
 */
export interface IThemeCore {
  palette: IPalette;
  typography: ITypography;
  layers: ILayers;
  layerCache: IThemeLayersBase<ILayerContents>;
}

// We can switch back to this, although with the contents of IThemeCore being so little, the new definition
// makes it more clear what an IPartialThemeCore is allowed to be.
// export type IPartialThemeCore = { [P in keyof Pick<IThemeCore, 'palette'>]?: Partial<IThemeCore[P]> } &
//   { [P in keyof Pick<IThemeCore, 'typography'>]?: IPartialTypography };

/**
 * Partial interface for theme core
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export type IPartialThemeCore = {
  palette?: Partial<IPalette>;
  typography?: IPartialTypography;
  layers?: ILayers;
};
