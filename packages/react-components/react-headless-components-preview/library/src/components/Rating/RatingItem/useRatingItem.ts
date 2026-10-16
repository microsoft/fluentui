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

  // eslint-disable-next-line react-hooks/immutability
  if (state.iconFillWidth === 1) {
    state.root['data-appearance'] = 'filled';
  } else if (state.iconFillWidth > 0) {
    state.root['data-appearance'] = 'filled-half';
  } else {
    state.root['data-appearance'] = 'outline';
  }

  return state;
};
