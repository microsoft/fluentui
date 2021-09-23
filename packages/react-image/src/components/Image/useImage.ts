import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { ImageProps, ImageSlots, ImageState } from './Image.types';

export const imageShorthandProps: Array<keyof ImageSlots> = ['root'];

/**
 * Given user props, returns state and render function for an Image.
 */
export const useImage = (props: ImageProps, ref: React.Ref<HTMLImageElement>): ImageState => {
  const { bordered, fit, block, shape = 'square' } = props;
  const state: ImageState = {
    bordered,
    fit,
    block,
    shape,
    components: {
      root: 'img',
    },
    root: getNativeElementProps('img', {
      ref,
      ...props,
    }),
  };

  return state;
};
