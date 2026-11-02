'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useTagPickerControl } from './useTagPickerControl';
import { renderTagPickerControl } from './renderTagPickerControl';
import type { TagPickerControlProps } from './TagPickerControl.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * The interactive area of a TagPicker: hosts the selected tags (`TagPickerGroup`) and
 * the trigger (`TagPickerInput` or `TagPickerButton`), plus an optional expand icon and
 * secondary action.
 */
export const TagPickerControl: ForwardRefComponent<TagPickerControlProps> = /*#__PURE__*/ composeComponent(
  'TagPickerControl',
  useTagPickerControl,
  renderTagPickerControl,
);
