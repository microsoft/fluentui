import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { ImageSlots, ImageState } from './Image.types';
import { imageShorthandProps } from './useImage';

/**
 * Define the render function.
 * Given the state of an image, renders it.
 */
export const renderImage = (state: ImageState) => {
  const { slots, slotProps } = getSlots<ImageSlots>(state, imageShorthandProps);

  return <slots.root {...slotProps.root} />;
};
