import * as React from 'react';

import { RatingContextValue, RatingState, RatingContextValues } from '../Rating';

export const useRatingContextValues = (state: RatingState): RatingContextValues => {
  const { appearance, hoveredValue, iconFilled, iconOutline, mode, name, precision, size, value } = state;

  const rating = React.useMemo<RatingContextValue>(
    () => ({
      appearance,
      hoveredValue,
      iconFilled,
      iconOutline,
      mode,
      name,
      precision,
      size,
      value,
    }),
    [appearance, hoveredValue, iconFilled, iconOutline, mode, name, precision, size, value],
  );

  return { rating };
};
