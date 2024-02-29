import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useRatingDisplay_unstable } from './useRatingDisplay';
import { renderRatingDisplay_unstable } from './renderRatingDisplay';
import { useRatingDisplayStyles_unstable } from './useRatingDisplayStyles.styles';
import type { RatingDisplayProps } from './RatingDisplay.types';

/**
 * RatingDisplay component - TODO: add more docs
 */
export const RatingDisplay: ForwardRefComponent<RatingDisplayProps> = React.forwardRef((props, ref) => {
  const state = useRatingDisplay_unstable(props, ref);

  useRatingDisplayStyles_unstable(state);
  return renderRatingDisplay_unstable(state);
});

RatingDisplay.displayName = 'RatingDisplay';
