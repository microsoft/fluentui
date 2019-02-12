import * as React from 'react';

import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

import { getImageVisualizationStyles } from './ImageVisualization.styles';
import { IImageVisualizationProps, IImageVisualizationStyles } from './ImageVisualization.types';

export const ImageVisualization: React.SFC<IImageVisualizationProps> = (props: IImageVisualizationProps) => {
  const getClassNames = classNamesFunction<{}, IImageVisualizationStyles>();
  const classNames = getClassNames(getImageVisualizationStyles);
  const { imageVisualizationSrc, imageAltText } = props;

  if (imageVisualizationSrc) {
    return (
      <div className={classNames.imageIllustrationContainerStyle}>
        <img src={imageVisualizationSrc} alt={imageAltText} className={classNames.imageIllustrationStyle} />
      </div>
    );
  }

  return null;
};
