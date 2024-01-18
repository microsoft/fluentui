import * as React from 'react';

import { RatingContextValue, RatingContextValues } from './RatingContext.types';
import { RatingDisplayState } from '../RatingDisplay';
import { RatingState } from '../Rating';

export const useRatingContextValues = (
  ratingState: RatingState,
  displayState: RatingDisplayState,
): RatingContextValues => {
  const { color, hoveredValue, iconFilled, iconOutline, name, step, size, value } = ratingState;
  const { compact } = displayState;

  const rating = React.useMemo<RatingContextValue>(
    () => ({
      color,
      compact,
      hoveredValue,
      iconFilled,
      iconOutline,
      interactive: true,
      name,
      step,
      size,
      value,
    }),
    [color, compact, hoveredValue, iconFilled, iconOutline, name, step, size, value],
  );

  return { rating };
};
