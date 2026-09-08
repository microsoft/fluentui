'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ImageSwatchProps } from './ImageSwatch.types';
import { useImageSwatch } from './useImageSwatch';
import { renderImageSwatch } from './renderImageSwatch';

export const ImageSwatch: ForwardRefComponent<ImageSwatchProps> = React.forwardRef((props, ref) => {
  const state = useImageSwatch(props, ref);
  return renderImageSwatch(state);
});

ImageSwatch.displayName = 'ImageSwatch';
