'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { RatingDisplayProps } from './RatingDisplay.types';
import { useRatingDisplay } from './useRatingDisplay';
import { renderRatingDisplay } from './renderRatingDisplay';
import { useRatingDisplayContextValues } from './useRatingDisplayContextValues';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A rating component for displaying star ratings.
 */
export const RatingDisplay: ForwardRefComponent<RatingDisplayProps> = /*#__PURE__*/ composeComponent(
  'RatingDisplay',
  useRatingDisplay,
  renderRatingDisplay,
  useRatingDisplayContextValues,
);
