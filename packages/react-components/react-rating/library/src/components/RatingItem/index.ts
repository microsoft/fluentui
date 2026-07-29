export { RatingItem } from './RatingItem';
export type {
  RatingItemContextValue,
  RatingItemProps,
  RatingItemBaseProps,
  RatingItemSlots,
  RatingItemState,
  RatingItemBaseState,
} from './RatingItem.types';
export { renderRatingItem_unstable } from './renderRatingItem';
export { useRatingItem_unstable, useRatingItemBase_unstable } from './useRatingItem';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- re-exporting the retained identity constant IS the public-surface contract (DECISIONS.md D16.5): the export is kept so `root` keeps resolving, and `@deprecated` targets consumers who used it for styling, not this barrel.
export { ratingItemClassNames, useRatingItemStyles_unstable } from './useRatingItemStyles.styles';
