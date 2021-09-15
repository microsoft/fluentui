import * as React from 'react';
import { useInput } from './useInput';
import { renderInput } from './renderInput';
import { useInputStyles } from './useInputStyles';
import type { InputProps } from './Input.types';

/**
 * Input component
 */
export const Input = React.forwardRef<HTMLSpanElement, InputProps>((props, ref) => {
  const state = useInput(props, ref);

  useInputStyles(state);
  return renderInput(state);
});

Input.displayName = 'Input';
