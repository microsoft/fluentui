import * as React from 'react';
import { RatingContextValues, RatingState } from './Rating.types';
import { RatingItemContextValue } from '../RatingItem/RatingItem.types';

export const useRatingContextValues = (ratingState: RatingState): RatingContextValues => {
  const { color, hoveredValue, iconFilled, iconOutline, itemLabel, name, step, size, value } = ratingState;

  const ratingItem = React.useMemo<RatingItemContextValue>(
    () => ({
      color,
      hoveredValue,
      iconFilled,
      iconOutline,
      interactive: true,
      itemLabel,
      name,
      step,
      size,
      value,
    }),
    [color, hoveredValue, iconFilled, iconOutline, itemLabel, name, step, size, value],
  );

  return { ratingItem };
};
