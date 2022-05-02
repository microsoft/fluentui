import * as React from 'react';
import { useComboboxInput_unstable } from './useComboboxInput';
import { renderComboboxInput_unstable } from './renderComboboxInput';
import { useComboboxInputStyles_unstable } from './useComboboxInputStyles';
import type { ComboboxInputProps } from './ComboboxInput.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * ComboboxInput component - TODO: add more docs
 */
export const ComboboxInput: ForwardRefComponent<ComboboxInputProps> = React.forwardRef((props, ref) => {
  const state = useComboboxInput_unstable(props, ref);

  useComboboxInputStyles_unstable(state);
  return renderComboboxInput_unstable(state);
});

ComboboxInput.displayName = 'ComboboxInput';
