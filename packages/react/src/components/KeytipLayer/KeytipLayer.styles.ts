import { ZIndexes } from '../../Styling';
import type { ILayerStyles, ILayerStyleProps } from '../../Layer';
import type { IKeytipLayerStyleProps, IKeytipLayerStyles } from './KeytipLayer.types';

export const getLayerStyles = (props: ILayerStyleProps): ILayerStyles => {
  return {
    root: [
      {
        // Prioritize the Keytips above all other Layers
        zIndex: ZIndexes.KeytipLayer,
      },
    ],
  };
};

export const getStyles = (props: IKeytipLayerStyleProps): IKeytipLayerStyles => {
  return {
    innerContent: [
      {
        position: 'absolute',
        width: 0,
        height: 0,
        margin: 0,
        padding: 0,
        border: 0,
        overflow: 'hidden',
        visibility: 'hidden',
      },
    ],
  };
};
