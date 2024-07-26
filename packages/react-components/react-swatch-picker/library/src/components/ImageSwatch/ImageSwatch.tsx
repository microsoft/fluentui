import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useImageSwatch_unstable } from './useImageSwatch';
import { renderImageSwatch_unstable } from './renderImageSwatch';
import { useImageSwatchStyles_unstable } from './useImageSwatchStyles.styles';
import type { ImageSwatchProps } from './ImageSwatch.types';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * ImageSwatch component is used to render an images, patterns and textures.
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const ImageSwatch: ForwardRefComponent<ImageSwatchProps> = React.forwardRef((props, ref) => {
  const state = useImageSwatch_unstable(props, ref);

  useImageSwatchStyles_unstable(state);
  useCustomStyleHook_unstable('useImageSwatchStyles_unstable')(state);

  return renderImageSwatch_unstable(state);
});

ImageSwatch.displayName = 'ImageSwatch';
