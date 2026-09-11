import type {
  TagGroupProps as TagGroupHeadlessProps,
  TagGroupState as TagGroupHeadlessState,
} from '@fluentui/react-headless-components-preview/tag-group';

import type { TagAppearance, TagSize } from '../Tag/Tag.types';

export type { TagGroupContextValues, TagGroupSlots } from '@fluentui/react-headless-components-preview/tag-group';

/** Visual style shared by the Tags in the group. `'filled'` is the base look. */
export type TagGroupAppearance = TagAppearance;

/** Size shared by the Tags in the group. */
export type TagGroupSize = TagSize;

/**
 * Windmod TagGroup props: the headless tag group plus the look props the headless surface
 * deliberately omits (they exist purely to select styles, here and in the Tags below).
 */
export type TagGroupProps = TagGroupHeadlessProps & {
  /** @default 'filled' */
  appearance?: TagGroupAppearance;
  /** @default 'medium' */
  size?: TagGroupSize;
};

/** Windmod TagGroup state: the headless tag group state plus the resolved look props. */
export type TagGroupState = TagGroupHeadlessState & Required<Pick<TagGroupProps, 'appearance' | 'size'>>;
