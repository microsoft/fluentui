import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { ImageBaseProps, ImageBaseState, ImageProps, ImageState } from './Image.types';

/**
 * Given user props, returns state and render function for an Image.
 */
export const useImage_unstable = (props: ImageProps, ref: React.Ref<HTMLImageElement>): ImageState => {
  const { bordered = false, fit = 'default', shadow = false, shape = 'square', ...imageProps } = props;
  const state = useImageBase_unstable(imageProps, ref);

  return {
    bordered,
    fit,
    shadow,
    shape,
    ...state,
  };
};

/**
 * Base hook for Image component, which manages state related to slot structure.
 * This hook excludes design props (shape, shadow, bordered, fit).
 *
 * @param props - User provided props to the Image component.
 * @param ref - User provided ref to be passed to the Image component.
 */
export const useImageBase_unstable = (props: ImageBaseProps, ref: React.Ref<HTMLImageElement>): ImageBaseState => {
  const { block = false, ...imageProps } = props;

  return {
    block,
    components: {
      root: 'img',
    },
    root: slot.always(
      getIntrinsicElementProps('img', {
        ref,
        ...imageProps,
      }),
      { elementType: 'img' },
    ),
  };
};
