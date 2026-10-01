'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useRatingDisplayContextValues } from '@fluentui/react-headless-components-preview/rating-display';
import type { RatingDisplayProps } from './RatingDisplay.types';
import { renderRatingDisplay } from './renderRatingDisplay';
import { useRatingDisplay } from './useRatingDisplay';
import { useRatingDisplayStyles } from './useRatingDisplayStyles.styles';

export const RatingDisplay: ForwardRefComponent<RatingDisplayProps> = React.forwardRef((props, ref) => {
  const state = useRatingDisplay(props, ref);
  const contextValues = useRatingDisplayContextValues(state);
  useRatingDisplayStyles(state);

  return renderRatingDisplay(state, contextValues);
});

RatingDisplay.displayName = 'RatingDisplay';
