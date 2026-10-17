import type {
  RatingDisplayProps as RatingDisplayHeadlessProps,
  RatingDisplayState as RatingDisplayHeadlessState,
} from '@fluentui/react-headless-components-preview/rating-display';

export type { RatingDisplaySlots } from '@fluentui/react-headless-components-preview/rating-display';

/** Colour of the rating items. `'neutral'` is the base look. */
export type RatingDisplayColor = 'brand' | 'marigold' | 'neutral';

/** Size of the rating items and the value/count text. */
export type RatingDisplaySize = 'small' | 'medium' | 'large' | 'extra-large';

/**
 * Windmod RatingDisplay props: the headless rating display plus the look props the headless
 * surface deliberately omits (they exist purely to select styles). `icon` is a headless prop
 * whose default the headless surface strips to avoid an icon dependency.
 */
export type RatingDisplayProps = RatingDisplayHeadlessProps & {
  /** @default 'neutral' */
  color?: RatingDisplayColor;
  /** @default 'medium' */
  size?: RatingDisplaySize;
};

/** Windmod RatingDisplay state: headless state plus the resolved look props. */
export type RatingDisplayState = RatingDisplayHeadlessState & Required<Pick<RatingDisplayProps, 'color' | 'size'>>;
