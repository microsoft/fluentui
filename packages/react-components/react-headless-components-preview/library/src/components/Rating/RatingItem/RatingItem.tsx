'use client';

import { useRatingItem } from './useRatingItem';
import { renderRatingItem } from './renderRatingItem';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A RatingItem component representing a single star/icon within a Rating.
 */
export const RatingItem = /*#__PURE__*/ composeComponent('RatingItem', useRatingItem, renderRatingItem);
