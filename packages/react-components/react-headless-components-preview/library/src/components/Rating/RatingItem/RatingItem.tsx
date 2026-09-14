'use client';

import * as React from 'react';
import type { RatingItemProps } from './RatingItem.types';
import { useRatingItem } from './useRatingItem';
import { renderRatingItem } from './renderRatingItem';

/**
 * A RatingItem component representing a single star/icon within a Rating.
 */
export const RatingItem = React.forwardRef<HTMLSpanElement, RatingItemProps>((props, ref) => {
  const state = useRatingItem(props, ref);

  Object.assign(state.root, {
    'data-appearance': state.iconFillWidth === 1 ? 'filled' : state.iconFillWidth > 0 ? 'filled-half' : 'outline',
  });

  return renderRatingItem(state);
});

RatingItem.displayName = 'RatingItem';
