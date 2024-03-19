import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useImageSwatch_unstable } from './useImageSwatch';
import { renderImageSwatch_unstable } from './renderImageSwatch';
import { useImageSwatchStyles_unstable } from './useImageSwatchStyles.styles';
import type { ImageSwatchProps } from './ImageSwatch.types';

/**
 * ImageSwatch component - TODO: add more docs
 */
export const ImageSwatch: ForwardRefComponent<ImageSwatchProps> = React.forwardRef((props, ref) => {
  const state = useImageSwatch_unstable(props, ref);

  useImageSwatchStyles_unstable(state);

  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // useCustomStyleHook_unstable('useImageSwatchStyles_unstable')(state);

  return renderImageSwatch_unstable(state);
});

ImageSwatch.displayName = 'ImageSwatch';
