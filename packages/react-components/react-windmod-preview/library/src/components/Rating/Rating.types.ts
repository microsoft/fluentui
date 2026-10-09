import type {
  RatingProps as RatingHeadlessProps,
  RatingState as RatingHeadlessState,
} from '@fluentui/react-headless-components-preview/rating';

export type { RatingSlots } from '@fluentui/react-headless-components-preview/rating';

/** Colour of the rating items. `'neutral'` is the base look. */
export type RatingColor = 'brand' | 'marigold' | 'neutral';

/** Size of the rating items. */
export type RatingSize = 'small' | 'medium' | 'large' | 'extra-large';

/**
 * Windmod Rating props: the headless rating plus the look props the headless surface deliberately
 * omits (they exist purely to select styles). `iconFilled`, `iconOutline` and `max` are headless
 * props whose defaults the headless surface strips to avoid an icon dependency.
 */
export type RatingProps = RatingHeadlessProps & {
  /** @default 'neutral' */
  color?: RatingColor;
  /** @default 'extra-large' */
  size?: RatingSize;
};

/** Windmod Rating state: headless state plus the resolved look props. */
export type RatingState = RatingHeadlessState & Required<Pick<RatingProps, 'color' | 'size'>>;
