import * as React from 'react';
import { useInput } from './useInput';
import { renderInput } from './renderInput';
import { useInputStyles } from './useInputStyles';
import type { InputProps } from './Input.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Input component
 */
export const Input: ForwardRefComponent<InputProps> = React.forwardRef((props, ref) => {
  const state = useInput(props, ref);

  useInputStyles(state);
  return renderInput(state);
});

Input.displayName = 'Input';
