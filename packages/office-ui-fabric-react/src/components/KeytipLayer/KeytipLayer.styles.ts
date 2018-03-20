import { ILayerStyles, ILayerStyleProps } from '../../Layer';

export const getLayerStyles = (props: ILayerStyleProps): ILayerStyles => {
  return {
    root: [{
      // Prioritize the Keytips above all other Layers
      zIndex: 1000001
    }]
  };
};