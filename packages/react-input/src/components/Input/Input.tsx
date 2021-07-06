import * as React from 'react';
import { useInput } from './useInput';
import { InputProps } from './Input.types';
import { renderInput } from './renderInput';
import { useInputStyles } from './useInputStyles';

/**
 * Input component
 */
export const Input = React.forwardRef<HTMLElement, InputProps>((props, ref) => {
  const state = useInput(props, ref);

  useInputStyles(state);
  return renderInput(state);
});

Input.displayName = 'Input';
