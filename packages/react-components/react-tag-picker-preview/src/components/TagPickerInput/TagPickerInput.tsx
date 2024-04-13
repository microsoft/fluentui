import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTagPickerInput } from './useTagPickerInput';
import { renderTagPickerInput } from './renderTagPickerInput';
import { useTagPickerInputStyles } from './useTagPickerInputStyles.styles';
import type { TagPickerInputProps } from './TagPickerInput.types';

/**
 * TagPickerInput component - TODO: add more docs
 */
export const TagPickerInput: ForwardRefComponent<TagPickerInputProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerInput(props, ref);

  useTagPickerInputStyles(state);
  return renderTagPickerInput(state);
});

TagPickerInput.displayName = 'TagPickerInput';
