'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { RatingDisplayProps } from './RatingDisplay.types';
import { useRatingDisplay } from './useRatingDisplay';
import { renderRatingDisplay } from './renderRatingDisplay';
import { useRatingDisplayContextValues } from './useRatingDisplayContextValues';

/**
 * A rating component for displaying star ratings.
 */
export const RatingDisplay: ForwardRefComponent<RatingDisplayProps> = React.forwardRef((props, ref) => {
  const state = useRatingDisplay(props, ref);
  const contextValues = useRatingDisplayContextValues(state);

  return renderRatingDisplay(state, contextValues);
});

RatingDisplay.displayName = 'RatingDisplay';
