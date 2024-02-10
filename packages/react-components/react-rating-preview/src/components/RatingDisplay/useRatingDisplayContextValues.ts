import * as React from 'react';
import { RatingDisplayContextValues, RatingDisplayState } from './RatingDisplay.types';
import { RatingItemContextValue } from '../RatingItem/RatingItem.types';

export const useRatingDisplayContextValues = (state: RatingDisplayState): RatingDisplayContextValues => {
  const { color, compact, icon, size, value } = state;

  const ratingItem = React.useMemo<RatingItemContextValue>(
    () => ({
      color,
      compact,
      iconFilled: icon,
      iconOutline: icon,
      interactive: false,
      step: 0.5,
      size,
      value,
    }),
    [color, compact, icon, size, value],
  );

  return { ratingItem };
};
