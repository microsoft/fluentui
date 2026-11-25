'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useTagPickerList } from './useTagPickerList';
import { renderTagPickerList } from './renderTagPickerList';
import type { TagPickerListProps } from './TagPickerList.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * The popover list of selectable options for a TagPicker. Holds `Option` and `OptionGroup`
 * children.
 */
export const TagPickerList: ForwardRefComponent<TagPickerListProps> = /*#__PURE__*/ composeComponent(
  'TagPickerList',
  useTagPickerList,
  renderTagPickerList,
);
