'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { RatingProps } from './Rating.types';
import { useRating } from './useRating';
import { renderRating } from './renderRating';
import { useRatingContextValues } from './useRatingContextValues';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A rating component for displaying star ratings.
 */
export const Rating: ForwardRefComponent<RatingProps> = /*#__PURE__*/ composeComponent(
  'Rating',
  useRating,
  renderRating,
  useRatingContextValues,
);
