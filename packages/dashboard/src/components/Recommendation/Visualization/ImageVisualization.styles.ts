import { IImageVisualizationStyles } from './ImageVisualization.types';

export const getImageVisualizationStyles = (): IImageVisualizationStyles => {
  return {
    imageIllustrationContainerStyle: {
      flex: 1,
      display: 'flex'
    },
    imageIllustrationStyle: {
      flex: 1
    }
  };
};
