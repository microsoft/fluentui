'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useTagPickerControl } from './useTagPickerControl';
import { renderTagPickerControl } from './renderTagPickerControl';
import type { TagPickerControlProps } from './TagPickerControl.types';

/**
 * The interactive area of a TagPicker: hosts the selected tags (`TagPickerGroup`) and
 * the trigger (`TagPickerInput` or `TagPickerButton`), plus an optional expand icon and
 * secondary action.
 */
export const TagPickerControl: ForwardRefComponent<TagPickerControlProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerControl(props, ref);

  return renderTagPickerControl(state);
});

TagPickerControl.displayName = 'TagPickerControl';
