import * as React from 'react';
import { useInput_unstable } from './useInput';
import { renderInput_unstable } from './renderInput';
import { useInputStyles_unstable } from './useInputStyles';
import type { InputProps } from './Input.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * The Input component allows people to enter and edit text.
 *
 * ⚠️ **This component is still in alpha (unstable) status. APIs may change before the final release.**
 */
export const Input: ForwardRefComponent<InputProps> = React.forwardRef((props, ref) => {
  const state = useInput_unstable(props, ref);

  useInputStyles_unstable(state);
  return renderInput_unstable(state);
});

Input.displayName = 'Input';
