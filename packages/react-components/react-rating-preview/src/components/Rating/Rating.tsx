import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useRating_unstable } from './useRating';
import { renderRating_unstable } from './renderRating';
import { useRatingStyles_unstable } from './useRatingStyles.styles';
import type { RatingProps } from './Rating.types';

/**
 * Rating component - TODO: add more docs
 */
export const Rating: ForwardRefComponent<RatingProps> = React.forwardRef((props, ref) => {
  const state = useRating_unstable(props, ref);

  useRatingStyles_unstable(state);
  return renderRating_unstable(state);
});

Rating.displayName = 'Rating';
