import * as React from 'react';

import { RatingContextValue, RatingState, RatingContextValues } from '../Rating';

export const useRatingContextValues = (state: RatingState): RatingContextValues => {
  const { compact, defaultValue, hoveredValue, iconFilled, iconOutline, name, precision, readOnly, size, value } =
    state;

  const rating = React.useMemo<RatingContextValue>(
    () => ({
      compact,
      defaultValue,
      hoveredValue,
      iconFilled,
      iconOutline,
      name,
      precision,
      readOnly,
      size,
      value,
    }),
    [compact, defaultValue, hoveredValue, iconFilled, iconOutline, name, precision, readOnly, size, value],
  );

  return { rating };
};
