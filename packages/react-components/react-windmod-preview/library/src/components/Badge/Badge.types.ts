import type {
  BadgeProps as BadgeHeadlessProps,
  BadgeState as BadgeHeadlessState,
} from '@fluentui/react-headless-components-preview/badge';

export type { BadgeSlots } from '@fluentui/react-headless-components-preview/badge';

/** Visual style of the Badge. `'filled'` is the base look. */
export type BadgeAppearance = 'filled' | 'ghost' | 'outline' | 'tint';

/** Preset color of the Badge. */
export type BadgeColor = 'brand' | 'danger' | 'important' | 'informative' | 'severe' | 'subtle' | 'success' | 'warning';

/** Corner treatment of the Badge. `'circular'` is the base look. */
export type BadgeShape = 'circular' | 'rounded' | 'square';

/** Size of the Badge. */
export type BadgeSize = 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';

/**
 * Windmod Badge props: the headless badge plus the look props the headless surface
 * deliberately omits (they exist purely to select styles).
 */
export type BadgeProps = BadgeHeadlessProps & {
  /** @default 'filled' */
  appearance?: BadgeAppearance;
  /** @default 'brand' */
  color?: BadgeColor;
  /** @default 'circular' */
  shape?: BadgeShape;
  /** @default 'medium' */
  size?: BadgeSize;
};

/** Windmod Badge state: headless state plus the resolved look props. */
export type BadgeState = BadgeHeadlessState & Required<Pick<BadgeProps, 'appearance' | 'color' | 'shape' | 'size'>>;
