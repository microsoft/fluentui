import * as React from 'react';

import type { RatingContextValue } from '../Rating';

/**
 * RadioGroupContext is provided by RadioGroup, and is consumed by Radio to determine default values of some props.
 */
export const RatingContext = React.createContext<RatingContextValue | undefined>(undefined);

export const RatingProvider = RatingContext.Provider;

/**
 * Get the value of the RatingContext.
 */
export const useRatingContextValue_unstable = () => React.useContext(RatingContext);
