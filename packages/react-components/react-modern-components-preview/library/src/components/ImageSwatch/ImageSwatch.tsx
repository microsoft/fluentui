'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ImageSwatchProps } from './ImageSwatch.types';
import { renderImageSwatch } from './renderImageSwatch';
import { useImageSwatch } from './useImageSwatch';
import { useImageSwatchStyles } from './useImageSwatchStyles.styles';

export const ImageSwatch: ForwardRefComponent<ImageSwatchProps> = React.forwardRef((props, ref) => {
  const state = useImageSwatch(props, ref);
  useImageSwatchStyles(state);
  return renderImageSwatch(state);
});

ImageSwatch.displayName = 'ImageSwatch';
