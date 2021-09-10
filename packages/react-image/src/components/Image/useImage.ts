import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { ImageProps, ImageSlots, ImageState } from './Image.types';

export const imageShorthandProps: Array<keyof ImageSlots> = ['root'];

/**
 * Given user props, returns state and render function for an Image.
 */
export const useImage = (props: ImageProps, ref: React.Ref<HTMLImageElement>): ImageState => {
  const { bordered, fit, fluid, circular, rounded } = props;
  const rootAs = 'img';
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
    root: getNativeElementProps(rootAs, {
      ref,
      ...props,
    }),
  };

  // state['aria-hidden'] = state.alt || state['aria-label'] ? undefined : 'true';

  return state;
};
