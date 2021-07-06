import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { ImageState } from './Image.types';

/**
 * Define the render function.
 * Given the state of an image, renders it.
 */
export const renderImage = (state: ImageState) => {
  const { slots, slotProps } = getSlotsCompat(state);

  return <slots.root {...slotProps.root} />;
};
