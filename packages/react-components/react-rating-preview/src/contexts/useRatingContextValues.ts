import * as React from 'react';

import { RatingContextValue, RatingState, RatingContextValues } from '../Rating';

export const useRatingContextValues = (state: RatingState): RatingContextValues => {
  const { defaultValue, hoveredValue, name, precision, readOnly, shape, size, value } = state;

  const rating = React.useMemo<RatingContextValue>(
    () => ({
      defaultValue,
      hoveredValue,
      name,
      precision,
      readOnly,
      shape,
      size,
      value,
    }),
    [defaultValue, hoveredValue, name, precision, readOnly, shape, size, value],
  );

  return { rating };
};
