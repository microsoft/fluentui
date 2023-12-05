import * as React from 'react';

import type { RatingContextValue } from '../Rating';

/**
 * RadioGroupContext is provided by RadioGroup, and is consumed by Radio to determine default values of some props.
 */
export const RatingContext = React.createContext<RatingContextValue | undefined>(undefined);

const defaultIcon: React.ReactElement = <div />;
const ratingContextDefaultValue: RatingContextValue = {
  appearance: 'outline',
  compact: false,
  iconFilled: defaultIcon,
  iconOutline: defaultIcon,
  name: '',
  precision: false,
  readOnly: false,
  size: 'medium',
  value: 0,
};

export const RatingProvider = RatingContext.Provider;

/**
 * Get the value of the RadioGroupContext.
 */
export const useRatingContextValue_unstable = () => React.useContext(RatingContext) || ratingContextDefaultValue;
