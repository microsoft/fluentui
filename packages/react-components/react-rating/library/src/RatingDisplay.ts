export type {
  RatingDisplayContextValues,
  RatingDisplayProps,
  RatingDisplayBaseProps,
  RatingDisplaySlots,
  RatingDisplayState,
  RatingDisplayBaseState,
} from './components/RatingDisplay/index';
export {
  RatingDisplay,
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- re-exporting the retained identity constant IS the public-surface contract (DECISIONS.md D16.5): the export is kept so `root` keeps resolving, and `@deprecated` targets consumers who used it for styling, not this barrel.
  ratingDisplayClassNames,
  renderRatingDisplay_unstable,
  useRatingDisplayContextValues,
  useRatingDisplayStyles_unstable,
  useRatingDisplay_unstable,
  useRatingDisplayBase_unstable,
} from './components/RatingDisplay/index';
