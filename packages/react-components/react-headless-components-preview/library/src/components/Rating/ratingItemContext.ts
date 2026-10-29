import { useRatingItemContextValue_unstable as useRatingItemContextValue } from '@fluentui/react-rating';

export { useRatingItemContextValue };

/**
 * Context value provided by Rating and RatingDisplay to their items.
 */
export type RatingItemContextValue = ReturnType<typeof useRatingItemContextValue>;
