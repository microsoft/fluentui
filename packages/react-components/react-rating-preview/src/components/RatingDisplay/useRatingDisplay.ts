import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { RatingDisplayProps, RatingDisplayState } from './RatingDisplay.types';

/**
 * Create the state required to render RatingDisplay.
 *
 * The returned state can be modified with hooks such as useRatingDisplayStyles_unstable,
 * before being passed to renderRatingDisplay_unstable.
 *
 * @param props - props from this instance of RatingDisplay
 * @param ref - reference to root HTMLDivElement of RatingDisplay
 */
export const useRatingDisplay_unstable = (
  props: RatingDisplayProps,
  ref: React.Ref<HTMLDivElement>,
): RatingDisplayState => {
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
