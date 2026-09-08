'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useImage } from './useImage';
import { renderImage } from './renderImage';
import type { ImageProps } from './Image.types';

/**
 * Image component - represents an image, which can be used to display a picture, icon, or other visual content.
 */
export const Image: ForwardRefComponent<ImageProps> = React.forwardRef((props, ref) => {
  const state = useImage(props, ref);

  return renderImage(state);
});

Image.displayName = 'Image';
