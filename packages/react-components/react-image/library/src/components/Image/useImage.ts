import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { ImageProps, ImageState } from './Image.types';

/**
 * Given user props, returns state and render function for an Image.
 */
export const useImage_unstable = (props: ImageProps, ref: React.Ref<HTMLImageElement>): ImageState => {
  const { bordered = false, fit = 'default', block = false, shape = 'square', shadow = false } = props;

  const state: ImageState = {
    bordered,
    fit,
    block,
    shape,
    shadow,
    components: {
      root: 'img',
    },
    root: slot.always(
      getIntrinsicElementProps('img', {
        ref,
        ...props,
      }),
      { elementType: 'img' },
    ),
  };

  return state;
};
