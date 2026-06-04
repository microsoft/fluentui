'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useTagPickerGroup } from './useTagPickerGroup';
import { renderTagPickerGroup } from './renderTagPickerGroup';
import { useTagGroupContextValues } from '../../TagGroup/useTagGroupContextValues';
import type { TagPickerGroupProps } from './TagPickerGroup.types';

/**
 * Displays the selected options of a TagPicker as a group of dismissible tags. Uses the
 * native `focusgroup` attribute for arrow-key navigation across the tags.
 */
export const TagPickerGroup: ForwardRefComponent<TagPickerGroupProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerGroup(props, ref);
  const contextValues = useTagGroupContextValues(state);

  return renderTagPickerGroup(state, contextValues);
});

TagPickerGroup.displayName = 'TagPickerGroup';
