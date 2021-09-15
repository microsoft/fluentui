import { renderImage } from './renderImage';
import { useImage } from './useImage';
import { useImageStyles } from './useImageStyles';
import type { ImageProps } from './Image.types';
import { forwardRef } from '@fluentui/react-utilities';

export const Image = forwardRef<ImageProps>((props, ref) => {
  const state = useImage(props, ref);
  useImageStyles(state);

  return renderImage(state);
});

Image.displayName = 'Image';
