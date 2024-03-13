import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { ImageSwatchProps, ImageSwatchState } from './ImageSwatch.types';

/**
 * Create the state required to render ImageSwatch.
 *
 * The returned state can be modified with hooks such as useImageSwatchStyles_unstable,
 * before being passed to renderImageSwatch_unstable.
 *
 * @param props - props from this instance of ImageSwatch
 * @param ref - reference to root HTMLDivElement of ImageSwatch
 */
export const useImageSwatch_unstable = (props: ImageSwatchProps, ref: React.Ref<HTMLDivElement>): ImageSwatchState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
