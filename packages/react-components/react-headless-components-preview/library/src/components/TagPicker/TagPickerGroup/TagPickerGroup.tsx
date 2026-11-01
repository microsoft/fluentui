'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useTagPickerGroup } from './useTagPickerGroup';
import { renderTagPickerGroup } from './renderTagPickerGroup';
import { useTagPickerGroupContextValues } from './useTagPickerGroupContextValues';
import type { TagPickerGroupProps } from './TagPickerGroup.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Displays the selected options of a TagPicker as a group of dismissible tags. Uses the
 * native `focusgroup` attribute for arrow-key navigation across the tags.
 */
export const TagPickerGroup: ForwardRefComponent<TagPickerGroupProps> = /*#__PURE__*/ composeComponent(
  'TagPickerGroup',
  useTagPickerGroup,
  renderTagPickerGroup,
  useTagPickerGroupContextValues,
);
