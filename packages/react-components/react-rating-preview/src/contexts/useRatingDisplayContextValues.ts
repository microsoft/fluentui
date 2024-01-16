import * as React from 'react';

import { RatingDisplayContextValue, RatingDisplayState, RatingDisplayContextValues } from '../RatingDisplay';

export const useRatingDisplayContextValues = (state: RatingDisplayState): RatingDisplayContextValues => {
  const { color, compact, iconFilled, iconOutline, name, step, size, value } = state;

  const ratingDisplay = React.useMemo<RatingDisplayContextValue>(
    () => ({
      color,
      compact,
      iconFilled,
      iconOutline,
      name,
      step,
      size,
      value,
    }),
    [color, compact, iconFilled, iconOutline, name, step, size, value],
  );

  return { ratingDisplay };
};
