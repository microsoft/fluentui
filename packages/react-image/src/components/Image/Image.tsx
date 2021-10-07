import * as React from 'react';
import { renderImage } from './renderImage';
import { useImage } from './useImage';
import { useImageStyles } from './useImageStyles';
import type { ImageProps } from './Image.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * The Image component ensures the consistent styling of images.
 */
export const Image: ForwardRefComponent<ImageProps> = React.forwardRef((props, ref) => {
  const state = useImage(props, ref);
  useImageStyles(state);

  return renderImage(state);
});

Image.displayName = 'Image';
