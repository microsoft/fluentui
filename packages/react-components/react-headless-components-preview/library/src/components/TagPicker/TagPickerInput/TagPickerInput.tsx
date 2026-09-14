'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useTagPickerInput } from './useTagPickerInput';
import { renderTagPickerInput } from './renderTagPickerInput';
import type { TagPickerInputProps } from './TagPickerInput.types';

/**
 * The text input trigger of a TagPicker, used to filter options and open the popover.
 */
export const TagPickerInput: ForwardRefComponent<TagPickerInputProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerInput(props, ref);

  return renderTagPickerInput(state);
});

TagPickerInput.displayName = 'TagPickerInput';
