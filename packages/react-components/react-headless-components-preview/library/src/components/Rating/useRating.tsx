'use client';

import type * as React from 'react';
import { useRatingBase_unstable } from '@fluentui/react-rating';

import type { RatingProps, RatingState } from './Rating.types';

/**
 * Returns the state for a Rating component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderRating`.
 */
export const useRating = (props: RatingProps, ref: React.Ref<HTMLDivElement>): RatingState => {
  const state = useRatingBase_unstable(props, ref);

  return state;
};
