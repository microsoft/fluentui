/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import { ImageSlots, ImageState } from './Image.types';

/**
 * Define the render function.
 * Given the state of an image, renders it.
 */
export const renderImage_unstable = (state: ImageState) => {
  assertSlots<ImageSlots>(state);

  return <state.root />;
};
