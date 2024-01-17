import * as React from 'react';

import { RatingContextValue, RatingState, RatingContextValues } from '../Rating';

export const useRatingContextValues = (state: RatingState): RatingContextValues => {
  const { color, hoveredValue, iconFilled, iconOutline, mode, name, step, size, value } = state;

  const rating = React.useMemo<RatingContextValue>(
    () => ({
      color,
      hoveredValue,
      iconFilled,
      iconOutline,
      mode,
      name,
      step,
      size,
      value,
    }),
    [color, hoveredValue, iconFilled, iconOutline, mode, name, step, size, value],
  );

  return { rating };
};
