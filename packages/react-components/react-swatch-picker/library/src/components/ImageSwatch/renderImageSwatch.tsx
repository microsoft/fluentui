/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ImageSwatchState, ImageSwatchSlots } from './ImageSwatch.types';

/**
 * Render the final JSX of ImageSwatch
 */
export const renderImageSwatch_unstable = (state: ImageSwatchState): JSXElement => {
  assertSlots<ImageSwatchSlots>(state);

  return <state.root />;
};
