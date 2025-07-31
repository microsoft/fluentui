import type { TagPickerOptionGroupState } from './TagPickerOptionGroup.types';
import { renderOptionGroup_unstable } from '@fluentui/react-combobox';

/**
 * Render the final JSX of TagPickerOptionGroup
 */
export const renderTagPickerOptionGroup: (
  state: TagPickerOptionGroupState,
) => // eslint-disable-next-line @typescript-eslint/no-deprecated
JSX.Element = renderOptionGroup_unstable;
