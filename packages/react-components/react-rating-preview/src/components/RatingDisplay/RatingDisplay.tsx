import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useRatingDisplay_unstable } from './useRatingDisplay';
import { renderRatingDisplay_unstable } from './renderRatingDisplay';
import { useRatingDisplayStyles_unstable } from './useRatingDisplayStyles.styles';
import type { RatingDisplayProps } from './RatingDisplay.types';
import { useRatingDisplayContextValues } from './useRatingDisplayContextValues';

/**
 * RatingDisplay is a wrapper for one or more rating items that will be used to display a rating value
 * as well as the label for the rating.
 */
export const RatingDisplay: ForwardRefComponent<RatingDisplayProps> = React.forwardRef((props, ref) => {
  const state = useRatingDisplay_unstable(props, ref);
  const contextValues = useRatingDisplayContextValues(state);

  useRatingDisplayStyles_unstable(state);
  return renderRatingDisplay_unstable(state, contextValues);
});

RatingDisplay.displayName = 'RatingDisplay';
