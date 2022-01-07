import * as React from 'react';
import { useInput } from './useInput';
import { renderInput } from './renderInput';
import { useInputStyles } from './useInputStyles';
import type { InputProps } from './Input.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * The Input component allows people to enter and edit text.
 *
 * ⚠️ **This component is still in alpha (unstable) status. APIs may change before the final release.**
 */
export const Input: ForwardRefComponent<InputProps> = React.forwardRef((props, ref) => {
  const state = useInput(props, ref);

  useInputStyles(state);
  return renderInput(state);
});

Input.displayName = 'Input';
