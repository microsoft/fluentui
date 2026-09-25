'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useImage } from './useImage';
import { renderImage } from './renderImage';
import { useImageStyles } from './useImageStyles.styles';
import type { ImageProps } from './Image.types';

/**
 * An image displays visual content.
 */
export const Image: ForwardRefComponent<ImageProps> = React.forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const state = useImage(props, ref);

  useImageStyles(state);

  return renderImage(state);
});

Image.displayName = 'Image';
