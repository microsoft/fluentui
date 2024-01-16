import * as React from 'react';

import type { RatingDisplayContextValue } from '../RatingDisplay';

/**
 * RatingDisplayContext is provided by RatingDisplay, and is consumed by RatingDisplay to determine default values of some props.
 */
export const RatingDisplayContext = React.createContext<RatingDisplayContextValue | undefined>(undefined);

export const RatingDisplayProvider = RatingDisplayContext.Provider;

/**
 * Get the value of the RatingContext.
 */
export const useRatingDisplayContextValue_unstable = () => React.useContext(RatingDisplayContext);
