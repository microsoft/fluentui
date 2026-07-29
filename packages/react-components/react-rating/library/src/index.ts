export {
  Rating,
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- re-exporting the retained identity constant IS the public-surface contract (DECISIONS.md D16.5): the export is kept so `root` keeps resolving, and `@deprecated` targets consumers who used it for styling, not this barrel.
  ratingClassNames,
  renderRating_unstable,
  useRatingStyles_unstable,
  useRating_unstable,
  useRatingContextValues,
  useRatingBase_unstable,
} from './Rating';
export type {
  RatingProps,
  RatingSlots,
  RatingState,
  RatingOnChangeEventData,
  RatingContextValues,
  RatingBaseProps,
  RatingBaseState,
} from './Rating';
export {
  RatingItem,
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- re-exporting the retained identity constant IS the public-surface contract (DECISIONS.md D16.5): the export is kept so `root` keeps resolving, and `@deprecated` targets consumers who used it for styling, not this barrel.
  ratingItemClassNames,
  renderRatingItem_unstable,
  useRatingItemStyles_unstable,
  useRatingItem_unstable,
  useRatingItemBase_unstable,
} from './RatingItem';
export type {
  RatingItemProps,
  RatingItemSlots,
  RatingItemState,
  RatingItemBaseProps,
  RatingItemBaseState,
} from './RatingItem';
export { RatingItemProvider, useRatingItemContextValue_unstable } from './contexts/index';
export {
  RatingDisplay,
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- re-exporting the retained identity constant IS the public-surface contract (DECISIONS.md D16.5): the export is kept so `root` keeps resolving, and `@deprecated` targets consumers who used it for styling, not this barrel.
  ratingDisplayClassNames,
  renderRatingDisplay_unstable,
  useRatingDisplayStyles_unstable,
  useRatingDisplay_unstable,
  useRatingDisplayContextValues,
  useRatingDisplayBase_unstable,
} from './RatingDisplay';
export type {
  RatingDisplayProps,
  RatingDisplaySlots,
  RatingDisplayState,
  RatingDisplayContextValues,
  RatingDisplayBaseProps,
  RatingDisplayBaseState,
} from './RatingDisplay';
