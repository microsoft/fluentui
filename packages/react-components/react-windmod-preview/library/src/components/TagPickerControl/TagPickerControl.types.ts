import type {
  TagPickerControlState as TagPickerControlHeadlessState,
  TagPickerSize,
} from '@fluentui/react-headless-components-preview/tag-picker';

import type { TagPickerAppearance } from '../TagPicker/TagPicker.types';

export type {
  TagPickerControlInternalSlots,
  TagPickerControlProps,
  TagPickerControlSlots,
} from '@fluentui/react-headless-components-preview/tag-picker';

/**
 * Windmod TagPickerControl state: the headless state plus the two look values, which the control
 * reads from the picker context rather than from its own props — neither is a TagPickerControl prop
 * on either implementation.
 */
export type TagPickerControlState = TagPickerControlHeadlessState & {
  appearance: TagPickerAppearance;
  size: TagPickerSize;
};
