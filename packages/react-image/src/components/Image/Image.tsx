import * as React from 'react';
import { useImage_unstable } from './useImage';
import type { ImageProps } from './Image.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * The Image component ensures the consistent styling of images.
 */
export const Image: ForwardRefComponent<ImageProps> = React.forwardRef((props, ref) => {
  const [state, render] = useImage_unstable(props, ref);
  return render(state);
});

Image.displayName = 'Image';
