import * as React from 'react';
import { RatingContextValue } from './RatingContext.types';

/**
 * RatingContext is provided by Rating, and is consumed by Rating to determine default values of some props.
 */
export const RatingContext = React.createContext<RatingContextValue | undefined>(undefined);

export const RatingProvider = RatingContext.Provider;

/**
 * Get the value of the RatingContext.
 */
export const useRatingContextValue_unstable = () => React.useContext(RatingContext);
