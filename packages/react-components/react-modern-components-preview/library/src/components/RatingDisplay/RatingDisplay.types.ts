import type {
  RatingDisplayProps as RatingDisplayBaseProps,
  RatingDisplayState as RatingDisplayBaseState,
} from '@fluentui/react-headless-components-preview/rating-display';
export type { RatingDisplaySlots } from '@fluentui/react-headless-components-preview/rating-display';

export type RatingDisplayProps = RatingDisplayBaseProps & {
  /**
   * Controls the color of the rating items.
   *
   * @default 'neutral'
   */
  color?: 'brand' | 'marigold' | 'neutral';

  /**
   * Sets the size of the rating items.
   *
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large' | 'extra-large';
};

export type RatingDisplayState = RatingDisplayBaseState & {
  color: NonNullable<RatingDisplayProps['color']>;
  size: NonNullable<RatingDisplayProps['size']>;
  root: RatingDisplayBaseState['root'] & {
    'data-color': NonNullable<RatingDisplayProps['color']>;
    'data-size': NonNullable<RatingDisplayProps['size']>;
  };
};
