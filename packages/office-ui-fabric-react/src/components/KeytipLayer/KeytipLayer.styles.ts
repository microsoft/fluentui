import { ILayerStyles, ILayerStyleProps } from '../../Layer';
import { IKeytipLayerStyleProps, IKeytipLayerStyles } from './KeytipLayer.types';
import { hiddenContentStyle } from '../../Styling';

export const getLayerStyles = (props: ILayerStyleProps): ILayerStyles => {
  return {
    root: [{
      // Prioritize the Keytips above all other Layers
      zIndex: 1000001
    }]
  };
};

export const getStyles = (props: IKeytipLayerStyleProps): IKeytipLayerStyles => {
  return {
    innerContent: [{
      ...hiddenContentStyle,
      visibility: 'hidden',
      opacity: 0
    }]
  };
};