import type {
  RatingItemProps as RatingItemHeadlessProps,
  RatingItemState as RatingItemHeadlessState,
} from '@fluentui/react-headless-components-preview/rating';

import type { RatingDisplayColor, RatingDisplaySize } from '../RatingDisplay/RatingDisplay.types';

export type { RatingItemSlots } from '@fluentui/react-headless-components-preview/rating';

/**
 * Windmod RatingItem props: the headless rating item plus the look props the headless surface
 * deliberately omits. Both fall back to the owning Rating's or RatingDisplay's values.
 */
export type RatingItemProps = RatingItemHeadlessProps & {
  /** @default 'neutral' */
  color?: RatingDisplayColor;
  /** @default 'medium' */
  size?: RatingDisplaySize;
};

/** Windmod RatingItem state: headless state plus the resolved look props. */
export type RatingItemState = RatingItemHeadlessState & Required<Pick<RatingItemProps, 'color' | 'size'>>;
