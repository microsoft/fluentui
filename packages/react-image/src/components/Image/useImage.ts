import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { renderImage_unstable } from './renderImage';
import type { ImageProps, ImageState, ImageRender } from './Image.types';

/**
 * Given user props, returns state and render function for an Image.
 */
export const useImage_unstable = (props: ImageProps, ref: React.Ref<HTMLImageElement>): [ImageState, ImageRender] => {
  const { bordered, fit, block, shape = 'square', shadow } = props;

  const state: ImageState = {
    bordered,
    fit,
    block,
    shape,
    shadow,
    components: {
      root: 'img',
    },
    root: getNativeElementProps('img', {
      ref,
      ...props,
    }),
  };

  return [state, renderImage_unstable];
};
