import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useRating_unstable } from './useRating';
import { renderRating_unstable } from './renderRating';
import { useRatingStyles_unstable } from './useRatingStyles.styles';
import type { RatingProps } from './Rating.types';
import { useRatingContextValues } from '../../contexts/useRatingContextValues';
import { useRatingDisplay_unstable } from '../RatingDisplay/useRatingDisplay';

/**
 * Rating component - TODO: add more docs
 */
export const Rating: ForwardRefComponent<RatingProps> = React.forwardRef((props, ref) => {
  const state = useRating_unstable(props, ref);
  const displayState = useRatingDisplay_unstable(props, ref);
  const contextValues = useRatingContextValues(state, displayState);

  useRatingStyles_unstable(state);
  return renderRating_unstable(state, contextValues);
});

Rating.displayName = 'Rating';
