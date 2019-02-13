import * as React from 'react';

import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

import { getImageVisualizationStyles } from './ImageVisualization.styles';
import { IImageVisualizationProps, IImageVisualizationStyles } from './ImageVisualization.types';

export const ImageVisualization: React.SFC<IImageVisualizationProps> = (props: IImageVisualizationProps) => {
  const getClassNames = classNamesFunction<{}, IImageVisualizationStyles>();
  const classNames = getClassNames(getImageVisualizationStyles);
  const { imageSrc, imageAlt } = props;

  if (imageSrc) {
    return (
      <div className={classNames.imageIllustrationContainerStyle}>
        <img src={imageSrc} alt={imageAlt} className={classNames.imageIllustrationStyle} aria-hidden={true} />
      </div>
    );
  }

  return null;
};
