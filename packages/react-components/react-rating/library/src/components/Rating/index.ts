export { Rating } from './Rating';
export type {
  RatingContextValues,
  RatingOnChangeEventData,
  RatingProps,
  RatingBaseProps,
  RatingSlots,
  RatingState,
  RatingBaseState,
} from './Rating.types';
export { renderRating_unstable } from './renderRating';
export { useRating_unstable, useRatingBase_unstable } from './useRating';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- re-exporting the retained identity constant IS the public-surface contract (DECISIONS.md D16.5): the export is kept so `root` keeps resolving, and `@deprecated` targets consumers who used it for styling, not this barrel.
export { ratingClassNames, useRatingStyles_unstable } from './useRatingStyles.styles';
export { useRatingContextValues } from './useRatingContextValues';
