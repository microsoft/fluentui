import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { ImageProps, ImageSlots, ImageState } from './Image.types';

export const imageShorthandProps: Array<keyof ImageSlots> = ['root'];

/**
 * Given user props, returns state and render function for an Image.
 */
export const useImage = (props: ImageProps, ref: React.Ref<HTMLImageElement>): ImageState => {
  const { bordered, fit, fluid, circular, rounded } = props;
  const state: ImageState = {
    //props
    bordered,
    fit,
    fluid,
    circular,
    rounded,
    components: {
      root: 'img',
    },
    root: getNativeElementProps('img', {
      ref,
      ...props,
    }),
  };

  state.root['aria-hidden'] = state.root.alt || state.root['aria-label'] ? undefined : 'true';

  return state;
};
