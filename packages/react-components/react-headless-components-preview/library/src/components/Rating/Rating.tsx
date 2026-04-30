'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { RatingProps } from './Rating.types';
import { useRating } from './useRating';
import { renderRating } from './renderRating';
import { useRatingContextValues } from './useRatingContextValues';

/**
 * A rating component for displaying star ratings.
 */
export const Rating: ForwardRefComponent<RatingProps> = React.forwardRef((props, ref) => {
  const state = useRating(props, ref);
  const contextValues = useRatingContextValues(state);

  return renderRating(state, contextValues);
});

Rating.displayName = 'Rating';
