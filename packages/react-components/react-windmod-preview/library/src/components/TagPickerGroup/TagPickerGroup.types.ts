import type {
  TagPickerGroupState as TagPickerGroupHeadlessState,
  TagPickerSize,
} from '@fluentui/react-headless-components-preview/tag-picker';

import type { TagAppearance, TagSize } from '../Tag/Tag.types';

export type { TagPickerGroupProps, TagPickerGroupSlots } from '@fluentui/react-headless-components-preview/tag-picker';

/**
 * Windmod TagPickerGroup state. The widened type is what makes the group's look values reach
 * `useTagGroupContextValues`: both the headless `TagPickerGroupState` and the headless
 * `TagGroupState` omit `appearance` and `size`, so a fresh object literal carrying them is rejected
 * (TS2353) and an annotation naming either headless type only moves the rejection to the
 * declaration.
 *
 * The two scales are separate members on purpose. `appearance` and `size` are TAG-scale values,
 * derived from the picker's and published to the Tags below through two contexts. `pickerSize` is
 * the PICKER-scale value the group's own gap and padding steps select on.
 */
export type TagPickerGroupState = TagPickerGroupHeadlessState & {
  appearance: TagAppearance;
  size: TagSize;
  pickerSize: TagPickerSize;
};
