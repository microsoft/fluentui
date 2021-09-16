import * as React from 'react';
import { renderImage } from './renderImage';
import { useImage } from './useImage';
import { useImageStyles } from './useImageStyles';
import type { ImageProps } from './Image.types';

/**
 * The Image component ensures the consistent styling of images.
 */
export const Image = React.forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const state = useImage(props, ref);
  useImageStyles(state);

  return renderImage(state);
});

Image.displayName = 'Image';
