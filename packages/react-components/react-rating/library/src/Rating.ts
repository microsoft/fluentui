export type {
  RatingContextValues,
  RatingOnChangeEventData,
  RatingProps,
  RatingBaseProps,
  RatingSlots,
  RatingState,
  RatingBaseState,
} from './components/Rating/index';
export {
  Rating,
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- re-exporting the retained identity constant IS the public-surface contract (DECISIONS.md D16.5): the export is kept so `root` keeps resolving, and `@deprecated` targets consumers who used it for styling, not this barrel.
  ratingClassNames,
  renderRating_unstable,
  useRatingContextValues,
  useRatingStyles_unstable,
  useRating_unstable,
  useRatingBase_unstable,
} from './components/Rating/index';
