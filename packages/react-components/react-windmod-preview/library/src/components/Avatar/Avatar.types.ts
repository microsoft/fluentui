import type {
  AvatarProps as AvatarHeadlessProps,
  AvatarState as AvatarHeadlessState,
} from '@fluentui/react-headless-components-preview/avatar';

export type { AvatarSlots } from '@fluentui/react-headless-components-preview/avatar';

/** The 30 named colours the `colorful` hash picks from, in hash order. */
export type AvatarNamedColor =
  | 'dark-red'
  | 'cranberry'
  | 'red'
  | 'pumpkin'
  | 'peach'
  | 'marigold'
  | 'gold'
  | 'brass'
  | 'brown'
  | 'forest'
  | 'seafoam'
  | 'dark-green'
  | 'light-teal'
  | 'teal'
  | 'steel'
  | 'blue'
  | 'royal-blue'
  | 'cornflower'
  | 'navy'
  | 'lavender'
  | 'purple'
  | 'grape'
  | 'lilac'
  | 'pink'
  | 'magenta'
  | 'plum'
  | 'beige'
  | 'mink'
  | 'platinum'
  | 'anchor';

/** Whether the Avatar is decorated to read as active, faded to read as inactive, or neither. */
export type AvatarActive = 'active' | 'inactive' | 'unset';

/** Which decoration the active state draws. */
export type AvatarActiveAppearance = 'ring' | 'shadow' | 'ring-shadow';

/** `colorful` is resolved to a named colour before it reaches the state. */
export type AvatarColor = 'neutral' | 'brand' | 'colorful' | AvatarNamedColor;

/** The square shape picks its corner radius from the size, so the two axes are not independent. */
export type AvatarShape = 'circular' | 'square';

/** Both the box edge in pixels and the bucket the text, radius, ring and shadow are picked from. */
export type AvatarSize = 16 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120 | 128;

/**
 * Windmod Avatar props: the headless avatar plus the look props the headless surface
 * deliberately omits (they exist purely to select styles).
 */
export type AvatarProps = AvatarHeadlessProps & {
  /** @default 'unset' */
  active?: AvatarActive;
  /** @default 'ring' */
  activeAppearance?: AvatarActiveAppearance;
  /** @default 'neutral' */
  color?: AvatarColor;
  /** Seeds the `colorful` hash in place of `name`. */
  idForColor?: string | undefined;
  /** @default 'circular' */
  shape?: AvatarShape;
  /** @default 32 */
  size?: AvatarSize;
};

/** Windmod Avatar state: headless state plus the resolved look props. */
export type AvatarState = AvatarHeadlessState &
  Required<Pick<AvatarProps, 'active' | 'activeAppearance' | 'shape' | 'size'>> & {
    color: Exclude<AvatarColor, 'colorful'>;
  };
