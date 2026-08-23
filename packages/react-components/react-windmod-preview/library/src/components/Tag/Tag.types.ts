import type {
  TagProps as TagHeadlessProps,
  TagState as TagHeadlessState,
} from '@fluentui/react-headless-components-preview/tag';

export type { TagContextValues, TagSlots } from '@fluentui/react-headless-components-preview/tag';

/** Visual style of the Tag. `'filled'` is the base look. */
export type TagAppearance = 'filled' | 'outline' | 'brand';

/** Corner treatment of the Tag. `'rounded'` is the base look. */
export type TagShape = 'rounded' | 'circular';

/** Size of the Tag. */
export type TagSize = 'extra-small' | 'small' | 'medium';

/**
 * Windmod Tag props: the headless tag plus the look props the headless surface
 * deliberately omits (they exist purely to select styles).
 */
export type TagProps = TagHeadlessProps & {
  /** @default 'filled' */
  appearance?: TagAppearance;
  /** @default 'rounded' */
  shape?: TagShape;
  /** @default 'medium' */
  size?: TagSize;
};

/** Windmod Tag state: headless state plus the resolved look props. */
export type TagState = TagHeadlessState & Required<Pick<TagProps, 'appearance' | 'shape' | 'size'>>;
