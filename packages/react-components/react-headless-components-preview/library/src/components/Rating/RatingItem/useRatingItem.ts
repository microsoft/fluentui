'use client';

import type * as React from 'react';
import { useRatingItemBase_unstable } from '@fluentui/react-rating';

import type { RatingItemProps, RatingItemState } from './RatingItem.types';

/**
 * Returns the state for a RatingItem component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderRatingItem`.
 */
export const useRatingItem = (props: RatingItemProps, ref: React.Ref<HTMLSpanElement>): RatingItemState => {
  const state = useRatingItemBase_unstable(props, ref);

  return state;
};
