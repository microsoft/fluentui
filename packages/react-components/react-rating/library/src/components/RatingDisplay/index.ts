export { RatingDisplay } from './RatingDisplay';
export type {
  RatingDisplayContextValues,
  RatingDisplayProps,
  RatingDisplayBaseProps,
  RatingDisplaySlots,
  RatingDisplayState,
  RatingDisplayBaseState,
} from './RatingDisplay.types';
export { renderRatingDisplay_unstable } from './renderRatingDisplay';
export { useRatingDisplay_unstable, useRatingDisplayBase_unstable } from './useRatingDisplay';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- re-exporting the retained identity constant IS the public-surface contract (DECISIONS.md D16.5): the export is kept so `root` keeps resolving, and `@deprecated` targets consumers who used it for styling, not this barrel.
export { ratingDisplayClassNames, useRatingDisplayStyles_unstable } from './useRatingDisplayStyles.styles';
export { useRatingDisplayContextValues } from './useRatingDisplayContextValues';
