import * as React from 'react';

import { RatingContextValue, RatingState, RatingContextValues } from '../Rating';

export const useRatingContextValues = (state: RatingState): RatingContextValues => {
  const { appearance, compact, hoveredValue, iconFilled, iconOutline, name, precision, readOnly, size, value } = state;

  const rating = React.useMemo<RatingContextValue>(
    () => ({
      appearance,
      compact,
      hoveredValue,
      iconFilled,
      iconOutline,
      name,
      precision,
      readOnly,
      size,
      value,
    }),
    [appearance, compact, hoveredValue, iconFilled, iconOutline, name, precision, readOnly, size, value],
  );

  return { rating };
};
