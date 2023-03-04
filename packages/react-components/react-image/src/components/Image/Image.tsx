import * as React from 'react';
import { renderImage_unstable } from './renderImage';
import { useImage_unstable } from './useImage';
import { useImageStyles_unstable } from './useImageStyles';
import type { ImageProps } from './Image.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';

/**
 * The Image component ensures the consistent styling of images.
 */
export const Image: ForwardRefComponent<ImageProps> = React.forwardRef((props, ref) => {
  const state = useImage_unstable(props, ref);

  useImageStyles_unstable(state);

  const { useImageStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
  useCustomStyles(state);

  return renderImage_unstable(state);
});

Image.displayName = 'Image';
