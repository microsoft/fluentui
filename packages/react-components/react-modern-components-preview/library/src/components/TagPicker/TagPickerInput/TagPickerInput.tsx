'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TagPickerInputProps } from './TagPickerInput.types';
import { renderTagPickerInput } from './renderTagPickerInput';
import { useTagPickerInput } from './useTagPickerInput';
import { useTagPickerInputStyles } from './useTagPickerInputStyles.styles';

export const TagPickerInput: ForwardRefComponent<TagPickerInputProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerInput(props, ref);
  useTagPickerInputStyles(state);
  return renderTagPickerInput(state);
});

TagPickerInput.displayName = 'TagPickerInput';
