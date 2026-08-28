export { Rating, ratingClassNames, useRatingStyles } from './components/Rating';
export type { RatingColor, RatingProps, RatingSize, RatingSlots, RatingState } from './components/Rating';

export { RatingItem, ratingItemClassNames, useRatingItemStyles } from './components/RatingItem';
export type { RatingItemProps, RatingItemSlots, RatingItemState } from './components/RatingItem';

/** Headless building blocks, re-exported for consumers composing their own Rating. */
export {
  renderRating,
  renderRatingItem,
  useRating,
  useRatingContextValues,
  useRatingItem,
} from '@fluentui/react-headless-components-preview/rating';
