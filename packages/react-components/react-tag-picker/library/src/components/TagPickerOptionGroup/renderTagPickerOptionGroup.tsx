import type { TagPickerOptionGroupState } from './TagPickerOptionGroup.types';
import { renderOptionGroup_unstable } from '@fluentui/react-combobox';
import type { JSXElement } from '@fluentui/react-utilities';

/**
 * Render the final JSX of TagPickerOptionGroup
 */
export const renderTagPickerOptionGroup: (state: TagPickerOptionGroupState) => JSXElement = renderOptionGroup_unstable;
