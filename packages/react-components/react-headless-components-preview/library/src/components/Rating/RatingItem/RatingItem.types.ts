import type { RatingItemBaseState } from '@fluentui/react-rating';

export type { RatingItemSlots, RatingItemBaseProps as RatingItemProps } from '@fluentui/react-rating';

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
