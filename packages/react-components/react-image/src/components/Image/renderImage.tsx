/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import { ImageSlots, ImageState } from './Image.types';

/**
 * Define the render function.
 * Given the state of an image, renders it.
 */
export const renderImage_unstable = (state: ImageState) => {
  const { slots, slotProps } = getSlotsNext<ImageSlots>(state);

  return <slots.root {...slotProps.root} />;
};
