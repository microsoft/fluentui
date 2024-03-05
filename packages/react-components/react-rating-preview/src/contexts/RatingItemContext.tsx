import * as React from 'react';
import { RatingItemContextValue } from '../RatingItem';
import { StarFilled, StarRegular } from '@fluentui/react-icons';

/**
 * RatingContext is provided by Rating, and is consumed by Rating to determine default values of some props.
 */
export const RatingItemContext = React.createContext<RatingItemContextValue | undefined>(undefined);
const ratingItemContextDefaultValue: RatingItemContextValue = {
  color: 'neutral',
  iconFilled: StarFilled,
  iconOutline: StarRegular,
  step: 1,
  size: 'medium',
};
export const RatingItemProvider = RatingItemContext.Provider;

/**
 * Get the value of the RatingContext.
 */
export const useRatingItemContextValue_unstable = () =>
  React.useContext(RatingItemContext) || ratingItemContextDefaultValue;
