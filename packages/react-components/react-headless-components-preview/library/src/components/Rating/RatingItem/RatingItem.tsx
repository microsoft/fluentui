'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { RatingItemProps } from './RatingItem.types';
import { useRatingItem } from './useRatingItem';
import { renderRatingItem } from './renderRatingItem';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A RatingItem component representing a single star/icon within a Rating.
 */
export const RatingItem: ForwardRefComponent<RatingItemProps> = /*#__PURE__*/ composeComponent(
  'RatingItem',
  useRatingItem,
  renderRatingItem,
);
