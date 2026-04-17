import type {
  RatingItemSlots as RatingItemBaseSlots,
  RatingItemBaseProps,
  RatingItemBaseState,
} from '@fluentui/react-rating';

/**
 * RatingItem component slots
 */
export type RatingItemSlots = RatingItemBaseSlots;

/**
 * RatingItem component props
 */
export type RatingItemProps = RatingItemBaseProps;

/**
 * RatingItem component state
 */
export type RatingItemState = RatingItemBaseState & {
  root: {
    /**
     * Data attribute reflecting the appearance of the rating item. Value is 'filled', 'filled-half', or 'outline'.
     */
    'data-appearance'?: 'filled' | 'filled-half' | 'outline';
  };
};
