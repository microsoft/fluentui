import * as React from 'react';
import { getSlots } from '@fluentui/react-utils';
import { ImageState } from './Image.types';

/**
 * Define the render function.
 * Given the state of an image, renders it.
 */
export const renderImage = (state: ImageState) => {
  const { slots, slotProps } = getSlots(state);

  return <slots.root {...slotProps.root} />;
};
