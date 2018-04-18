import { ILayerStyles, ILayerStyleProps } from '../../Layer';
import { IKeytipLayerStyleProps, IKeytipLayerStyles } from './KeytipLayer.types';
import { hiddenContentStyle, ZIndexes } from '../../Styling';

export const getLayerStyles = (props: ILayerStyleProps): ILayerStyles => {
  return {
    root: [{
      // Prioritize the Keytips above all other Layers
      zIndex: ZIndexes.KeytipLayer
    }]
  };
};

export const getStyles = (props: IKeytipLayerStyleProps): IKeytipLayerStyles => {
  return {
    innerContent: [{
      ...hiddenContentStyle,
      visibility: 'hidden'
    }]
  };
};