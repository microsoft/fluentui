import type {
  TagProps as TagHeadlessProps,
  TagState as TagHeadlessState,
} from '@fluentui/react-headless-components-preview/tag';

import type { AvatarShape, AvatarSize } from '../Avatar/Avatar.types';

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

/**
 * Windmod Tag state: headless state plus the resolved look props, and the two derived values the
 * Tag publishes to a nested Avatar through `AvatarContext`.
 *
 * `avatarShape`/`avatarSize` are derived from the Tag's own `shape`/`size` and exist only to feed
 * that context. Griffel keeps them on its `TagState` for the same reason and explicitly omits them
 * from `TagBaseState` (`react-tags/.../Tag.types.ts:104`), which is what the headless surface
 * re-exports — so the headless state cannot carry them and windmod re-derives them here.
 */
export type TagState = TagHeadlessState &
  Required<Pick<TagProps, 'appearance' | 'shape' | 'size'>> & {
    avatarShape: AvatarShape;
    avatarSize: AvatarSize;
  };
