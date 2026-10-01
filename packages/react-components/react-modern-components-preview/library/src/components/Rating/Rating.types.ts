import type {
  RatingProps as RatingBaseProps,
  RatingState as RatingBaseState,
} from '@fluentui/react-headless-components-preview/rating';
export type { RatingSlots } from '@fluentui/react-headless-components-preview/rating';

export type RatingProps = RatingBaseProps & {
  /**
   * Controls the color of the rating items.
   *
   * @default 'neutral'
   */
  color?: 'brand' | 'marigold' | 'neutral';

  /**
   * Sets the size of the rating items.
   *
   * @default 'extra-large'
   */
  size?: 'small' | 'medium' | 'large' | 'extra-large';
};

export type RatingState = RatingBaseState & {
  color: NonNullable<RatingProps['color']>;
  size: NonNullable<RatingProps['size']>;
  root: RatingBaseState['root'] & {
    'data-color': NonNullable<RatingProps['color']>;
    'data-size': NonNullable<RatingProps['size']>;
  };
};
