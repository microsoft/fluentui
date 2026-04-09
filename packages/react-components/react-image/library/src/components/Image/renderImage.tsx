/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ImageSlots, ImageBaseState } from './Image.types';

/**
 * Define the render function.
 * Given the state of an image, renders it.
 */
export const renderImage_unstable = (state: ImageBaseState): JSXElement => {
  assertSlots<ImageSlots>(state);

  return <state.root />;
};
