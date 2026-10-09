'use client';

import * as React from 'react';

import type { RatingDisplayColor, RatingDisplaySize } from '../RatingDisplay/RatingDisplay.types';

/** Look values a Rating or a RatingDisplay publishes to the RatingItems below it. */
export type RatingItemContextValue = {
  color?: RatingDisplayColor;
  size?: RatingDisplaySize;
};

const RatingItemContext = React.createContext<RatingItemContextValue | undefined>(undefined);
const ratingItemContextDefaultValue: RatingItemContextValue = {};

export const RatingItemContextProvider = RatingItemContext.Provider;

/**
 * The headless surface installs the rating item context inside `renderRating`/`renderRatingDisplay`
 * and exports no reader, and its value carries none of the windmod look props, so this module
 * supplies both.
 * It is internal — no barrel re-exports it.
 */
export const useRatingItemContext = (): RatingItemContextValue =>
  React.useContext(RatingItemContext) ?? ratingItemContextDefaultValue;
