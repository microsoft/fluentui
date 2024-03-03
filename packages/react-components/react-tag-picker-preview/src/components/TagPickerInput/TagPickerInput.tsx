import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTagPickerInput_unstable } from './useTagPickerInput';
import { renderTagPickerInput_unstable } from './renderTagPickerInput';
import { useTagPickerInputStyles_unstable } from './useTagPickerInputStyles.styles';
import type { TagPickerInputProps } from './TagPickerInput.types';

/**
 * TagPickerInput component - TODO: add more docs
 */
export const TagPickerInput: ForwardRefComponent<TagPickerInputProps> = React.forwardRef((props, ref) => {
  const state = useTagPickerInput_unstable(props, ref);

  useTagPickerInputStyles_unstable(state);
  return renderTagPickerInput_unstable(state);
});

TagPickerInput.displayName = 'TagPickerInput';
