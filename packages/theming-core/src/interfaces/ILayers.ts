import { IColorSlots } from './IColorSlots';
import { IFontChoice } from './ITypography';
import { ISpace, IOtherProps } from './ISpace';
import { IThemeLayerBase, IThemeLayersBase } from '../generics/themeLayers';

/**
 * The flat set of properties that can be defined for a layer
 *
 * @internal This is experimental and will be changed post design review
 */
export type ILayerContentsFlatProps = IColorSlots & IFontChoice & ISpace & IOtherProps;

/**
 * The layer contents used by the themeLayers code in foundation
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export type ILayerContents = ILayerContentsFlatProps & {
  selectors?: {
    ':hover'?: ILayerContentsFlatProps;
    ':hover:active'?: ILayerContentsFlatProps;
  }
  overrides?: {
    [mixin: string]: ILayer;
  };
  slots?: {
    [slot: string]: ILayer;
  };
};

/**
 * Definition for a theme layer.  The wrapper will add a standard parent property
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export type ILayer = IThemeLayerBase<ILayerContents>;

/**
 * theming-core provides a strongly typed layering system to be used within themes
 *
 * @internal This is an experimental interface and will be changed post desing review.
 */
export type ILayers = IThemeLayersBase<ILayerContents>;
