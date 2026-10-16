'use client';

import type * as React from 'react';
import { useRatingItemBase_unstable } from '@fluentui/react-rating';

import type { RatingItemProps, RatingItemState } from './RatingItem.types';

/**
 * Returns the state for a RatingItem component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderRatingItem`.
 */
export const useRatingItem = (props: RatingItemProps, ref: React.Ref<HTMLSpanElement>): RatingItemState => {
  const state: RatingItemState = useRatingItemBase_unstable(props, ref);

  let appearance: RatingItemState['root']['data-appearance'];
  if (state.iconFillWidth === 1) {
    appearance = 'filled';
  } else if (state.iconFillWidth > 0) {
    appearance = 'filled-half';
  } else {
    appearance = 'outline';
  }

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-appearance'] = appearance;

  return state;
};
