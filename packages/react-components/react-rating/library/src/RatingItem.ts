export type {
  RatingItemContextValue,
  RatingItemProps,
  RatingItemBaseProps,
  RatingItemSlots,
  RatingItemState,
  RatingItemBaseState,
} from './components/RatingItem/index';
export {
  RatingItem,
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- re-exporting the retained identity constant IS the public-surface contract (DECISIONS.md D16.5): the export is kept so `root` keeps resolving, and `@deprecated` targets consumers who used it for styling, not this barrel.
  ratingItemClassNames,
  renderRatingItem_unstable,
  useRatingItemStyles_unstable,
  useRatingItem_unstable,
  useRatingItemBase_unstable,
} from './components/RatingItem/index';
