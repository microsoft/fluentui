'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { RatingProps } from './Rating.types';
import { renderRating } from './renderRating';
import { useRating } from './useRating';
import { useRatingContextValues } from '@fluentui/react-headless-components-preview/rating';
import { useRatingStyles } from './useRatingStyles.styles';

export const Rating: ForwardRefComponent<RatingProps> = React.forwardRef((props, ref) => {
  const state = useRating(props, ref);
  const contextValues = useRatingContextValues(state);
  useRatingStyles(state);

  return renderRating(state, contextValues);
});

Rating.displayName = 'Rating';
